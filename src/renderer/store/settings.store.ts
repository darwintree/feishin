/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColDef } from '@ag-grid-community/core';
import isElectron from 'is-electron';
import { generatePath } from 'react-router';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { shallow } from 'zustand/shallow';
import { LibraryItem, LyricSource } from '/@/renderer/api/types';
import { AppRoute } from '/@/renderer/router/routes';
import { AppTheme } from '/@/renderer/themes/types';
import {
    TableColumn,
    CrossfadeStyle,
    Play,
    PlaybackStyle,
    PlaybackType,
    TableType,
    Platform,
    FontType,
} from '/@/renderer/types';
import { randomString } from '/@/renderer/utils';
import i18n from '/@/i18n/i18n';
import { usePlayerStore } from '/@/renderer/store/player.store';
import { mergeOverridingColumns } from '/@/renderer/store/utils';

const utils = isElectron() ? window.electron.utils : null;

export type SidebarItemType = {
    disabled: boolean;
    id: string;
    label: string;
    route: AppRoute | string;
};

export const sidebarItems = [
    {
        disabled: true,
        id: 'Now Playing',
        label: i18n.t('page.sidebar.nowPlaying'),
        route: AppRoute.NOW_PLAYING,
    },
    {
        disabled: true,
        id: 'Search',
        label: i18n.t('page.sidebar.search'),
        route: generatePath(AppRoute.SEARCH, { itemType: LibraryItem.SONG }),
    },
    { disabled: false, id: 'Home', label: i18n.t('page.sidebar.home'), route: AppRoute.HOME },
    {
        disabled: false,
        id: 'Albums',
        label: i18n.t('page.sidebar.albums'),
        route: AppRoute.LIBRARY_ALBUMS,
    },
    {
        disabled: false,
        id: 'Tracks',
        label: i18n.t('page.sidebar.tracks'),
        route: AppRoute.LIBRARY_SONGS,
    },
    {
        disabled: false,
        id: 'Artists',
        label: i18n.t('page.sidebar.artists'),
        route: AppRoute.LIBRARY_ALBUM_ARTISTS,
    },
    {
        disabled: false,
        id: 'Genres',
        label: i18n.t('page.sidebar.genres'),
        route: AppRoute.LIBRARY_GENRES,
    },
    {
        disabled: true,
        id: 'Folders',
        label: i18n.t('page.sidebar.folders'),
        route: AppRoute.LIBRARY_FOLDERS,
    },
    {
        disabled: true,
        id: 'Playlists',
        label: i18n.t('page.sidebar.playlists'),
        route: AppRoute.PLAYLISTS,
    },
    {
        disabled: true,
        id: 'Settings',
        label: i18n.t('page.sidebar.settings'),
        route: AppRoute.SETTINGS,
    },
];

export type SortableItem<T> = {
    disabled: boolean;
    id: T;
};

export enum HomeItem {
    MOST_PLAYED = 'mostPlayed',
    RANDOM = 'random',
    RECENTLY_ADDED = 'recentlyAdded',
    RECENTLY_PLAYED = 'recentlyPlayed',
}

export const homeItems = Object.values(HomeItem).map((item) => ({
    disabled: false,
    id: item,
}));

export type PersistedTableColumn = {
    column: TableColumn;
    extraProps?: Partial<ColDef>;
    width: number;
};

export type DataTableProps = {
    autoFit: boolean;
    columns: PersistedTableColumn[];
    followCurrentSong?: boolean;
    rowHeight: number;
};

export type SideQueueType = 'sideQueue' | 'sideDrawerQueue';

type MpvSettings = {
    audioExclusiveMode: 'yes' | 'no';
    audioFormat?: 's16' | 's32' | 'float';
    audioSampleRateHz?: number;
    gaplessAudio: 'yes' | 'no' | 'weak';
    replayGainClip: boolean;
    replayGainFallbackDB?: number;
    replayGainMode: 'no' | 'track' | 'album';
    replayGainPreampDB?: number;
};

