//유저 정보 add
const ADD_POST = 'posts/ADD_POST';
const UPDATE_POST = 'posts/UPDATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const INIT = 'posts/INIT';

//state초기값
const initialState = [];

// 액션객체
// payload : post 객체 한개
export const addPost = (payload) => {
  return {
    type: ADD_POST,
    payload
  };
};

// payload : post 객체의 뭘 바꿀지!?
// updateDoc();
export const updatePost = (payload) => {
  return {
    type: UPDATE_POST,
    payload
  };
};

// payload : 지울 ID 한개
export const deletePost = (payload) => {
  return {
    type: DELETE_POST,
    payload
  };
};

// payload : post 객체 한개
export const init = (payload) => {
  return {
    type: INIT,
    payload
  };
};

//리듀서
const posts = (state = initialState, action) => {
  switch (action.type) {
    //user 스테이트에 세팅 로직
    //user 추가 로직
    case ADD_POST:
      return [...state, action.payload]; // (1)
    case UPDATE_POST: {
      const id = action.payload.id;
      const updatedData = action.payload.updatedData;
      // 원래 있던 데이터 중, 찾아 변경
      return state.map((post) => {
        if (post.id === id) {
          // 변경 대상
          return { ...post, ...updatedData };
        } else {
          // 변경 안함
          return post;
        }
      }); // (2)
    }
    case DELETE_POST:
      return state.filter(function (item) {
        return item.id !== action.payload;
      }); // (3)
    case INIT:
      return action.payload; // (4)
    default:
      return state;
  }
};

export default posts;
