// Login.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authentication';
import { Container, Row, Col, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import ValidatedForm from './ValidatedForm.js';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			'useridentifier': '',
			'password': ''
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
		if(nextProps.errors) {
			this.setState({
				'errors': nextProps.errors
			});
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
			'userIdentifier': this.state.useridentifier,
			'password': this.state.password,
		};
		this.props.loginUser(user, this.props.history);
	}

	render() {
		const { errors } = this.props;
		return(
			<Container>
				<h2>Login</h2>
				<ValidatedForm onSubmit={ this.handleSubmit }>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="useridentifier">Email address or username</Label>
								<Input
									type="text"
									name="useridentifier"
									id="useridentifier"
									required={true}
									onChange={ this.handleInputChange }
									value={ this.state.useridentifier }
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
							{errors.authentication && <div className="form-feedback " style={{ 'display': 'block' }}><ul>{errors.authentication}</ul></div>}
						</Col>
					</Row>
				</ValidatedForm>
				<Link className="nav-link" to="/forgotpassword">Forgot password?</Link>
			</Container>
		);
	}
}
// TODO fix up validation

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
