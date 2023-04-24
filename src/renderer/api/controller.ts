import { useAuthStore } from '/@/renderer/store';
import { toast } from '/@/renderer/components/toast';
import type {
  AlbumDetailArgs,
  AlbumListArgs,
  SongListArgs,
  SongDetailArgs,
  AlbumArtistDetailArgs,
  AlbumArtistListArgs,
  RatingArgs,
  GenreListArgs,
  CreatePlaylistArgs,
  DeletePlaylistArgs,
  PlaylistDetailArgs,
  PlaylistListArgs,
  MusicFolderListArgs,
  PlaylistSongListArgs,
  ArtistListArgs,
  UpdatePlaylistArgs,
  UserListArgs,
  FavoriteArgs,
  TopSongListArgs,
  AddToPlaylistArgs,
  AddToPlaylistResponse,
  RemoveFromPlaylistArgs,
  RemoveFromPlaylistResponse,
  ScrobbleArgs,
  ScrobbleResponse,
  AlbumArtistDetailResponse,
  FavoriteResponse,
  CreatePlaylistResponse,
  AlbumArtistListResponse,
  AlbumDetailResponse,
  AlbumListResponse,
  ArtistListResponse,
  GenreListResponse,
  MusicFolderListResponse,
  PlaylistDetailResponse,
  PlaylistListResponse,
  RatingResponse,
  SongDetailResponse,
  SongListResponse,
  TopSongListResponse,
  UpdatePlaylistResponse,
  UserListResponse,
} from '/@/renderer/api/types';
import { jellyfinApi } from '/@/renderer/api/jellyfin.api';
import { ServerListItem } from '/@/renderer/types';
import { DeletePlaylistResponse } from './types';
import { ndController } from '/@/renderer/api/navidrome/navidrome-controller';
import { ssController } from '/@/renderer/api/subsonic/subsonic-controller';

export type ControllerEndpoint = Partial<{
  addToPlaylist: (args: AddToPlaylistArgs) => Promise<AddToPlaylistResponse>;
  clearPlaylist: () => void;
  createFavorite: (args: FavoriteArgs) => Promise<FavoriteResponse>;
  createPlaylist: (args: CreatePlaylistArgs) => Promise<CreatePlaylistResponse>;
  deleteFavorite: (args: FavoriteArgs) => Promise<FavoriteResponse>;
  deletePlaylist: (args: DeletePlaylistArgs) => Promise<DeletePlaylistResponse>;
  getAlbumArtistDetail: (args: AlbumArtistDetailArgs) => Promise<AlbumArtistDetailResponse>;
  getAlbumArtistList: (args: AlbumArtistListArgs) => Promise<AlbumArtistListResponse>;
  getAlbumDetail: (args: AlbumDetailArgs) => Promise<AlbumDetailResponse>;
  getAlbumList: (args: AlbumListArgs) => Promise<AlbumListResponse>;
  getArtistDetail: () => void;
  getArtistInfo: (args: any) => void;
  getArtistList: (args: ArtistListArgs) => Promise<ArtistListResponse>;
  getFavoritesList: () => void;
  getFolderItemList: () => void;
  getFolderList: () => void;
  getFolderSongs: () => void;
  getGenreList: (args: GenreListArgs) => Promise<GenreListResponse>;
  getMusicFolderList: (args: MusicFolderListArgs) => Promise<MusicFolderListResponse>;
  getPlaylistDetail: (args: PlaylistDetailArgs) => Promise<PlaylistDetailResponse>;
  getPlaylistList: (args: PlaylistListArgs) => Promise<PlaylistListResponse>;
  getPlaylistSongList: (args: PlaylistSongListArgs) => Promise<SongListResponse>;
  getSongDetail: (args: SongDetailArgs) => Promise<SongDetailResponse>;
  getSongList: (args: SongListArgs) => Promise<SongListResponse>;
  getTopSongs: (args: TopSongListArgs) => Promise<TopSongListResponse>;
  getUserList: (args: UserListArgs) => Promise<UserListResponse>;
  removeFromPlaylist: (args: RemoveFromPlaylistArgs) => Promise<RemoveFromPlaylistResponse>;
  scrobble: (args: ScrobbleArgs) => Promise<ScrobbleResponse>;
  updatePlaylist: (args: UpdatePlaylistArgs) => Promise<UpdatePlaylistResponse>;
  updateRating: (args: RatingArgs) => Promise<RatingResponse>;
}>;

type ApiController = {
  jellyfin: ControllerEndpoint;
  navidrome: ControllerEndpoint;
  subsonic: ControllerEndpoint;
};

