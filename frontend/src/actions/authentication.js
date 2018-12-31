// authentication.js
import setAuthToken from '../setAuthToken';
// import jwt_decode from 'jwt-decode';
import {
	GET_ERRORS,
	SET_CURRENT_USER,
	FORGOT_PASSWORD_EMAIL_NOT_SENT,
	FORGOT_PASSWORD_EMAIL_SENT,
	RESET_PASSWORD_COMPLETE
} from './types';
import $ from 'jquery';

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

	fetch('/api/v1/rest-auth/registration/', { 'method': 'POST', 'body': formData })
		.then(res => history.push('/registration'))
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}

export const loginUser = (user) => dispatch => {
	var formData  = new FormData();

	// Push our data into our FormData object
  for(var name in user) {
		formData.append(name, user[name]);
  }

	return fetch('/api/v1/rest-auth/login/', { 'method': 'POST', 'body': formData })
		.then(res => {
			console.log('res ', res);
			if(res.ok) {
				return res.json();
			} else {
				dispatch({
					type: GET_ERRORS,
					payload: { 'authentication': 'Unable to log in with the provided credentials, please try again.' }
				});
			}
		})
		.then(token => {
			console.log('token ', token);

			if(!token) {
				return;
			}
			// token is an object { key: value }
			// localStorage can only store a string so we'll use just the value everywhere for consistency
			localStorage.setItem('jwtToken', token.key);
      setAuthToken(token.key);
      dispatch(getUserInfo());
      return dispatch(setCurrentUser({
      	'key': token.key,
      }));
		})
}

export const setCurrentUser = token => {
  return {
      type: SET_CURRENT_USER,
      payload: token
  }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
// TODO parameterise api path
///////////////////////////////
// get user info
// TODO add auth credentials
export const getUserInfo = () => dispatch => {
	return fetch('/api/v1/rest-auth/user/', { 'method': 'POST' })
	.then(res => {
		console.log('user: ', res);
	})
}

///////////////////////////////
// reset password
export const forgotPasswordEmailNotSent = token => {
  return {
      type: FORGOT_PASSWORD_EMAIL_NOT_SENT
  }
}

export const forgotPasswordEmailSent = () => {
  return {
      type: FORGOT_PASSWORD_EMAIL_SENT
  }
}

export const forgotPassword = (email) => dispatch => {
	console.log('forgotPassword action creator. Email ', email);

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
			console.log('error ', err.message);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}

export const resetPasswordComplete = (token) => {
  return {
      type: RESET_PASSWORD_COMPLETE,
      token: token,
  }
}

// This function does not yet work. There is something wrong with the fetch request, perhaps the csrf tokens which I don't know how to generate correctly. The code here and in the ResetPassword component should be fixed or removed at some point.
// For now, a Django template is used for entering the new password at http://localhost:8000/api/v1/reset/Mw/52l-11fe5a58b91d894386e8/

// https://www.techiediaries.com/django-react-forms-csrf-axios/
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const resetPassword = (data) => dispatch => {
	console.log('resetPassword action creator. data ', data);

	var body = '';
	var csrftoken = getCookie('csrftoken');

		body += `csrfmiddlewaretoken=${csrftoken}&`;
		body += `new_password1=${data.password}&`;
		body += `new_password2=${data.password_confirm}`;

  console.log('token ', data.csrfmiddlewaretoken);
  console.log('body ', body);
  console.log('data.uid ', data.uid);

  return fetch(`/api/v1/reset1/${data.uid}/set-password/`,
  	{ credentials: 'include', 'method': 'POST', mode: 'same-origin',
    headers: {
    	'Accept': 'text/html,application/xhtml+xml,application/xml',
    	'Content-Type': 'application/x-www-form-urlencoded',
      'X-CSRFToken': csrftoken
    }, 'body': body })
		.then(res => {
			return res.json();
		})
		.then(token => {
      return dispatch(resetPasswordComplete(token));
		})
		.catch(err => {
			console.log('error ', err.message);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}
