// Home.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { fetchLists } from '../actions/lists';
import { getGroupedAndFilteredLists } from '../reducers/listsReducer';
import { getItemsByListId } from '../reducers/itemsReducer';

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(fetchLists());
	}

	render() {
		return (
			<Container>
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
	// 'loginUser': PropTypes.func.isRequired,
	'auth': PropTypes.object.isRequired,
	'errors': PropTypes.object.isRequired,
	'isLoading': PropTypes.bool.isRequired, // it's a boolean?
	'lists': PropTypes.object.isRequired,
	'items': PropTypes.array.isRequired,
	'currentListId': PropTypes.string.isRequired,
};
/*
function mapStateToProps(state) {
	const { isLoading, error } = state.lists;
	const { currentListId } = state.page;

	return {
		'lists': listsReducer.getGroupedAndFilteredLists(state),
		'items': itemsReducer.getItemsByListId(state),
		'currentListId': currentListId,
		isLoading,
		error,
	};
} */

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors,
	'isLoading': state.lists.isLoading,
	'lists': getGroupedAndFilteredLists(state),
	'items': getItemsByListId(state),
	//'lists': getGroupedAndFilteredLists,
	// 'items': state.items,
	'currentListId': state.page.currentListId,
});

export  default connect(mapStateToProps)(Home);
