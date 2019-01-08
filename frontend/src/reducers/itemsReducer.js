var updeep = require('updeep');

const initialItemsState = {
	'things': {},
	'isLoading': false,
	'error': null,
};

export function items(state = initialItemsState, action) {
	switch (action.type) {
		case 'RECEIVE_ENTITIES': {
			const { entities } = action.payload;
			if (entities && entities.items) {
				return updeep({ 'things': entities.items, 'isLoading': false }, state);
			}

			return state;
		}

		case 'CREATE_ITEM_SUCCEEDED': {
			const item = action.payload.item;
			return updeep({ 'things': { [item.id]: item } }, state);
		}

		case 'DELETE_ITEM_SUCCEEDED': {
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
