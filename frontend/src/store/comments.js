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

const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    payload: comment,
  }
};

const editCommentAction = (comment) => {
  return {
    type: EDIT_COMMENT,
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
    `/api/songs/${newComment.songId}/comments`,
    {
      method: 'POST',
      body: JSON.stringify({ newComment }),
    }
  );
  const data = await response.json();
  dispatch(createCommentAction(data.newComment));
  dispatch(getComments(data.songId));

};

// get a specific comment from the state by id and return it as a comment object at API route /api/songs/:id/comments/:id
export const fetchComment = (id, commentId) => async dispatch => {
  const response = await csrfFetch(
    `/api/songs/${id}/comments/${commentId}`
  );
  const data = await response.json();
  dispatch(setComment(data.comment));
};

// edit a comment by id and return the new state
export const editComment = (comment) => async dispatch => {
  const response = await csrfFetch(
    `/api/songs/${comment.songId}/comments/${comment.id}`,
    {
      method: 'PUT',
      include: 'user',
      body: JSON.stringify({ comment }),
    }
  );
  dispatch(editCommentAction(comment));
  return response;
};

// delete the comment by id and return the new state with the comment removed
export const deleteComment = (comment) => async dispatch => {
  const id = comment.songId;
  const response = await csrfFetch(
    `/api/songs/${comment.songId}/comments/${comment.id}`,
    {
      method: 'DELETE',
    }
  );
  const data = await response.json();
  dispatch(removeCommentAction(data.comment.id));
  dispatch(getComments(data.comment.songId));
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
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      break;
    case REMOVE_COMMENT:
      newState = { ...state };
      delete newState[action.payload];
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
