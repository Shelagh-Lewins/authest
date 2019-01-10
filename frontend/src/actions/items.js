import fetchAPI from '../modules/fetchAPI';
import { getErrors } from '../reducers/errorReducer';

// define action types up front so you can see them
export const CREATE_ITEM_REQUESTED = 'CREATE_ITEM_REQUESTED';
export const CREATE_ITEM_SUCCEEDED = 'CREATE_ITEM_SUCCEEDED';
export const DELETE_ITEM_SUCCEEDED = 'DELETE_ITEM_SUCCEEDED';

// actions for items
export const createItem = item => dispatch => {
	dispatch(createItemRequested());

	/* let headers = { 'Content-Type': 'application/json' };
	let body = JSON.stringify(item);
	return fetch('/api/items/', { headers, 'method': 'POST', body })
		.then(res => res.json())
		.then((item) => dispatch(createItemSucceeded(item))); */

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
	/* return (dispatch, getState) => {
		let headers = { 'Content-Type': 'application/json' };

		return fetch(`/api/items/${itemId}/`, { headers, 'method': 'DELETE' })
			.then(res => {
				dispatch(deleteItemSucceeded({ itemId, listId }));
			});
	}; */

	return fetchAPI({
		'url': `/api/v1/content/items/${itemId}/`,
		'method': 'DELETE',
		'headers': { 'Content-Type': 'application/json' },
	}).then(response => {
	    return dispatch(deleteItemSucceeded(itemId));
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

