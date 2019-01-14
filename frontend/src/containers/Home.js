// Home.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import ListsPage from './ListsPage';
import ItemsPage from './ItemsPage';
import SelectList from '../components/SelectList';

import * as lists from '../modules/lists';
import * as items from '../modules/items';
import { getGroupedAndFilteredLists } from '../modules/lists';
import { getItemsByListId } from '../modules/items';

import FlashMessage from '../components/FlashMessage';
import formatErrorMessages from '../modules/formatErrorMessages';
import isEmpty from '../modules/isEmpty';
import { clearErrors } from '../modules/errors';

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(lists.fetchLists());
	}

	componentDidUpdate(prevProps){
		// If the user's status has changed, refresh Lists
		if(prevProps.auth.user.token !== this.props.auth.user.token){
			this.props.dispatch(lists.fetchLists());
		}
	}

	onCurrentListChange = e => {
		this.props.dispatch(lists.setCurrentListId(e.target.value));
	}

	onSearch = searchTerm => {
		this.props.dispatch(lists.filterLists(searchTerm));
	}

	onCreateList = ({ title, description }) => {
		this.props.dispatch(lists.createList({ title, description }));
	}

	onIsPublicChange = ({ id, is_public }) => {
		this.props.dispatch(lists.setListIsPublic({ id, is_public }));
	}

	onDeleteList = (id) => {
		this.props.dispatch(lists.deleteList(id));
	}

	onCreateItem = (item) => {
		this.props.dispatch(items.createItem(item));
	}

	onDeleteItem = (item) => {
		this.props.dispatch(items.deleteItem(item));
	}

	onCloseFlashMessage = () => {
		this.props.dispatch(clearErrors());
	}

	render() {
		return (
			<div>
				<Container>
					<Row>
						<Col>
							{!isEmpty(this.props.errors) &&
						<FlashMessage
							message={formatErrorMessages(this.props.errors)}
							type="error"
							onClick={this.onCloseFlashMessage}
						/>}
						</Col>
					</Row>
				</Container>
				<Container>
					<Row>
						<Col>
							<SelectList
								lists={this.props.lists}
								onCurrentListChange={this.onCurrentListChange}
								currentListId={this.props.currentListId}
							/>
						</Col>
					</Row>
				</Container>
				<ListsPage
					lists={this.props.lists}
					onSearch={this.onSearch}
					onCreateList={this.onCreateList}
					onIsPublicChange={this.onIsPublicChange}
					onDeleteList={this.onDeleteList}
					isLoading={this.props.isLoading}
				/>
				{this.props.currentListId && (
					<ItemsPage
						items={this.props.items}
						onCreateItem={this.onCreateItem}
						currentListId={this.props.currentListId}
						onDeleteItem={this.onDeleteItem}
					/>
				)}
			</div>
		);
	}
}

Home.propTypes = {
	'auth': PropTypes.object.isRequired,
	'errors': PropTypes.object.isRequired,
	'isLoading': PropTypes.bool.isRequired,
	'lists': PropTypes.object.isRequired,
	'items': PropTypes.array.isRequired,
	'currentListId': PropTypes.string,
};

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors,
	'isLoading': state.lists.isLoading,
	'lists': getGroupedAndFilteredLists(state),
	'items': getItemsByListId(state),
	'currentListId': state.page.currentListId,
});

export default connect(mapStateToProps)(Home);
