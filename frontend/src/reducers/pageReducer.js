var updeep = require('updeep');

const initialPageState = {
	'currentListId': null,
	'searchTerm': '',
};

export default function page(state = initialPageState, action) {
	switch (action.type) {
		case 'SET_CURRENT_LIST_ID': {
			return updeep({ 'currentListId': action.payload.id }, state);
		}

		case 'FILTER_LISTS': {
			return updeep({ 'searchTerm': action.payload.searchTerm }, state);
		}

		default: {
			return state;
		}
	}
}