export enum BindingActions {
    BROWSER_BACK = 'browserBack',
    BROWSER_FORWARD = 'browserForward',
    FAVORITE_CURRENT_ADD = 'favoriteCurrentAdd',
    FAVORITE_CURRENT_REMOVE = 'favoriteCurrentRemove',
    FAVORITE_CURRENT_TOGGLE = 'favoriteCurrentToggle',
    FAVORITE_PREVIOUS_ADD = 'favoritePreviousAdd',
    FAVORITE_PREVIOUS_REMOVE = 'favoritePreviousRemove',
    FAVORITE_PREVIOUS_TOGGLE = 'favoritePreviousToggle',
    GLOBAL_SEARCH = 'globalSearch',
    LOCAL_SEARCH = 'localSearch',
    MUTE = 'volumeMute',
    NEXT = 'next',
    PAUSE = 'pause',
    PLAY = 'play',
    PLAY_PAUSE = 'playPause',
    PREVIOUS = 'previous',
    RATE_0 = 'rate0',
    RATE_1 = 'rate1',
    RATE_2 = 'rate2',
    RATE_3 = 'rate3',
    RATE_4 = 'rate4',
    RATE_5 = 'rate5',
    SHUFFLE = 'toggleShuffle',
    SKIP_BACKWARD = 'skipBackward',
    SKIP_FORWARD = 'skipForward',
    STOP = 'stop',
    TOGGLE_FULLSCREEN_PLAYER = 'toggleFullscreenPlayer',
    TOGGLE_QUEUE = 'toggleQueue',
    TOGGLE_REPEAT = 'toggleRepeat',
    VOLUME_DOWN = 'volumeDown',
    VOLUME_UP = 'volumeUp',
    ZOOM_IN = 'zoomIn',
    ZOOM_OUT = 'zoomOut',
}

export enum GenreTarget {
    ALBUM = 'album',
    TRACK = 'track',
}

export interface SettingsState {
    discord: {
        clientId: string;
        enableIdle: boolean;
        enabled: boolean;
        showServerImage: boolean;
        updateInterval: number;
    };
    font: {
        builtIn: string;
        custom: string | null;
        system: string | null;
        type: FontType;
    };
    general: {
        accent: string;
        albumArtRes?: number | null;
        buttonSize: number;
        defaultFullPlaylist: boolean;
        externalLinks: boolean;
        followSystemTheme: boolean;
        genreTarget: GenreTarget;
        homeItems: SortableItem<HomeItem>[];
        language: string;
        passwordStore?: string;
        playButtonBehavior: Play;
        resume: boolean;
        showQueueDrawerButton: boolean;
        sideQueueType: SideQueueType;
        sidebarCollapsedNavigation: boolean;
        sidebarItems: SidebarItemType[];
        sidebarPlaylistList: boolean;
        skipButtons: {
            enabled: boolean;
            skipBackwardSeconds: number;
            skipForwardSeconds: number;
        };
        theme: AppTheme;
        themeDark: AppTheme;
        themeLight: AppTheme;
        volumeWheelStep: number;
        zoomFactor: number;
    };
    hotkeys: {
        bindings: Record<
            BindingActions,
            { allowGlobal: boolean; hotkey: string; isGlobal: boolean }
        >;
        globalMediaHotkeys: boolean;
    };
    lyrics: {
        alignment: 'left' | 'center' | 'right';
        delayMs: number;
        fetch: boolean;
        follow: boolean;
        fontSize: number;
        fontSizeUnsync: number;
        gap: number;
        gapUnsync: number;
        showMatch: boolean;
        showProvider: boolean;
        sources: LyricSource[];
    };
    playback: {
        audioDeviceId?: string | null;
        crossfadeDuration: number;
        crossfadeStyle: CrossfadeStyle;
        mpvExtraParameters: string[];
        mpvProperties: MpvSettings;
        muted: boolean;
        scrobble: {
            enabled: boolean;
            scrobbleAtDuration: number;
            scrobbleAtPercentage: number;
        };
        style: PlaybackStyle;
        type: PlaybackType;
    };
    remote: {
        enabled: boolean;
        password: string;
        port: number;
        username: string;
    };
    tab: 'general' | 'playback' | 'window' | 'hotkeys' | string;
    tables: {
        albumDetail: DataTableProps;
        fullScreen: DataTableProps;
        nowPlaying: DataTableProps;
        sideDrawerQueue: DataTableProps;
        sideQueue: DataTableProps;
        songs: DataTableProps;
    };
    window: {
        disableAutoUpdate: boolean;
        exitToTray: boolean;
        minimizeToTray: boolean;
        startMinimized: boolean;
        windowBarStyle: Platform;
    };
}