const endpoints: ApiController = {
  jellyfin: {
    addToPlaylist: jellyfinApi.addToPlaylist,
    clearPlaylist: undefined,
    createFavorite: jellyfinApi.createFavorite,
    createPlaylist: jellyfinApi.createPlaylist,
    deleteFavorite: jellyfinApi.deleteFavorite,
    deletePlaylist: jellyfinApi.deletePlaylist,
    getAlbumArtistDetail: jellyfinApi.getAlbumArtistDetail,
    getAlbumArtistList: jellyfinApi.getAlbumArtistList,
    getAlbumDetail: jellyfinApi.getAlbumDetail,
    getAlbumList: jellyfinApi.getAlbumList,
    getArtistDetail: undefined,
    getArtistInfo: undefined,
    getArtistList: jellyfinApi.getArtistList,
    getFavoritesList: undefined,
    getFolderItemList: undefined,
    getFolderList: undefined,
    getFolderSongs: undefined,
    getGenreList: jellyfinApi.getGenreList,
    getMusicFolderList: jellyfinApi.getMusicFolderList,
    getPlaylistDetail: jellyfinApi.getPlaylistDetail,
    getPlaylistList: jellyfinApi.getPlaylistList,
    getPlaylistSongList: jellyfinApi.getPlaylistSongList,
    getSongDetail: undefined,
    getSongList: jellyfinApi.getSongList,
    getTopSongs: jellyfinApi.getTopSongList,
    getUserList: undefined,
    removeFromPlaylist: jellyfinApi.removeFromPlaylist,
    scrobble: jellyfinApi.scrobble,
    updatePlaylist: jellyfinApi.updatePlaylist,
    updateRating: undefined,
  },
  navidrome: {
    addToPlaylist: ndController.addToPlaylist,
    clearPlaylist: undefined,
    createFavorite: ssController.createFavorite,
    createPlaylist: ndController.createPlaylist,
    deleteFavorite: ssController.removeFavorite,
    deletePlaylist: ndController.deletePlaylist,
    getAlbumArtistDetail: ndController.getAlbumArtistDetail,
    getAlbumArtistList: ndController.getAlbumArtistList,
    getAlbumDetail: ndController.getAlbumDetail,
    getAlbumList: ndController.getAlbumList,
    getArtistDetail: undefined,
    getArtistInfo: undefined,
    getArtistList: undefined,
    getFavoritesList: undefined,
    getFolderItemList: undefined,
    getFolderList: undefined,
    getFolderSongs: undefined,
    getGenreList: ndController.getGenreList,
    getMusicFolderList: ssController.getMusicFolderList,
    getPlaylistDetail: ndController.getPlaylistDetail,
    getPlaylistList: ndController.getPlaylistList,
    getPlaylistSongList: ndController.getPlaylistSongList,
    getSongDetail: ndController.getSongDetail,
    getSongList: ndController.getSongList,
    getTopSongs: ssController.getTopSongList,
    getUserList: ndController.getUserList,
    removeFromPlaylist: ndController.removeFromPlaylist,
    scrobble: ssController.scrobble,
    updatePlaylist: ndController.updatePlaylist,
    updateRating: ssController.setRating,
  },
  subsonic: {
    clearPlaylist: undefined,
    createFavorite: ssController.createFavorite,
    createPlaylist: undefined,
    deleteFavorite: ssController.removeFavorite,
    deletePlaylist: undefined,
    getAlbumArtistDetail: undefined,
    getAlbumArtistList: undefined,
    getAlbumDetail: undefined,
    getAlbumList: undefined,
    getArtistDetail: undefined,
    getArtistInfo: undefined,
    getArtistList: undefined,
    getFavoritesList: undefined,
    getFolderItemList: undefined,
    getFolderList: undefined,
    getFolderSongs: undefined,
    getGenreList: undefined,
    getMusicFolderList: ssController.getMusicFolderList,
    getPlaylistDetail: undefined,
    getPlaylistList: undefined,
    getSongDetail: undefined,
    getSongList: undefined,
    getTopSongs: ssController.getTopSongList,
    getUserList: undefined,
    scrobble: ssController.scrobble,
    updatePlaylist: undefined,
    updateRating: undefined,
  },
};

const apiController = (endpoint: keyof ControllerEndpoint, server?: ServerListItem | null) => {
  const serverType = server?.type || useAuthStore.getState().currentServer?.type;

  if (!serverType) {
    toast.error({ message: 'No server selected', title: 'Unable to route request' });
    return () => undefined;
  }

  const controllerFn = endpoints[serverType][endpoint];

  if (typeof controllerFn !== 'function') {
    toast.error({
      message: `Endpoint ${endpoint} is not implemented for ${serverType}`,
      title: 'Unable to route request',
    });
    return () => undefined;
  }

  return endpoints[serverType][endpoint];
};

