import { csrfFetch } from './csrf';

const SET_USERS = 'songs/SET_USERS'

const setUsersAction = (users) => {
  return {
    type: SET_USERS,
    payload: users,
  };
};

export const fetchUsers = () => async (dispatch) => {
  const response = await csrfFetch('/api/users');
  const users = await response.json();
  dispatch(setUsersAction(users));
  return response;
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
