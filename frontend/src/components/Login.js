// Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../modules/auth';
import { Container, Row, Col, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import ValidatedForm from './ValidatedForm.js';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			'email': '',
			'password': '',
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			'email': this.state.email,
			'password': this.state.password,
		};
		this.props.loginUser(user, this.props.history);
	}

	render() {
		return(
			<Container>
				<h2>Login</h2>
				<ValidatedForm onSubmit={ this.handleSubmit }>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="email">Email address</Label>
								<Input
									type="email"
									name="email"
									id="email"
									required={true}
									onChange={ this.handleInputChange }
									value={ this.state.email }
									placeholder="Email address or username"
								/>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									required={true}
									id="password"
									value={ this.state.password }
									placeholder="Password"
									onChange={ this.handleInputChange }
								/>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<button type="submit" className="btn btn-primary">
								Login
							</button>
						</Col>
					</Row>
	        <Row>
						<Col>
							{this.props.errors.authentication && <div className="invalid-feedback " style={{ 'display': 'block' }}>{this.props.errors.authentication}</div>}
						</Col>
					</Row>
				</ValidatedForm>
				<Link className="nav-link" to="/forgotpassword">Forgot password?</Link>
			</Container>
		);
	}
}

Login.propTypes = {
	'loginUser': PropTypes.func.isRequired,
	'auth': PropTypes.object.isRequired,
	'errors': PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors
});

export  default connect(mapStateToProps, { loginUser })(Login);
