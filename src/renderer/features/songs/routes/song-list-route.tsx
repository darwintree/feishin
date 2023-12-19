import { useCallback, useMemo, useRef } from 'react';
import type { AgGridReact as AgGridReactType } from '@ag-grid-community/react/lib/agGridReact';
import isEmpty from 'lodash/isEmpty';
import { useParams, useSearchParams } from 'react-router-dom';
import { GenreListSort, LibraryItem, SongListQuery, SortOrder } from '/@/renderer/api/types';
import { ListContext } from '/@/renderer/context/list-context';
import { useGenreList } from '/@/renderer/features/genres';
import { usePlayQueueAdd } from '/@/renderer/features/player';
import { AnimatedPage } from '/@/renderer/features/shared';
import { SongListContent } from '/@/renderer/features/songs/components/song-list-content';
import { SongListHeader } from '/@/renderer/features/songs/components/song-list-header';
import { useCurrentServer, useListFilterByKey } from '/@/renderer/store';
import { Play } from '/@/renderer/types';
import { titleCase } from '/@/renderer/utils';
import { VirtualInfiniteGridRef } from '/@/renderer/components/virtual-grid';
import { useSongListCount } from '/@/renderer/features/songs/queries/song-list-count-query';

const TrackListRoute = () => {
    const gridRef = useRef<VirtualInfiniteGridRef | null>(null);
    const tableRef = useRef<AgGridReactType | null>(null);
    const server = useCurrentServer();
    const [searchParams] = useSearchParams();
    const { albumArtistId, genreId } = useParams();

    const pageKey = albumArtistId ? `albumArtistSong` : 'song';

    const customFilters = useMemo(() => {
        const value = {
            ...(albumArtistId && { artistIds: [albumArtistId] }),
            ...(genreId && {
                _custom: {
                    jellyfin: {
                        GenreIds: genreId,
                    },
                    navidrome: {
                        genre_id: genreId,
                    },
                },
                genre: genreId,
                genreId,
            }),
        };

        if (isEmpty(value)) {
            return undefined;
        }

        return value;
    }, [albumArtistId, genreId]);

    const handlePlayQueueAdd = usePlayQueueAdd();
    const songListFilter = useListFilterByKey<SongListQuery>({
        filter: customFilters,
        key: pageKey,
    });

    const genreList = useGenreList({
        options: {
            cacheTime: 1000 * 60 * 60,
            enabled: !!genreId,
        },
        query: {
            sortBy: GenreListSort.NAME,
            sortOrder: SortOrder.ASC,
            startIndex: 0,
        },
        serverId: server?.id,
    });

    const genreTitle = useMemo(() => {
        if (!genreList.data) return '';
        const genre = genreList.data.items.find((g) => g.id === genreId);

        if (!genre) return 'Unknown';

        return genre?.name;
    }, [genreId, genreList.data]);

    const itemCountCheck = useSongListCount({
        options: {
            cacheTime: 1000 * 60,
            staleTime: 1000 * 60,
        },
        query: {
            limit: 1,
            startIndex: 0,
            ...songListFilter,
        },
        serverId: server?.id,
    });

    const itemCount = itemCountCheck.data === null ? undefined : itemCountCheck.data;

    const handlePlay = useCallback(
        async (args: { initialSongId?: string; playType: Play }) => {
            if (!itemCount || itemCount === 0) return;
            const { initialSongId, playType } = args;
            const query: SongListQuery = { startIndex: 0, ...songListFilter };

            if (albumArtistId) {
                handlePlayQueueAdd?.({
                    byItemType: {
                        id: [albumArtistId],
                        type: LibraryItem.ALBUM_ARTIST,
                    },
                    initialSongId,
                    playType,
                    query,
                });
            } else {
                handlePlayQueueAdd?.({
                    byItemType: {
                        id: [],
                        type: LibraryItem.SONG,
                    },
                    initialSongId,
                    playType,
                    query,
                });
            }
        },
        [albumArtistId, handlePlayQueueAdd, itemCount, songListFilter],
    );

    const providerValue = useMemo(() => {
        return {
            customFilters,
            handlePlay,
            id: albumArtistId ?? genreId,
            pageKey,
        };
    }, [albumArtistId, customFilters, genreId, handlePlay, pageKey]);

    return (
        <AnimatedPage>
            <ListContext.Provider value={providerValue}>
                <SongListHeader
                    gridRef={gridRef}
                    itemCount={itemCount}
                    tableRef={tableRef}
                    title={
                        searchParams.get('artistName') || genreId
                            ? `"${titleCase(genreTitle)}" Tracks`
                            : undefined
                    }
                />
                <SongListContent
                    gridRef={gridRef}
                    itemCount={itemCount}
                    tableRef={tableRef}
                />
            </ListContext.Provider>
        </AnimatedPage>
    );
};

export default TrackListRoute;
