// Account
// user account settings, change password link

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

class Account extends Component {
	constructor() {
		super();
		this.state = {
			'errors': {}
		};
	}

	componentWillReceiveProps(nextProps) {
		console.log('account 1 ', nextProps.auth.isAuthenticated);
		if(!nextProps.auth.isAuthenticated) {
			this.props.history.push('/'); // if not logged in, redirect to Home
		}
		if(nextProps.errors) {
			this.setState({
				'errors': nextProps.errors
			});
		}
	}

	componentDidMount() {
		console.log('account 2 ', this.props.auth.isAuthenticated);
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	render() {
		const { errors } = this.state;

		return(
			<Link to="/changepassword" className="nav-link">Change password</Link>
		);
	}
}

Account.propTypes = {
	'auth': PropTypes.object.isRequired,
	'errors': PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors
});

export  default connect(mapStateToProps,)(Account);
