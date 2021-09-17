import { csrfFetch } from './csrf';

const SET_ALBUMS = 'albums/SET_ALBUMS';

const setAlbums = albums => ({
  type: SET_ALBUMS,
  albums,
});

export const fetchAlbums = () => async dispatch => {
  const response = await csrfFetch('/api/albums');
  const albums = await response.json();
  dispatch(setAlbums(albums));
}

const initialState = { albums: [] };

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALBUMS:
      return { ...state, albums: action.payload }
    default:
      return state;
  }
}

export default albumsReducer;
