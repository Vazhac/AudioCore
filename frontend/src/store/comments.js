import { csrfFetch } from './csrf';

const CREATE_COMMENT = 'songs/CREATE_COMMENT';
const SET_COMMENT = 'songs/SET_COMMENT';
const EDIT_COMMENT = 'songs/EDIT_COMMENT';
const REMOVE_COMMENT = 'songs/REMOVE_COMMENT';
const SET_COMMENTS = 'songs/SET_COMMENTS';

const createCommentAction = (comment) => {
  return {
    type: CREATE_COMMENT,
    payload: comment,
  }
};

const editSongAction = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  }
};

const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    payload: comment,
  }
};

const removeCommentAction = (id) => {
  return {
    type: REMOVE_COMMENT,
    payload: id,
  }
};

const setComments = comments => ({
  type: SET_COMMENTS,
  payload: comments,
});

export const createComment = (newComment) => async dispatch => {
  const response = await csrfFetch(
    '/api/songs/' + newComment.id + '/comments',
    {
      method: 'POST',
      body: JSON.stringify({ newComment }),
    }
  );
  const data = await response.json();
  dispatch(createCommentAction(data.comment));
  dispatch(getComments(data.songId));

};

export const fetchComment = (id) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${id}/comments`);
  if (response.ok) {
    const comment = await response.json();
    dispatch(setComment(comment));
  }
};

export const editComment = (id, comment) => async dispatch => {
  const token = await csrfFetch('/api/songs/' + id + '/comment');
  const response = await fetch(
    '/api/songs/' + id + '/comment',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
      body: JSON.stringify({ comment }),
    }
  );
  const data = await response.json();
  if (data.success) {
    dispatch(editSongAction(data.comment));
  }
};

// delete the selected comment from the state

export const deleteComment = (id) => async dispatch => {
  const response = await csrfFetch(`/api/songs/${id}/comment`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(removeCommentAction(id));
  }
};

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
    case CREATE_COMMENT:
      // add the new comment to the state and return the new state
      newState = { ...state };
      newState[action.payload] = action.payload;
      return newState;
    case SET_COMMENT:
      newState = action.payload;
      break;
    case EDIT_COMMENT:
      newState = action.payload;
      break;
    case REMOVE_COMMENT:
      newState.comment = state.comment.filter(comment => comment.id !== action.payload);
      break;
    case SET_COMMENTS:
      newState = { ...state }
      newState.comments = action.payload;
      return newState;
    default:
      return state;
  }
}

export default commentsReducer;
