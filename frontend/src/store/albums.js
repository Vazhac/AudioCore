import { csrfFetch } from './csrf';

const CREATE_ALBUM = 'albums/CREATE_ALBUM';
const SET_ALBUM = 'albums/SET_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';
const REMOVE_ALBUM = 'albums/REMOVE_ALBUM';
const SET_ALBUMS = 'albums/SET_ALBUMS';

const createAlbumAction = album => {
  return {
    type: CREATE_ALBUM,
    payload: album,
  };
};

const editAlbumAction = (album) => {
  return {
    type: EDIT_ALBUM,
    payload: album,
  };
};

const setAlbumAction = (album) => {
  return {
    type: SET_ALBUM,
    payload: album,
  };
};

const setAlbumsAction = (albums) => {
  return {
    type: SET_ALBUMS,
    payload: albums,
  };
};

const removeAlbumAction = (album) => {
  return {
    type: REMOVE_ALBUM,
    payload: album
  };
};

export const createAlbum = (album) => async dispatch => {
  const response = await csrfFetch('/api/albums', {
    method: 'POST',
    body: JSON.stringify(album),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.json();
  dispatch(createAlbumAction(response));
  return response;
}

export const fetchAlbum = id => async (dispatch) => {
  const response = await csrfFetch(`/api/albums/${id}`);
  const album = await response.json();
  if (response.ok) {
    dispatch(setAlbumAction(album));
    return response;
  }
}

export const editAlbum = album => async dispatch => {
  const response = await csrfFetch(`/api/albums/${album.id}`, {
    method: 'PUT',
    body: JSON.stringify(album),
  });

  dispatch(editAlbumAction(album));
  return response;
}

export const fetchAlbums = () => async dispatch => {
  const response = await csrfFetch('/api/albums');
  const albums = await response.json();
  dispatch(setAlbumsAction(albums));
  return response;
}

export const deleteAlbum = albumId => async dispatch => {
  const response = await csrfFetch(`/api/albums/${albumId}`, {
    method: 'DELETE',
  });

  dispatch(removeAlbumAction(albumId));
  dispatch(fetchAlbums());
  return response;
}

const initialState = {};

const albumsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_ALBUM:
      newState.album = action.payload;
      return newState;
    case EDIT_ALBUM:
      newState.albums = newState.albums.map(album => {
        if (album.id === action.payload.id) {
          return action.payload;
        }
        return album;
      });
      return newState;
    case SET_ALBUM:
      newState.albums = action.payload;
      return newState;
    case REMOVE_ALBUM:
      newState.albums = newState.albums.filter(album => album.id !== action.payload);
      return newState;
    case SET_ALBUMS:
      newState.albums = action.payload;
      return newState;
    default:
      return state;
  }
};

export default albumsReducer;
