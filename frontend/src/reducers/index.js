// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import pageReducer from './pageReducer';
import listReducer from './listsReducer';
import itemsReducer from './itemsReducer';
// by importing the actual reducer as the default, the state of each is initialised

export default combineReducers({
	'errors': errorReducer,
	'auth': authReducer,
	'page': pageReducer,
	'lists': listReducer,
	'items': itemsReducer,
});
