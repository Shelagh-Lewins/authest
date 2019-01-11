// index.js

// import the partial reducers
import { combineReducers } from 'redux';
import errors from './errors';
import auth from './auth';
import page from './page';
import lists from './lists';
import items from './items';
// by importing the actual reducer as the default, the state of each is initialised

export default combineReducers({
	'errors': errors,
	'auth': auth,
	'page': page,
	'lists': lists,
	'items': items,
});
