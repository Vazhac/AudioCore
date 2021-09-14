const SET_SONGS = 'songs/SET_SONGS'

const setSongs = (songs) => {
  return {
    type: SET_SONGS,
    payload: songs,
  };
};

export const getSongs = () => async (dispatch) => {
  let response = await fetch('/api/songs')
  response = await response.json();
  console.log(response);
  dispatch(setSongs(response));
  return response;
}

const songsReducer = (state = {}, action) => {
  let newState = {}
  switch (action.type) {
    case 'SET_SONGS':
      action.payload.forEach(element => {
        newState[element.id] = element;
      });
      return newState;
    default:
      return state;
  }
}

export default songsReducer;
