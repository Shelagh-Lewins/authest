// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import * as pageReducer from './pageReducer';
import * as listsReducer from './listsReducer';
import * as itemsReducer from './itemsReducer';

export default combineReducers({
	'errors': errorReducer,
	'auth': authReducer,
	'page': pageReducer,
	'lists': listsReducer,
	'items': itemsReducer,
});
