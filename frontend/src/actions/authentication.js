// authentication.js

// import axios from 'axios';
import { GET_ERRORS } from './types';

export const registerUser = (user, history) => dispatch => {
    // axios.post('/api/users/register', user)
    console.log('user ', user);
    console.log('tyepof user ', typeof user);

    var FD  = new FormData();

  // Push our data into our FormData object
  /* Object.keys(user).forEach((key) => {
    FD.append(key, user[key]);
  }
) */

  for(var name in user) {
    FD.append(name, user[name]);
  }

  for (var pair of FD.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
}

    // let body = JSON.stringify(user);
    let headers = { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' };

        fetch('/api/v1/rest-auth/registration/', { 'method': 'POST', 'body': FD })
        // fetch('/api/v1/rest-auth/registration/', { headers, 'method': 'POST', body })
            .then(res => history.push('/registration'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

export const loginUser = (user) => dispatch => {
    // axios.post('/api/users/login', user)
    let headers = { 'Content-Type': 'application/json' };

        fetch('/api/v1/rest-auth/login/', { headers, 'method': 'POST' })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}