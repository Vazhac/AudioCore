import { csrfFetch } from './csrf';

const SET_COMMENTS = 'songs/SET_COMMENTS';

const setComments = comments => ({
  type: SET_COMMENTS,
  payload: comments,
});

export const getComments = (id) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${id}/comments`);

  if (response.ok) {
    const comments = await response.json();
    dispatch(setComments(comments));
  }
};

const initialState = {};

const commentsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_COMMENTS:
      newState = { ...state }
      newState.comments = action.payload;
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
