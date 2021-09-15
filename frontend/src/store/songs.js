import { csrfFetch } from './csrf';

const SET_SONGS = 'songs/SET_SONGS'

const CREATE_SONG = 'songs/CREATE_SONG'

const setSongsAction = (songs) => {
  return {
    type: SET_SONGS,
    payload: songs,
  };
};

const createSongAction = (song) => {
  return {
    type: CREATE_SONG,
    payload: song,
  };
};

export const getSongs = () => async (dispatch) => {
  const response = await fetch('/api/songs');
  const songs = await response.json();
  dispatch(setSongsAction(songs));
  return response;
};

export const createSong = (song) => async (dispatch) => {
  let response = await csrfFetch('/api/songs', {
    method: 'POST',
    body: JSON.stringify(song),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  response = await response.json();
  dispatch(createSongAction(response));
  return response;
}

const initialState = { title: null, album: null, url: null, id: null, allSongs: [] };

const songsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SONGS:
      newState = Object.assign({}, state);
      newState.allSongs = action.payload;
      return newState;
    case CREATE_SONG:
      newState = Object.assign({}, state);
      newState.title = action.payload.title;
      newState.album = action.payload.album;
      newState.url = action.payload.url;
      newState.id = action.payload.id;
      return newState;
    default:
      return state;
  }
}

export default songsReducer;
