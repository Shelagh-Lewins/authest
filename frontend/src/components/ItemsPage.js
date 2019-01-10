import React, { Component } from 'react';
import ItemsList from './ItemsList';
import { MAX_ITEMS_IN_LIST } from '../constants';
import '../stylesheets/items.scss';

class ItemsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			'showNewItemForm': false,
			'title': '',
			'description': '',
		};
	}

	onTitleChange = (e) => {
		this.setState({ 'title': e.target.value });
	}

	onDescriptionChange = (e) => {
		this.setState({ 'description': e.target.value });
	}

	resetForm() {
		this.setState({
			'showNewCardForm': false,
			'title': '',
			'description': ''
		});
	}

	onCreateItem = (e) => {
		e.preventDefault();

		// find the next available position in the list
		const orders = this.props.items.map((item) => parseInt(item.order));
		orders.sort(function(a, b){return a - b;});
		let order;

		for (let i=1; i<=MAX_ITEMS_IN_LIST; i++) {
			if (orders.indexOf(i) === -1) {
				order = i;
				break;
			}
		}

		if (!order) {
			return; // the list is full
		}

		this.props.onCreateItem({
			'title': this.state.title,
			'description': this.state.description,
			'list': this.props.currentListId,
			order, 
		});
		this.resetForm();
	}

	toggleForm = () => {
		this.setState({ 'showNewItemForm': !this.state.showNewItemForm });
	}

	renderItemsList() {
		return (
			<ItemsList
				items={this.props.items}
				onDeleteItem={this.props.onDeleteItem}
				list={this.props.currentListId}
			/>
		);
	}

	render() {
		return (
			<div className="items-list">
				<div className="items-list-header">
					<button
						className="button button-default"
						onClick={this.toggleForm}
					>
					+ New item</button>
				</div>

				{this.state.showNewItemForm && (
					<form className="items-list-form" onSubmit={this.onCreateItem}>
						<input
							className="full-width-input"
							onChange={this.onTitleChange}
							value={this.state.title}
							type="text"
							placeholder="title"
						/>
						<input
							className="full-width-input"
							onChange={this.onDescriptionChange}
							value={this.state.description}
							type="text"
							placeholder="description"
						/>
						<button
							className="button"
							type="submit"
						>
								Save
						</button>
					</form>
				)}

				{this.renderItemsList()}
			</div>
		);
	}
}

export default ItemsPage;
