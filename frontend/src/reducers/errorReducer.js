// errorReducer.js

const GET_ERRORS = 'GET_ERRORS';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const getErrors = error => {
	// error is an object, e.g. { 'registration': error.message }
	return {
		'type': GET_ERRORS,
		'payload': error,
	};
};

export const clearErrors = () => {
	return {
		'type': CLEAR_ERRORS,
	};
};

var updeep = require('updeep');

const initialState = {};

export default function(state = initialState, action ) {
	switch(action.type) {
		case GET_ERRORS: {
			// ensure we have an array of strings to allow multiple errors to be displayed
			let errors = {};

			Object.keys(action.payload).forEach((key) => {
				if (typeof action.payload[key] === 'string') {
					// a string is simply copied
					errors[key] = [action.payload[key]];
				} else {
					errors[key] = [...action.payload[key]];
				}
			});

			return updeep(errors, {}); // clear any existing errors
		}

		case CLEAR_ERRORS: {
			console.log('clearErrors reducer');
			return {};
		}

		default: 
			return state;
	}
}
