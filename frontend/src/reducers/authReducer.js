// authReducer.js

import {
	SET_CURRENT_USER,
	SET_USER_INFO,
	LOGOUT_USER_COMPLETE,
	FORGOT_PASSWORD_EMAIL_NOT_SENT,
	FORGOT_PASSWORD_EMAIL_SENT,
	RESET_PASSWORD_COMPLETE
} from '../actions/types';
import isEmpty from '../is-empty';

var updeep = require('updeep');

const initialState = {
	'isAuthenticated': false,
	'forgotPasswordEmailSent': false,
	'resetPasswordComplete': false,
	'user': {}
};

// TODO use updeep
export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return updeep({
				'isAuthenticated': !isEmpty(action.payload.token),
				'user': updeep.constant({ 'token': action.payload.token }) // remove all other values, this is a new user
			}, state);

		case SET_USER_INFO: // merge with existing user to preserve token, isAuthenticted
			return updeep({
				'user': {
					'username': action.payload.username,
					'email': action.payload.email,
				}
			}, state);

		case LOGOUT_USER_COMPLETE: {
			return updeep({
				'isAuthenticated': false,
				'user': updeep.constant({}) // remove all other values
			}, state);
		}

		case FORGOT_PASSWORD_EMAIL_NOT_SENT: {
			return updeep({
				'forgotPasswordEmailSent': false,
				'resetPasswordComplete': false,
			}, state);
		}
		/* return {
				...state,
				'forgotPasswordEmailSent': false
			}; */

		case FORGOT_PASSWORD_EMAIL_SENT :{
			return updeep({
				'forgotPasswordEmailSent': true,
				'resetPasswordComplete': false,
			}, state);
		}
		/* return {
				...state,
				'forgotPasswordEmailSent': true
			}; */

		case RESET_PASSWORD_COMPLETE: {
			return updeep({
				'forgotPasswordEmailSent': false,
				'resetPasswordComplete': true,
			}, state);
		}
		/* return {
				...state,
				'resetPasswordComplete': true
			}; */

		default: 
			return state;
	}
}
