import { csrfFetch } from './csrf';

const SET_ALBUM = 'SET_ALBUM';
const CREATE_ALBUM = 'albums/CREATE_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';
const REMOVE_ALBUM = 'albums/REMOVE_ALBUM';
const SET_ALBUMS = 'albums/SET_ALBUMS';

const createAlbumAction = album => ({
  type: CREATE_ALBUM,
  payload: album,
});


const setAlbumAction = (album) => {
  return {
    type: SET_ALBUM,
    payload: album,
  };
};

const removeAlbumAction = (album) => {
  return {
    type: REMOVE_ALBUM,
    payload: album
  };
};

const setAlbums = albums => ({
  type: SET_ALBUMS,
  albums,
});

export const createAlbum = album => async dispatch => {
  const response = await csrfFetch('/api/albums', {
    method: 'POST',
    body: JSON.stringify(album),
  });
  const newAlbum = await response.json();
  dispatch(createAlbumAction(newAlbum));
}

export const fetchAlbum = albumId => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`);
  const album = await response.json();
  dispatch(setAlbumAction(album));
}

export const editAlbum = albumId => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'PUT',
    body: JSON.stringify(albumId),
  });
  const editedAlbum = await response.json();
  dispatch(createAlbumAction(editedAlbum));
}

export const deleteAlbum = albumId => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'DELETE',
  });
  dispatch(removeAlbumAction(albumId));
}

export const fetchAlbums = () => async dispatch => {
  const response = await csrfFetch('/api/albums');
  const albums = await response.json();
  dispatch(setAlbums(albums));
}

const initialState = { albums: [] };

const albumsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.payload) {
    case CREATE_ALBUM:
      newState.albums.push(action.payload);
      return newState;
    case SET_ALBUM:
      newState.album = action.payload || {};
      return newState;
    case EDIT_ALBUM:
      newState = Object.assign({}, state);
      newState.albums = newState.albums.map(album => {
        if (album.id === action.album.id) {
          return action.payload;
        } else {
          return album;
        }
      });
      return newState;
    case SET_ALBUMS:
      return {
        ...state,
        albums: action.payload
      };
    case REMOVE_ALBUM:
      newState.albums = newState.albums.filter(album => album.id !== action.payload);
      return newState;
    default:
      return state;
  }
}

export default albumsReducer;
