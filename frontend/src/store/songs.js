import { csrfFetch } from './csrf';

const CREATE_SONG = 'songs/CREATE_SONG';
const SET_SONG = 'songs/SET_SONG';
const EDIT_SONG = 'songs/EDIT_SONG'
const REMOVE_SONG = 'songs/REMOVE_SONG'
const SET_SONGS = 'songs/SET_SONGS'


const createSongAction = (song) => {
  return {
    type: CREATE_SONG,
    payload: song,
  };
};

const editSongAction = (song) => {
  return {
    type: EDIT_SONG,
    payload: song
  }
}

const setSongAction = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};

const setSongsAction = (songs) => {
  return {
    type: SET_SONGS,
    payload: songs,
  };
};

const removeSongAction = (songId) => {
  return {
    type: REMOVE_SONG,
    payload: songId
  };
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

export const fetchSong = () => async (dispatch) => {
  const response = await csrfFetch('/api/songs');
  const song = await response.json();
  dispatch(setSongAction(song));
  return response;
};

export const editSong = (song) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${song.id}`, {
    method: 'PUT',
    include: 'user',
    body: JSON.stringify(song)
  });
  dispatch(editSongAction(song));
  return response;
}

export const fetchSongs = () => async (dispatch) => {
  const response = await csrfFetch('/api/songs');
  const songs = await response.json();
  dispatch(setSongsAction(songs));
  return response;
};

// delete the song from the database and remove it from the state
export const deleteSong = (songId) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${songId}`, {
    method: 'DELETE',
  });

  dispatch(removeSongAction(songId));
  dispatch(fetchSongs());
  return response;
};


let initialState = {};

const songsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case CREATE_SONG:
      newState.song = action.payload;
      return newState;
    case SET_SONG:
      newState.songs = action.payload;
      return newState;
    case EDIT_SONG:
      newState.songs = newState.songs.map(song => {
        if (song.id === action.payload.id) {
          return action.payload;
        }
        return song;
      });
      return newState;
    case REMOVE_SONG:
      newState.songs = newState.songs.filter(song => song.id !== action.payload);
      return newState;
    case SET_SONGS:
      newState.songs = action.payload;
      return newState;
    default:
      return state;
  }
};

export default songsReducer;
