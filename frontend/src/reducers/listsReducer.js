import { createSelector } from 'reselect';
import { LIST_IS_PUBLIC_VALUES } from '../constants';

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
export function lists(state = initialListsState, action) {
	switch (action.type) {
		case 'RECEIVE_ENTITIES': {
			const { entities } = action.payload;
			if (entities && entities.lists) {
				return updeep({ 'things': entities.lists, 'isLoading': false }, state);
			}

			return state;
		}

		case 'FETCH_LISTS_STARTED': {
			return updeep({ 'isLoading': true }, state);
		}

		case 'FETCH_LISTS_FAILED': {
			return updeep({ 'isLoading': false, 'error': action.payload }, state);
		}

		case 'CREATE_LIST_SUCCEEDED': {
			const list = action.payload.list;
			return updeep({ 'things': { [list.id]: list } }, state);
		}

		case 'DELETE_LIST_SUCCEEDED': {
			return updeep({ 'things': updeep.omit([action.payload.id]) }, state);
		}

		case 'SET_LIST_IS_PUBLIC_SUCCEEDED': {
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

		case 'TIMER_INCREMENT': {
			const listId = action.payload.id;
			const update = { 'timer': state.things[listId].timer + 1 };

			return updeep({ 'things': { [listId]: update } }, state);
		}

		case 'CREATE_ITEM_SUCCEEDED': {
			const item = action.payload.item;

			function addItem(items) {
				return [].concat(items, item.id);
			}

			return updeep.updateIn(`things.${item.list}.items`, addItem, state);
		}

		case 'DELETE_ITEM_SUCCEEDED': {
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

