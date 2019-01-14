import { createSelector } from 'reselect';
import { LIST_IS_PUBLIC_VALUES } from '../constants';
import fetchAPI from '../modules/fetchAPI';
import { getErrors } from '../modules/errors';
import { normalize, schema } from 'normalizr';

import {
	LOGOUT_USER_COMPLETE
} from './auth';

import {
	CREATE_ITEM_SUCCEEDED,
	DELETE_ITEM_SUCCEEDED
} from './items';

// define action types so they are visible
// and export them so other reducers can use them
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES';
export const FETCH_LISTS_STARTED = 'FETCH_LISTS_STARTED';
export const FETCH_LISTS_FAILED = 'FETCH_LISTS_FAILED';
export const FILTER_LISTS = 'FILTER_LISTS';
export const CREATE_LIST_SUCCEEDED = 'CREATE_LIST_SUCCEEDED';
export const DELETE_LIST_SUCCEEDED = 'DELETE_LIST_SUCCEEDED';
export const SET_LIST_IS_PUBLIC_SUCCEEDED = 'SET_LIST_IS_PUBLIC_SUCCEEDED';
export const SET_CURRENT_LIST_ID = 'SET_CURRENT_LIST_ID';

const itemSchema = new schema.Entity('items');
const listSchema = new schema.Entity('lists', {
	'items': [itemSchema],
});

function receiveEntities(entities) {
	return {
		'type': RECEIVE_ENTITIES,
		'payload': entities,
	};
}

export function fetchListsStarted(is_public) {
	return {
		'type': FETCH_LISTS_STARTED,
	};
}

function fetchListsFailed() {
	return {
		'type': FETCH_LISTS_FAILED
	};
}

export function fetchLists() {
	return (dispatch, getState) => {
		dispatch(fetchListsStarted());

		// if the user is not logged in, don't use auth. The server should return lists whatever lists a non-authenticated user should see.
		let useAuth = false;

		if (getState().auth.user.token) {
			useAuth = true;
		}

		return fetchAPI({
			'url': '/api/v1/content/lists/',
			'method': 'GET',
			'useAuth': useAuth,
		}).then(response => {
			const normalizedData = normalize(response, [listSchema]);
			let defaultListId = null;

			if (normalizedData.result.length > 0) { // there is at least one list
				defaultListId = response[0].id;
			}

			if (!getState().page.currentListId) { // preserve existing selection
				// TODO check that this list still exists
				dispatch(setCurrentListId(defaultListId));
			}
			
			return dispatch(receiveEntities(normalizedData));
		}).catch(error => {
			dispatch(fetchListsFailed());

			return dispatch(getErrors({ 'fetch lists': error.message }));
		});
	};
}

export function filterLists(searchTerm) {
	return { 
		'type': FILTER_LISTS,
		'payload': { searchTerm },
	};
}

export const createList = list => dispatch => {
	return fetchAPI({
		'url': '/api/v1/content/lists/',
		'data': JSON.stringify(list),
		'method': 'POST',
		'useAuth': true,
		'headers': { 'Content-Type': 'application/json' },
	}).then(response => {
		dispatch(setCurrentListId(response.id));
		return dispatch(createListSucceeded(response));
	}).catch(error => {
		return dispatch(getErrors({ 'create list': error.message }));
	});
};

export function createListSucceeded(list) {
	return {
		'type': CREATE_LIST_SUCCEEDED,
		'payload': {
			list
		}
	};
}

export const deleteList = id => (dispatch, getState) => {
	return fetchAPI({
		'url': `/api/v1/content/lists/${id}/`,
		'method': 'DELETE',
	}).then(response => {
		// deleted the selected list
		if (id === getState().page.currentListId) {
			dispatch(setCurrentListId(null));
		}

		return dispatch(deleteListSucceeded(id));
	}).catch(error => {
		return dispatch(getErrors({ 'delete list': error.message }));
	});
};

export const setListIsPublic = ({ id, is_public }) => dispatch => {
	return fetchAPI({
		'url': `/api/v1/content/lists/${id}/`,
		'headers': { 'Content-Type': 'application/json' },
		'data': JSON.stringify({ is_public }),
		'method': 'PATCH',
		'useAuth': true,
	}).then(response => {
		return dispatch(setListIsPublicSucceeded(response));
	}).catch(error => {
		return dispatch(getErrors({ 'set list is public': error.message }));
	});
};

