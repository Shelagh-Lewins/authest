// errorReducer.js

import { GET_ERRORS } from '../actions/types';

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

		default: 
			return state;
	}
}
