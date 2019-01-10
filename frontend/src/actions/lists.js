import fetchAPI from '../modules/fetchAPI';
import { getErrors } from '../reducers/errorReducer';
import { normalize, schema } from 'normalizr';
// TODO add errors, fetchAPI

// define action types up front so you can see them
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

		return fetchAPI({
			'url': '/api/v1/content/lists/',
			'method': 'GET',
		}).then(response => {
	    const normalizedData = normalize(response, [listSchema]);

			if (!getState().page.currentListId) {
				const defaultListId = response[0].id;
				dispatch(setCurrentListId(defaultListId));
			}

			return dispatch(receiveEntities(normalizedData));
		}).catch(error => {
			dispatch(fetchListsFailed());
			console.log('error message ', error.message);
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

export const deleteList = id => dispatch => {
	return fetchAPI({
		'url': `/api/v1/content/lists/${id}/`,
		'method': 'DELETE',
	}).then(response => {
	    return dispatch(deleteListSucceeded(id));
	}).catch(error => {
		return dispatch(getErrors({ 'delete list': error.message }));
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

export const setListIsPublic = ({ id, is_public }) => dispatch => {
	return fetchAPI({
		'url': `/api/v1/content/lists/${id}/`,
		'headers': { 'Content-Type': 'application/json' },
		'data': JSON.stringify({ is_public }),
		'method': 'PATCH',
	}).then(response => {
	    return dispatch(setListIsPublicSucceeded(response));
	}).catch(error => {
		return dispatch(getErrors({ 'set list is public': error.message }));
	});
};

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
