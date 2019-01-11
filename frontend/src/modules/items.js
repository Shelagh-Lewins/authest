import { RECEIVE_ENTITIES } from '../modules/lists';
import fetchAPI from '../modules/fetchAPI';
import { getErrors } from '../modules/errors';

//////////////////////////////////
// Action creators

// define action types so they are visible
// and export them so other reducers can use them
export const CREATE_ITEM_REQUESTED = 'CREATE_ITEM_REQUESTED';
export const CREATE_ITEM_SUCCEEDED = 'CREATE_ITEM_SUCCEEDED';
export const DELETE_ITEM_SUCCEEDED = 'DELETE_ITEM_SUCCEEDED';

export const createItem = item => dispatch => {
	dispatch(createItemRequested());

	return fetchAPI({
		'url': '/api/v1/content/items/',
		'data': JSON.stringify(item),
		'method': 'POST',
		'useAuth': true,
		'headers': { 'Content-Type': 'application/json' },
	}).then(response => {
	    return dispatch(createItemSucceeded(response));
	}).catch(error => {
		return dispatch(getErrors({ 'create item': error.message }));
	});
};

export function createItemRequested() {
	return {
		'type': 'CREATE_ITEM_REQUESTED',
	};
}

export function createItemSucceeded(item) {
	return {
		'type': 'CREATE_ITEM_SUCCEEDED',
		'payload': {
			item
		}
	};
}

export const deleteItem = ({ itemId, listId }) => dispatch => {
	return fetchAPI({
		'url': `/api/v1/content/items/${itemId}/`,
		'method': 'DELETE',
	}).then(response => {
	    return dispatch(deleteItemSucceeded({ itemId, listId }));
	}).catch(error => {
		return dispatch(getErrors({ 'delete item': error.message }));
	});
};

export function deleteItemSucceeded({ itemId, listId }) {
	return {
		'type': 'DELETE_ITEM_SUCCEEDED',
		'payload': {
			itemId,
			listId
		}
	};
}

//////////////////////////////////
// Reducer
var updeep = require('updeep');

const initialItemsState = {
	'things': {},
	'isLoading': false,
	'error': null,
};

export default function items(state = initialItemsState, action) {
	switch (action.type) {
		case RECEIVE_ENTITIES: {
			const { entities } = action.payload;
			if (entities && entities.items) {
				return updeep({ 'things': entities.items, 'isLoading': false }, state);
			}

			return state;
		}

		case CREATE_ITEM_SUCCEEDED: {
			const item = action.payload.item;
			return updeep({ 'things': { [item.id]: item } }, state);
		}

		case DELETE_ITEM_SUCCEEDED: {
			return updeep({ 'things': updeep.omit([action.payload.id]) }, state);
		}

		default:
			return state;
	}
}

export const getItemsByListId = state => {
	const { currentListId } = state.page;

	if (!currentListId || !state.lists.things[currentListId]) {
		return [];
	}

	// get the array of item ids for this list
	const itemIds = state.lists.things[currentListId].items;

	// get the actual items and sort by order
	let items = itemIds.map(id => state.items.things[id]).sort(function(a, b){return a.order - b.order;});

	return items;
};
