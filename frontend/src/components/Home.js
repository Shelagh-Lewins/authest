// Home.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

import { getLists } from '../reducers/listsReducer';
import { getGroupedAndFilteredLists } from '../reducers/listsReducer';

class Home extends Component {
	componentDidMount() {
		this.props.dispatch(getLists.fetchLists());
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
	'isLoading': PropTypes.object.isRequired,
	'lists': PropTypes.object.isRequired,
	'items': PropTypes.object.isRequired,
	'currentListId': PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors,
	'isLoading': state.isLoading,
	'lists': getGroupedAndFilteredLists(state),
//	'items': items.getItemsByListId(state),
	//'lists': getGroupedAndFilteredLists,
	'items': state.items,
//	'currentListId': state.page.currentListId,
});

export  default connect(mapStateToProps, { })(Home);