export interface SettingsSlice extends SettingsState {
    actions: {
        reset: () => void;
        resetSampleRate: () => void;
        setGenreBehavior: (target: GenreTarget) => void;
        setHomeItems: (item: SortableItem<HomeItem>[]) => void;
        setSettings: (data: Partial<SettingsState>) => void;
        setSidebarItems: (items: SidebarItemType[]) => void;
        setTable: (type: TableType, data: DataTableProps) => void;
    };
}

// Determines the default/initial windowBarStyle value based on the current platform.
const getPlatformDefaultWindowBarStyle = (): Platform => {
    return utils ? (utils.isMacOS() ? Platform.MACOS : Platform.WINDOWS) : Platform.WEB;
};

const platformDefaultWindowBarStyle: Platform = getPlatformDefaultWindowBarStyle();

const initialState: SettingsState = {
    discord: {
        clientId: '1165957668758900787',
        enableIdle: false,
        enabled: false,
        showServerImage: false,
        updateInterval: 15,
    },
    font: {
        builtIn: 'Inter',
        custom: null,
        system: null,
        type: FontType.BUILT_IN,
    },
    general: {
        accent: 'rgb(53, 116, 252)',
        albumArtRes: undefined,
        buttonSize: 20,
        defaultFullPlaylist: true,
        externalLinks: true,
        followSystemTheme: false,
        genreTarget: GenreTarget.TRACK,
        homeItems,
        language: 'en',
        passwordStore: undefined,
        playButtonBehavior: Play.NOW,
        resume: false,
        showQueueDrawerButton: false,
        sideQueueType: 'sideQueue',
        sidebarCollapsedNavigation: true,
        sidebarItems,
        sidebarPlaylistList: true,
        skipButtons: {
            enabled: false,
            skipBackwardSeconds: 5,
            skipForwardSeconds: 10,
        },
        theme: AppTheme.DEFAULT_DARK,
        themeDark: AppTheme.DEFAULT_DARK,
        themeLight: AppTheme.DEFAULT_LIGHT,
        volumeWheelStep: 5,
        zoomFactor: 100,
    },
    hotkeys: {
        bindings: {
            browserBack: { allowGlobal: false, hotkey: '', isGlobal: false },
            browserForward: { allowGlobal: false, hotkey: '', isGlobal: false },
            favoriteCurrentAdd: { allowGlobal: true, hotkey: '', isGlobal: false },
            favoriteCurrentRemove: { allowGlobal: true, hotkey: '', isGlobal: false },
            favoriteCurrentToggle: { allowGlobal: true, hotkey: '', isGlobal: false },
            favoritePreviousAdd: { allowGlobal: true, hotkey: '', isGlobal: false },
            favoritePreviousRemove: { allowGlobal: true, hotkey: '', isGlobal: false },
            favoritePreviousToggle: { allowGlobal: true, hotkey: '', isGlobal: false },
            globalSearch: { allowGlobal: false, hotkey: 'mod+k', isGlobal: false },
            localSearch: { allowGlobal: false, hotkey: 'mod+f', isGlobal: false },
            next: { allowGlobal: true, hotkey: '', isGlobal: false },
            pause: { allowGlobal: true, hotkey: '', isGlobal: false },
            play: { allowGlobal: true, hotkey: '', isGlobal: false },
            playPause: { allowGlobal: true, hotkey: 'space', isGlobal: false },
            previous: { allowGlobal: true, hotkey: '', isGlobal: false },
            rate0: { allowGlobal: true, hotkey: '', isGlobal: false },
            rate1: { allowGlobal: true, hotkey: '', isGlobal: false },
            rate2: { allowGlobal: true, hotkey: '', isGlobal: false },
            rate3: { allowGlobal: true, hotkey: '', isGlobal: false },
            rate4: { allowGlobal: true, hotkey: '', isGlobal: false },
            rate5: { allowGlobal: true, hotkey: '', isGlobal: false },
            skipBackward: { allowGlobal: true, hotkey: '', isGlobal: false },
            skipForward: { allowGlobal: true, hotkey: '', isGlobal: false },
            stop: { allowGlobal: true, hotkey: '', isGlobal: false },
            toggleFullscreenPlayer: { allowGlobal: false, hotkey: '', isGlobal: false },
            toggleQueue: { allowGlobal: false, hotkey: '', isGlobal: false },
            toggleRepeat: { allowGlobal: true, hotkey: '', isGlobal: false },
            toggleShuffle: { allowGlobal: true, hotkey: '', isGlobal: false },
            volumeDown: { allowGlobal: true, hotkey: '', isGlobal: false },
            volumeMute: { allowGlobal: true, hotkey: '', isGlobal: false },
            volumeUp: { allowGlobal: true, hotkey: '', isGlobal: false },
            zoomIn: { allowGlobal: true, hotkey: '', isGlobal: false },
            zoomOut: { allowGlobal: true, hotkey: '', isGlobal: false },
        },
        globalMediaHotkeys: true,
    },
    lyrics: {
        alignment: 'center',
        delayMs: 0,
        fetch: false,
        follow: true,
        fontSize: 46,
        fontSizeUnsync: 20,
        gap: 5,
        gapUnsync: 0,
        showMatch: true,
        showProvider: true,
        sources: [],
    },
    playback: {
        audioDeviceId: undefined,
        crossfadeDuration: 5,
        crossfadeStyle: CrossfadeStyle.EQUALPOWER,
        mpvExtraParameters: [],
        mpvProperties: {
            audioExclusiveMode: 'no',
            audioFormat: undefined,
            audioSampleRateHz: 0,
            gaplessAudio: 'weak',
            replayGainClip: true,
            replayGainFallbackDB: undefined,
            replayGainMode: 'no',
            replayGainPreampDB: 0,
        },
        muted: false,
        scrobble: {
            enabled: true,
            scrobbleAtDuration: 240,
            scrobbleAtPercentage: 75,
        },
        style: PlaybackStyle.GAPLESS,
        type: PlaybackType.WEB,
    },
    remote: {
        enabled: false,
        password: randomString(8),
        port: 4333,
        username: 'feishin',
    },
    tab: 'general',
    tables: {
        albumDetail: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.TRACK_NUMBER,
                    width: 50,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.BIT_RATE,
                    width: 300,
                },
                {
                    column: TableColumn.PLAY_COUNT,
                    width: 100,
                },
                {
                    column: TableColumn.LAST_PLAYED,
                    width: 100,
                },
                {
                    column: TableColumn.USER_FAVORITE,
                    width: 100,
                },
            ],
            rowHeight: 60,
        },
        fullScreen: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 80,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.USER_FAVORITE,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 60,
        },
        nowPlaying: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 80,
                },
                {
                    column: TableColumn.TITLE,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.ALBUM,
                    width: 100,
                },
                {
                    column: TableColumn.ALBUM_ARTIST,
                    width: 100,
                },
                {
                    column: TableColumn.GENRE,
                    width: 100,
                },
                {
                    column: TableColumn.YEAR,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 30,
        },
        sideDrawerQueue: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 60,
        },
        sideQueue: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 50,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
            ],
            followCurrentSong: true,
            rowHeight: 60,
        },
        songs: {
            autoFit: true,
            columns: [
                {
                    column: TableColumn.ROW_INDEX,
                    width: 50,
                },
                {
                    column: TableColumn.TITLE_COMBINED,
                    width: 500,
                },
                {
                    column: TableColumn.DURATION,
                    width: 100,
                },
                {
                    column: TableColumn.ALBUM,
                    width: 300,
                },
                {
                    column: TableColumn.ARTIST,
                    width: 100,
                },
                {
                    column: TableColumn.YEAR,
                    width: 100,
                },
            ],
            rowHeight: 60,
        },
    },
    window: {
        disableAutoUpdate: false,
        exitToTray: false,
        minimizeToTray: false,
        startMinimized: false,
        windowBarStyle: platformDefaultWindowBarStyle,
    },
};

