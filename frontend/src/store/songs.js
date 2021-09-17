import { csrfFetch } from './csrf';

const SET_SONGS = 'songs/SET_SONGS'

const setSongsAction = (songs) => {
  return {
    type: SET_SONGS,
    payload: songs,
  };
};

export const fetchSongs = () => async (dispatch) => {
  const response = await csrfFetch('/api/songs');
  const songs = await response.json();
  dispatch(setSongsAction(songs));
  return response;
};

const songsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SONGS:
      return {
        ...state,
        songs: action.payload,
      };
    default:
      return state;
  }
};

export default songsReducer;
