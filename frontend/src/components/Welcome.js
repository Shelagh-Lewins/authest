// Shown after successful registration of a new user

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

class Welcome extends Component {
	constructor() {
		super();
		this.state = {
			'errors': {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/'); // if logged in, redirect to Home
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	render() {
		return(
			<Container>
				<h2>Welcome to My Top Tens</h2>
				<p>Your account has been created. Click the link below to login.</p>
				<Row>
					<Col>
						<Link to="/login" className="nav-link">Login</Link>
					</Col>
				</Row>
			</Container>
		);
	}
}

Welcome.propTypes = {
	'auth': PropTypes.object.isRequired,
	'errors': PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors
});

export  default connect(mapStateToProps,)(Welcome);
