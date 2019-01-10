// authReducer.js

import {
	SET_CURRENT_USER,
	SET_USER_INFO,
	LOGOUT_USER_COMPLETE,
	FORGOT_PASSWORD_EMAIL_NOT_SENT,
	FORGOT_PASSWORD_EMAIL_SENT,
	RESET_PASSWORD_COMPLETE,
	PASSWORD_NOT_CHANGED,
	CHANGE_PASSWORD_COMPLETE
} from '../actions/authentication';
import isEmpty from '../modules/isEmpty';

var updeep = require('updeep');

const initialState = {
	'isAuthenticated': false,
	'forgotPasswordEmailSent': false,
	'resetPasswordComplete': false,
	'changePasswordComplete': false,
	'user': {}
};

export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return updeep({
				'isAuthenticated': !isEmpty(action.payload.token),
				'user': updeep.constant({ 'token': action.payload.token }) // remove user info
			}, state);

		case SET_USER_INFO: // update user info
			return updeep({
				'user': {
					'username': action.payload.username,
					'email': action.payload.email,
					'slug': action.payload.slug,
				}
			}, state);

		case LOGOUT_USER_COMPLETE: {
			return updeep({
				'isAuthenticated': false,
				'user': updeep.constant({}) // remove user profile
			}, state);
		}

		case FORGOT_PASSWORD_EMAIL_NOT_SENT: {
			return updeep({
				'forgotPasswordEmailSent': false,
				'resetPasswordComplete': false,
			}, state);
		}

		case FORGOT_PASSWORD_EMAIL_SENT :{
			return updeep({
				'forgotPasswordEmailSent': true,
				'resetPasswordComplete': false,
			}, state);
		}

		case RESET_PASSWORD_COMPLETE: {
			return updeep({
				'forgotPasswordEmailSent': false,
				'resetPasswordComplete': true,
			}, state);
		}

		case PASSWORD_NOT_CHANGED: {
			return updeep({
				'changePasswordComplete': false,
				'errors': {}
			}, state);
		}

		case CHANGE_PASSWORD_COMPLETE: {
			return updeep({
				'changePasswordComplete': true,
			}, state);
		}

		default: 
			return state;
	}
}
