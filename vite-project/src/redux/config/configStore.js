import { createStore, combineReducers } from 'redux';
import user from '../modules/user';
import posts from '../modules/posts';

const rootReducer = combineReducers({
  user: user,
  posts: posts
});
const store = createStore(rootReducer);

export default store;
