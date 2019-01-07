// authentication.js

import store from '../store';
import fetchAPI from '../modules/fetchAPI';

// definte all action creators up front so you can see them
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER_COMPLETE = 'LOGOUT_USER_COMPLETE';
export const SET_USER_INFO = 'SET_USER_INFO';
export const FORGOT_PASSWORD_EMAIL_SENT = 'FORGOT_PASSWORD_EMAIL_SENT';
export const FORGOT_PASSWORD_EMAIL_NOT_SENT = 'FORGOT_PASSWORD_EMAIL_NOT_SENT';
export const RESET_PASSWORD_COMPLETE = 'RESET_PASSWORD_COMPLETE';
export const CHANGE_PASSWORD_COMPLETE = 'CHANGE_PASSWORD_COMPLETE';
export const CHANGE_PASSWORD_STARTED = 'CHANGE_PASSWORD_STARTED';

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
	  	history.push('/');
	    return response;
	}).catch(error => {
		dispatch({
			'type': GET_ERRORS,
			'payload': { 'registration': error.message },
		});
	});
};

// TODO rework auth as a saga with token refresh
// https://github.com/redux-saga/redux-saga/issues/14
export const loginUser = (user, history) => dispatch => {
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
		dispatch({
			'type': GET_ERRORS,
			'payload': { 'authentication': 'Unable to log in with the provided credentials, please try again.' },
		});
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
	return fetch('/api/v1/rest-auth/logout/', {
		'method': 'POST',
	})
		.then(res => {
			if(res.ok) {
				removeAuthToken();
				return res.json();
			} else {
				history.push('/');

				dispatch({
					'type': GET_ERRORS,
					'payload': { 'logout user': 'Unable to logout' }
				});
			}
		})
		.then(() => {
			return dispatch(logoutUserComplete());
		});
};
// TODO parameterise api path
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
	const token = store.getState().auth.user.token;

	if (!token) {
		return;
	}

	const headers = {
		'Authorization': `Token ${token}`,
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	};

	return fetch('/api/v1/rest-auth/user/', {
		headers,
		'method': 'GET',
	})
		.then(res => {
			if(res.ok) {
				return res.json();
			} else {
				dispatch({
					'type': GET_ERRORS,
					'payload': { 'get user info': 'Unable to get user info' }
				});
			}
		})
		.then(user => {
			if(!user) {
				return;
			}

			return dispatch(setUserInfo({
				'username': user.username,
				'email': user.email,
				'slug': user.slug,
			}));
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
	var formData  = new FormData();

	for(var name in email) {
		formData.append(name, email[name]);
	}

	return fetch('/api/v1/rest-auth/password/reset/', { 'method': 'POST', 'body': formData })
		.then(res => {
			return res.json();
		})
		.then(() => {
			return dispatch(forgotPasswordEmailSent());
		})
		.catch(err => {
			dispatch({
				'type': GET_ERRORS,
				'payload': err.response.data
			});
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
	var formData  = new FormData();

	// Push our data into our FormData object
	for(var name in data) {
		formData.append(name, data[name]);
	}

	dispatch({
		'type': CHANGE_PASSWORD_STARTED,
	});

	return fetchAPI({
		'url': '/api/v1/rest-auth/password/change/',
		'data': formData,
		'method': 'POST',
		'useAuth': true,
	}).then(response => {
	  dispatch({
			'type': CHANGE_PASSWORD_COMPLETE,
		});
	    return response;
	}).catch(error => {
		dispatch({
			'type': GET_ERRORS,
			'payload': { 'changePassword': error.message },
		});
	});
};

export const changePasswordStarted = (token) => {
	return {
		'type': CHANGE_PASSWORD_STARTED,
	};
};

export const changePasswordComplete = (token) => {
	return {
		'type': CHANGE_PASSWORD_COMPLETE,
	};
};


