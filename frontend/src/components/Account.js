// Account
// user account settings, change password link

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

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

			<Container>
				<Row>
					<Col>
						<a className="nav-link" href="/">Change password</a>
					</Col>
				</Row>
			</Container>
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
