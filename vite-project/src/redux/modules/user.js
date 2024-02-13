//유저 정보 add
const LOGIN_USER = 'users/LOGIN_USER';
const LOGOUT_USER = 'users/LOGOUT_USER';

//state초기값
const initialState = {};

//액션객체
//payload => 로그인 객체(email, nickName)
export const loginUser = (payload) => {
  return { type: LOGIN_USER, payload };
};

//payload
export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

//리듀서
const user = (state = initialState, action) => {
  switch (action.type) {
    //user 스테이트에 세팅 로직
    //user 추가 로직
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
};

export default user;
