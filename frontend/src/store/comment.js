import { csrfFetch } from './csrf';
import { getComments } from './comments';

const CREATE_COMMENT = 'songs/CREATE_COMMENT';
const SET_COMMENT = 'songs/SET_COMMENT';
const EDIT_COMMENT = 'songs/EDIT_COMMENT';
const REMOVE_COMMENT = 'songs/REMOVE_COMMENT';

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

export const deleteComment = (id) => async dispatch => {
  const token = await csrfFetch('/api/songs/' + id + '/comment');
  const response = await fetch(
    '/api/songs/' + id + '/comment',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': token,
      },
    }
  );
  const data = await response.json();
  if (data.success) {
    dispatch(removeCommentAction(id));
  }
};


const initialState = {};

const commentReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case CREATE_COMMENT:
      newState.comment.push(action.payload);
      break;
    case SET_COMMENT:
      newState = action.payload;
      break;
    case EDIT_COMMENT:
      newState = action.payload;
      break;
    case REMOVE_COMMENT:
      newState.comment = state.comment.filter(comment => comment.id !== action.payload);
      break;
    default:
      newState = state;
  }
  return newState;
};

export default commentReducer;
