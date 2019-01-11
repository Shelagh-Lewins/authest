import {
	SET_CURRENT_LIST_ID,
	DELETE_LIST_SUCCEEDED,
	FILTER_LISTS,
} from './lists';

var updeep = require('updeep');

const initialState = {
	'currentListId': null,
	'searchTerm': '',
};

export default function page(state = initialState, action) {
	switch (action.type) {
		case SET_CURRENT_LIST_ID: {
			return updeep({ 'currentListId': action.payload.id }, state);
		}

		case DELETE_LIST_SUCCEEDED: {
			// was the deleted list the currently selected list?
			let idUpdate = {};
			if (action.payload.id === state.currentListId) {
				idUpdate = { 'currentListId': null }; // deselect it
			}
			return updeep({ 'things': updeep.omit([action.payload.id]), idUpdate }, state);
		}

		case FILTER_LISTS: {
			return updeep({ 'searchTerm': action.payload.searchTerm }, state);
		}

		default: {
			return state;
		}
	}
}
