import { createStore, combineReducers } from 'redux';
import users from '../modules/users';

const rootReducer = combineReducers({ users });
const store = createStore(rootReducer);

export default store;
