//유저 정보 add
const ADD_USER = 'users/ADD_USERS';
const USER_DATA = 'users/USER_DATA';

//state초기값
const initialState = [
  {
    user: [],
  },
];
//액션객체
export const userData = (payload) => {
  return { type: USER_DATA, payload };
};
export const addUser = (payload) => {
  return { type: ADD_USER, payload };
};

//리듀서
const users = (state = initialState, action) => {
  switch (action.type) {
    //user 스테이트에 세팅 로직
    //user 추가 로직
    default:
      return state;
  }
};

export default users;