const getAlbumList = async (args: AlbumListArgs) => {
  return (apiController('getAlbumList') as ControllerEndpoint['getAlbumList'])?.(args);
};

const getAlbumDetail = async (args: AlbumDetailArgs) => {
  return (apiController('getAlbumDetail') as ControllerEndpoint['getAlbumDetail'])?.(args);
};

const getSongList = async (args: SongListArgs) => {
  return (apiController('getSongList') as ControllerEndpoint['getSongList'])?.(args);
};

const getMusicFolderList = async (args: MusicFolderListArgs) => {
  return (apiController('getMusicFolderList') as ControllerEndpoint['getMusicFolderList'])?.(args);
};

const getGenreList = async (args: GenreListArgs) => {
  return (apiController('getGenreList') as ControllerEndpoint['getGenreList'])?.(args);
};

const getAlbumArtistDetail = async (args: AlbumArtistDetailArgs) => {
  return (apiController('getAlbumArtistDetail') as ControllerEndpoint['getAlbumArtistDetail'])?.(
    args,
  );
};

const getAlbumArtistList = async (args: AlbumArtistListArgs) => {
  return (apiController('getAlbumArtistList') as ControllerEndpoint['getAlbumArtistList'])?.(args);
};

const getArtistList = async (args: ArtistListArgs) => {
  return (apiController('getArtistList') as ControllerEndpoint['getArtistList'])?.(args);
};

const getPlaylistList = async (args: PlaylistListArgs) => {
  return (apiController('getPlaylistList') as ControllerEndpoint['getPlaylistList'])?.(args);
};

const createPlaylist = async (args: CreatePlaylistArgs) => {
  return (apiController('createPlaylist') as ControllerEndpoint['createPlaylist'])?.(args);
};

const updatePlaylist = async (args: UpdatePlaylistArgs) => {
  return (apiController('updatePlaylist') as ControllerEndpoint['updatePlaylist'])?.(args);
};

const deletePlaylist = async (args: DeletePlaylistArgs) => {
  return (apiController('deletePlaylist') as ControllerEndpoint['deletePlaylist'])?.(args);
};

const addToPlaylist = async (args: AddToPlaylistArgs) => {
  return (apiController('addToPlaylist') as ControllerEndpoint['addToPlaylist'])?.(args);
};

const removeFromPlaylist = async (args: RemoveFromPlaylistArgs) => {
  return (apiController('removeFromPlaylist') as ControllerEndpoint['removeFromPlaylist'])?.(args);
};

const getPlaylistDetail = async (args: PlaylistDetailArgs) => {
  return (apiController('getPlaylistDetail') as ControllerEndpoint['getPlaylistDetail'])?.(args);
};

const getPlaylistSongList = async (args: PlaylistSongListArgs) => {
  return (apiController('getPlaylistSongList') as ControllerEndpoint['getPlaylistSongList'])?.(
    args,
  );
};

const getUserList = async (args: UserListArgs) => {
  return (apiController('getUserList') as ControllerEndpoint['getUserList'])?.(args);
};

const createFavorite = async (args: FavoriteArgs) => {
  return (apiController('createFavorite') as ControllerEndpoint['createFavorite'])?.(args);
};

const deleteFavorite = async (args: FavoriteArgs) => {
  return (apiController('deleteFavorite') as ControllerEndpoint['deleteFavorite'])?.(args);
};

const updateRating = async (args: RatingArgs) => {
  return (apiController('updateRating') as ControllerEndpoint['updateRating'])?.(args);
};

const getTopSongList = async (args: TopSongListArgs) => {
  return (apiController('getTopSongs') as ControllerEndpoint['getTopSongs'])?.(args);
};

const scrobble = async (args: ScrobbleArgs) => {
  return (apiController('scrobble', args.server) as ControllerEndpoint['scrobble'])?.(args);
};

export const controller = {
  addToPlaylist,
  createFavorite,
  createPlaylist,
  deleteFavorite,
  deletePlaylist,
  getAlbumArtistDetail,
  getAlbumArtistList,
  getAlbumDetail,
  getAlbumList,
  getArtistList,
  getGenreList,
  getMusicFolderList,
  getPlaylistDetail,
  getPlaylistList,
  getPlaylistSongList,
  getSongList,
  getTopSongList,
  getUserList,
  removeFromPlaylist,
  scrobble,
  updatePlaylist,
  updateRating,
};
