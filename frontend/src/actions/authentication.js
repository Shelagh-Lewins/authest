// authentication.js
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

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
			return res.json();
		})
		.then(token => {
			console.log('token 1 ', token.key);
			// token is an object { key: value }
			// localStorage can only store a string so we'll use just the value everywhere for consistency
			localStorage.setItem('jwtToken', token.key);
      setAuthToken(token.key);
      //const decoded = jwt_decode(token);
      return dispatch(setCurrentUser(token.key));
		})
		.catch(err => {
			console.log('error ', err.message);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}

export const setCurrentUser = token => {
	console.log('data ', token);
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
