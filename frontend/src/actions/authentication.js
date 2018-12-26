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
			console.log('token 1 ', token);
			localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      //const decoded = jwt_decode(token);
      return dispatch(setCurrentUser(token));
		})
		.catch(err => {
			console.log('error ', err.message);
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			});
		});
}

export const setCurrentUser = decoded => {
	console.log('data ', decoded);
  return {
      type: SET_CURRENT_USER,
      payload: decoded
  }
}
