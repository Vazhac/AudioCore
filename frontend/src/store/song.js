import { csrfFetch } from './csrf';

const SET_SONG = 'songs/:id/SET_SONG'

const setSongAction = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};

export const getSong = () => async (dispatch) => {
  const response = await csrfFetch('/api/songs/:id');
  const song = await response.json();
  dispatch(setSongAction(song));
  return response;
};

const initialState = { song: {} };

const songReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_SONG:
      newState = Object.assign({}, state);
      newState.song = action.payload;
      return newState;
    default:
      return state;
  }
}

export default songReducer;
