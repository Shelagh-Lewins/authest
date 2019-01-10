import React from 'react';
import Item from './Item';
import { Container, Row } from 'reactstrap';

const ItemsList = props => {
	return (
		<Container className="items-list">
			<Row>
				<h3 className="items-list-title">
					<strong>Items for list: </strong>
				</h3>
			</Row>
			<Row>
				{props.items.map(item => (
					<Item
						key={item.id}
						item={item}
						onDeleteItem={props.onDeleteItem}
						list={props.list}
					/>
				))}
			</Row>
		</Container>
	);
};

export default ItemsList;