export const useSettingsStore = create<SettingsSlice>()(
    persist(
        devtools(
            immer((set, get) => ({
                actions: {
                    reset: () => {
                        if (!isElectron()) {
                            set({
                                ...initialState,
                                playback: {
                                    ...initialState.playback,
                                    type: PlaybackType.WEB,
                                },
                            });
                        } else {
                            set(initialState);
                        }
                    },
                    resetSampleRate: () => {
                        set((state) => {
                            state.playback.mpvProperties.audioSampleRateHz = 0;
                        });
                    },
                    setGenreBehavior: (target: GenreTarget) => {
                        set((state) => {
                            state.general.genreTarget = target;
                        });
                    },
                    setHomeItems: (items: SortableItem<HomeItem>[]) => {
                        set((state) => {
                            state.general.homeItems = items;
                        });
                    },
                    setSettings: (data) => {
                        set({ ...get(), ...data });
                    },
                    setSidebarItems: (items: SidebarItemType[]) => {
                        set((state) => {
                            state.general.sidebarItems = items;
                        });
                    },
                    setTable: (type: TableType, data: DataTableProps) => {
                        set((state) => {
                            state.tables[type] = data;
                        });
                    },
                },
                ...initialState,
            })),
            { name: 'store_settings' },
        ),
        {
            merge: mergeOverridingColumns,
            name: 'store_settings',
            version: 8,
        },
    ),
);

