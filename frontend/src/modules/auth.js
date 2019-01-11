// authReducer.js

import store from '../store';
import fetchAPI from '../modules/fetchAPI';
import { getErrors, clearErrors } from '../modules/errors';
import isEmpty from '../modules/isEmpty';

//////////////////////////////////
// Action creators

// define action types so they are visible
// and export them so other reducers can use them
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER_COMPLETE = 'LOGOUT_USER_COMPLETE';
export const FORGOT_PASSWORD_EMAIL_SENT = 'FORGOT_PASSWORD_EMAIL_SENT';
export const RESET_PASSWORD_COMPLETE = 'RESET_PASSWORD_COMPLETE';
export const PASSWORD_NOT_CHANGED = 'PASSWORD_NOT_CHANGED';
export const CHANGE_PASSWORD_COMPLETE = 'CHANGE_PASSWORD_COMPLETE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const FORGOT_PASSWORD_EMAIL_NOT_SENT = 'FORGOT_PASSWORD_EMAIL_NOT_SENT';

// Side effects Services
export const getAuthToken = () => {
	return localStorage.getItem('jwtToken');
};

function setAuthToken(token) {
	localStorage.setItem('jwtToken', token);
}

function removeAuthToken() {
	localStorage.removeItem('jwtToken');
}

export const registerUser = (user, history) => dispatch => {
	dispatch(clearErrors());

	var formData  = new FormData();

	// Push our data into our FormData object
	for(var name in user) {
		formData.append(name, user[name]);
	}

	/*
	for (var pair of formData.entries()) {
		console.log(pair[0]+ ', ' + pair[1]); 
	} */

	return fetchAPI({
		'url': '/api/v1/rest-auth/registration/',
		'data': formData,
		'method': 'POST',
	}).then(response => {
	  	history.push('/welcome');
	    return response;
	}).catch(error => {
		return dispatch(getErrors({ 'registration': error.message }));
	});
};

// TODO rework auth as a saga with token refresh
// https://github.com/redux-saga/redux-saga/issues/14
// https://github.com/alvelig/redux-saga-auth
export const loginUser = (user, history) => dispatch => {
	dispatch(clearErrors());

	var formData  = new FormData();

	// Push our data into our FormData object
	for(var name in user) {
		formData.append(name, user[name]);
	}

	return fetchAPI({
		'url': '/api/v1/rest-auth/login/',
		'data': formData,
		'method': 'POST',
		'useAuth': false,
	}).then(response => {
	  	history.push('/');
	    return dispatch(setCurrentUser(response.key));
	}).then(() => {
		// after store has been updated with token, we can query the server for current user info
		return store.dispatch(getUserInfo());
	}).catch(error => {
		return dispatch(getErrors({ 'authentication': 'Unable to log in with the provided credentials, please try again.' }));
	});
};

export const setCurrentUser = (token, dispatch) => {
	setAuthToken(token);
	return {
		'type': SET_CURRENT_USER,
		'payload': { token },
	};
};

export const logoutUserComplete = token => {
	return {
		'type': LOGOUT_USER_COMPLETE,
	};
};

export const logoutUser = (history) => dispatch => {
	dispatch(clearErrors());

	return fetchAPI({
		'url': '/api/v1/rest-auth/logout/',
		'method': 'POST',
		'useAuth': false,
	}).then(response => {
	  	history.push('/');
	  	removeAuthToken();
	    return dispatch(logoutUserComplete());
	}).catch(error => {
		return dispatch(getErrors({ 'logout user': 'Unable to logout' }));
	});
};

///////////////////////////////
// get user info
// TODO rebuild as saga with login using state token
// http://v1k45.com/blog/modern-django-part-4-adding-authentication-to-react-spa-using-drf/
// should get token from state. Currently it is passed in by referring function because state is not updated synchronously.
export const setUserInfo = user => {
	return {
		'type': SET_USER_INFO,
		'payload': user,
	};
};

export const getUserInfo = () => (dispatch) => {
	return fetchAPI({
		'url': '/api/v1/rest-auth/user/',
		'method': 'GET',
		'useAuth': true,
	}).then(user => {
	  	return dispatch(setUserInfo({
			'username': user.username,
			'email': user.email,
			'slug': user.slug,
		}));
	}).catch(error => {
		return dispatch(getErrors({ 'get user info': 'Unable to get user info' }));
	});
};

///////////////////////////////
// reset password
export const forgotPasswordEmailNotSent = token => {
	return {
		'type': FORGOT_PASSWORD_EMAIL_NOT_SENT
	};
};

export const forgotPasswordEmailSent = () => {
	return {
		'type': FORGOT_PASSWORD_EMAIL_SENT
	};
};

export const forgotPassword = (email) => dispatch => {
	dispatch(clearErrors());

	var formData  = new FormData();

	for(var name in email) {
		formData.append(name, email[name]);
	}

	return fetchAPI({
		'url': '/api/v1/rest-auth/password/reset/',
		'data': formData,
		'method': 'POST',
		'useAuth': false,
	}).then(response => {
		console.log('success');
	   return dispatch(forgotPasswordEmailSent());
	}).catch(error => {
		console.log('pearshaped');
		return dispatch(getErrors({ 'request password reset email': `Unable to send a password reset email. It is likely that the email address ${email} is not associated with a registered user` }));
		// return dispatch(getErrors(error.response.data));
	});
};

export const resetPasswordComplete = (token) => {
	return {
		'type': RESET_PASSWORD_COMPLETE,
		'token': token,
	};
};

//////////////////////////////////
// change password
export const changePassword = (data) => (dispatch) => {
	dispatch(clearErrors());
	dispatch(passwordNotChanged());

	var formData  = new FormData();

	// Push our data into our FormData object
	for(var name in data) {
		formData.append(name, data[name]);
	}

	return fetchAPI({
		'url': '/api/v1/rest-auth/password/change/',
		'data': formData,
		'method': 'POST',
		'useAuth': true,
	}).then(response => {
	  dispatch(changePasswordComplete());
	    return response;
	}).catch(error => {
		return dispatch(getErrors({ 'changePassword': error.message }));
	});
};

export const passwordNotChanged = token => {
	return {
		'type': PASSWORD_NOT_CHANGED,
	};
};

export const changePasswordComplete = (token) => {
	return {
		'type': CHANGE_PASSWORD_COMPLETE,
	};
};

//////////////////////////////////
// Reducer
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
