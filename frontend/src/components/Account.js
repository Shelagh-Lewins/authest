// Account
// user account settings, change password link

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Link } from 'reactstrap';

class Account extends Component {
	constructor() {
		super();
		this.state = {
			'errors': {}
		};
	}

	componentWillReceiveProps(nextProps) {
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
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
		console.log('url params ', this.props.match.params);
	}

	render() {
		const { errors } = this.state;
		// var csrftoken = this.getCookie('csrftoken');
		return(

			<a className="nav-link" href="/api/v1/password_change">Change password</a>

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
