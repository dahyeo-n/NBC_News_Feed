const LOGIN_USER = 'users/LOGIN_USER';
const LOGOUT_USER = 'users/LOGOUT_USER';
const UPDATE_USER = 'users/UPDATE_USER';

const initialState = {};

export const loginUser = (payload) => {
  return { type: LOGIN_USER, payload };
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};
export const updateuser = () => {
  return { type: UPDATE_USER };
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return {};
    case UPDATE_USER:
      return {};
    default:
      return state;
  }
};

export default user;
