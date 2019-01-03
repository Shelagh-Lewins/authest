// Register.js

import React, { Component } from 'react';
import { Container, Row, Col, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';

import ValidatedForm from './ValidatedForm';
import ReactDOM from 'react-dom';

class Register extends Component {
	constructor() {
		super();
		this.state = {
			'username': '',
			'email': '',
			'password': '',
			'password_confirm': '',
			'errors': {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setPasswordConfirmValidity = this.setPasswordConfirmValidity.bind(this);
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			'username': this.state.username,
			'email': this.state.email,
			'password1': this.state.password,
			'password2': this.state.password_confirm
		};

		this.props.registerUser(user, this.props.history);
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

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	///////////////
	/* submit = () => {
		console.log('form submitted');
	} */

	setPasswordConfirmValidity(e) {
		// this.handleInputChange(e);

		const node = ReactDOM.findDOMNode(this);

		if (node instanceof HTMLElement) {
	    const password = node.querySelector('#password');
	    const password_confirm = node.querySelector('#password_confirm');

	    if (password.value === password_confirm.value) {
	    	 password_confirm.setCustomValidity('');
	    } else {
	    	password_confirm.setCustomValidity('Passwords must match');
	    }
		}
	}

	///////////////

	render() {
		const { errors } = this.state;

		return(
			<Container>
				<h2>Create an account</h2>
				<ValidatedForm onSubmit={ this.handleSubmit }>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="username">Username</Label>
								<Input
									type="text"
									name="username"
									id="username"
									required={true}
									onChange={ this.handleInputChange }
									value={ this.state.username }
									placeholder="Username"
								/>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="email">Email</Label>
								<Input
									type="email"
									name="email"
									required={true}
									id="email"
									onChange={ this.handleInputChange }
									value={ this.state.email }
									placeholder="Email address"
								/>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
							<div className="form-group">
								<Label for="password">Test thing</Label>
								<Input
									type="text"
									name="test"
									pattern="^(?=.*\d)(?=.*[a-zA-Z]).+$"
									id="test"
									placeholder="test"
								/>
								<div className='invalid-feedback' />
							</div>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="password">Password</Label>
								<Input
									type="password"
									name="password"
									required={true}
									minLength={6}
									pattern="^(?!^\d+$)^.+$"
									id="password"
									value={ this.state.password }
									placeholder="Password"
									onChange={ this.handleInputChange }
									onInput= { this.setPasswordConfirmValidity }
								/>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="password_confirm">Confirm your password</Label>
								<Input
									type="password"
									name="password_confirm"
									id="password_confirm"
									required={true}
									pattern='(?!^\d+$)^.+$.{8,}'
									minLength={8}
									value={ this.state.password_confirm }
									placeholder="Confirm password"
									onChange={ this.handleInputChange }
									onInput= { this.setPasswordConfirmValidity }
								/>
								<small className='form-text text-muted'>Must be at least 6 characters long, contain letters and numbers</small>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<button type="submit" className="btn btn-primary">
								Create account
							</button>
						</Col>
					</Row>
	        <Row>
						<Col>
							{errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
						</Col>
					</Row>
	      </ValidatedForm>
			</Container>
		);
	}
}

Register.propTypes = {
	'registerUser': PropTypes.func.isRequired,
	'auth': PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	'auth': state.auth,
	'errors': state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register));
