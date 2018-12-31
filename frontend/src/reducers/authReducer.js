// authReducer.js

import {
	SET_CURRENT_USER,
	FORGOT_PASSWORD_EMAIL_NOT_SENT,
	FORGOT_PASSWORD_EMAIL_SENT,
	RESET_PASSWORD_COMPLETE
} from '../actions/types';
import isEmpty from '../is-empty';

const initialState = {
	isAuthenticated: false,
	forgotPasswordEmailSent: false,
	resetPasswordComplete: false,
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

		case RESET_PASSWORD_COMPLETE:
			return {
				...state,
				resetPasswordComplete: true
			}

		default: 
			return state;
	}
}