export const useSettingsStoreActions = () => useSettingsStore((state) => state.actions);

export const usePlaybackSettings = () => useSettingsStore((state) => state.playback, shallow);

export const useTableSettings = (type: TableType) =>
    useSettingsStore((state) => state.tables[type]);

export const useGeneralSettings = () => useSettingsStore((state) => state.general, shallow);

export const usePlaybackType = () =>
    useSettingsStore((state) => {
        const isFallback = usePlayerStore.getState().fallback;

        if (isFallback) {
            return PlaybackType.WEB;
        }

        return state.playback.type;
    });

export const usePlayButtonBehavior = () =>
    useSettingsStore((state) => state.general.playButtonBehavior, shallow);

export const useWindowSettings = () => useSettingsStore((state) => state.window, shallow);

export const useHotkeySettings = () => useSettingsStore((state) => state.hotkeys, shallow);

export const useMpvSettings = () =>
    useSettingsStore((state) => state.playback.mpvProperties, shallow);

export const useLyricsSettings = () => useSettingsStore((state) => state.lyrics, shallow);

export const useRemoteSettings = () => useSettingsStore((state) => state.remote, shallow);

export const useFontSettings = () => useSettingsStore((state) => state.font, shallow);

export const useDiscordSetttings = () => useSettingsStore((state) => state.discord, shallow);
