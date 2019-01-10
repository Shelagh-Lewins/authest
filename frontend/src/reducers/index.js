// index.js

// import the partial reducers
import { combineReducers } from 'redux';
import errors from './errorReducer';
import auth from './authReducer';
import page from './pageReducer';
import lists from './listsReducer';
import items from './itemsReducer';
// by importing the actual reducer as the default, the state of each is initialised

export default combineReducers({
	'errors': errors,
	'auth': auth,
	'page': page,
	'lists': lists,
	'items': items,
});
