// authReducer.js

import { SET_CURRENT_USER, FORGOT_PASSWORD_EMAIL_NOT_SENT, FORGOT_PASSWORD_EMAIL_SENT } from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
	isAuthenticated: false,
	forgotPasswordEmailSent: false,
	user: {}
}

export default function(state = initialState, action ) {
	switch(action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			}

		case FORGOT_PASSWORD_EMAIL_NOT_SENT:
			return {
				...state,
				forgotPasswordEmailSent: false
			}

		case FORGOT_PASSWORD_EMAIL_SENT:
			return {
				...state,
				forgotPasswordEmailSent: true
			}

		default: 
			return state;
	}
}
