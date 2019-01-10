// An individual item

import React from 'react';
import { Col } from 'reactstrap';

const Item = props => {
	return (
		<Col sm="3" md="4" className="item-container">
			<div className="item-header">
				<div>{`${props.item.order}: ${props.item.title}`}</div>
			</div>
			<div className="item-body">
				<div>{props.item.description}</div>
			</div>
			<button className="btn btn-danger" onClick={onDeleteItem}>Delete</button>
		</Col>
	);

	function onDeleteItem(e) {
		props.onDeleteItem({
			'itemId': props.item.id,
			'listId': props.list,
		});
	}
};

export default Item;