export function deleteListSucceeded(id) {
	return {
		'type': DELETE_LIST_SUCCEEDED,
		'payload': {
			id
		}
	};
}

export function setListIsPublicSucceeded({ id, is_public }) {
	return {
		'type': SET_LIST_IS_PUBLIC_SUCCEEDED,
		'payload': {
			'id': id,
			is_public
		}
	};
}

export function setCurrentListId(id) {
	return {
		'type': SET_CURRENT_LIST_ID,
		'payload': {
			id,
		}
	};
}


//////////////////////////////////
// Reducer
var updeep = require('updeep');

// this is initial state of lists and the list loading states
const initialListsState = {
	'isLoading': false,
	'error': null,
	'things': {},
};

// 'state' here is global state
export const getSearchTerm = state => {
	return state.page.searchTerm;
};

export const getLists = state => {
	return Object.keys(state.lists.things).map(id => {
		return state.lists.things[id];
	});
};

export const getFilteredLists = createSelector(
	[getLists, getSearchTerm],
	(lists, searchTerm) => {
		return lists.filter(list => {
			// if no search term, return every list
			if (searchTerm === '') {
				return list;
			}
			return list.title.match(new RegExp(searchTerm, 'i'));
		});
	}
);

export const getGroupedAndFilteredLists = createSelector(
	[getFilteredLists],
	lists => {
		const grouped = {};

		LIST_IS_PUBLIC_VALUES.forEach(is_public => {
			grouped[is_public] = lists.filter(list => list.is_public === is_public);
		});

		return grouped;
	}
);

// state here is the substate state.lists
// the book uses 'items' for the list of things i.e. lists. items
// as 'items' for us is a specific thing, we need another name for the set of entities to be displayed i.e. the lists themselves
// so those are globalState.lists.things
// i.e. state.things here
export default function lists(state = initialListsState, action) {
	switch (action.type) {
		case LOGOUT_USER_COMPLETE: {
			return updeep(initialListsState, {});
		}

		case RECEIVE_ENTITIES: {
			const { entities } = action.payload;
			let lists = {};

			if (entities && entities.lists) {
				lists = entities.lists; // there is at least one list
			}

			return updeep({ 'things': lists, 'isLoading': false }, state);
		}

		case FETCH_LISTS_STARTED: {
			return updeep({ 'isLoading': true }, state);
		}

		case FETCH_LISTS_FAILED: {
			return updeep({ 'isLoading': false }, state);
		}

		case CREATE_LIST_SUCCEEDED: {
			const list = action.payload.list;
			return updeep({ 'things': { [list.id]: list } }, state);
		}

		case DELETE_LIST_SUCCEEDED: {
			console.log('succeeded. id ', action.payload.id);
			return updeep({ 'things': updeep.omit([action.payload.id]) }, state);
		}

		case SET_LIST_IS_PUBLIC_SUCCEEDED: {
			const listId = action.payload.id;

			return updeep({ 'things': { [listId]: { 'is_public': action.payload.is_public } } }, state);
			// reminder of another way to update nested arrays
			/* const index = state.things.findIndex((list) => list.id === action.payload.id);

			if (index !== -1) {
				return updeep.updateIn(`things.${index}.is_public`, action.payload.is_public, state);
			} 

			return state; // in case list was not found
			*/
		}

		case CREATE_ITEM_SUCCEEDED: {
			const item = action.payload.item;

			function addItem(items) {
				return [].concat(items, item.id);
			}

			return updeep.updateIn(`things.${item.list}.items`, addItem, state);
		}

		case DELETE_ITEM_SUCCEEDED: {
			function deleteItem(items) {
				const itemIndex = items.findIndex((item) => item === action.payload.itemId); 
				let newItems = [].concat(items);
				newItems.splice(itemIndex, 1);
				return newItems;
			}

			return updeep.updateIn(`things.${action.payload.listId}.items`, deleteItem, state);
		}

		default:
			return state;
	}
}

