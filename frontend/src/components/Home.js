// Home.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import * as lists from '../actions/lists';
import * as items from '../actions/items';
import { getGroupedAndFilteredLists } from '../reducers/listsReducer';
import { getItemsByListId } from '../reducers/itemsReducer';

import FlashMessage from './FlashMessage';
import formatErrorMessages from '../modules/formatErrorMessages';
import { clearErrors } from '../reducers/errorReducer';

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(lists.fetchLists());
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
			<Container>
				{this.props.errors &&
					<FlashMessage
						message={formatErrorMessages(this.props.errors)}
						type="error"
						onClick={this.onCloseFlashMessage}
					/>}
				<h2>This is the Home page</h2>
				<Row>
					<Col>
						Nothing is happening here yet.
					</Col>
				</Row>
			</Container>
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

export  default connect(mapStateToProps)(Home);
