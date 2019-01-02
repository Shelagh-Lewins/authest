// Register.js

import React, { Component } from 'react';
import { Container, Row, Col, Form, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';

import ValidatedForm from './ValidatedForm';

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
	submit = () => {
		console.log('form submitted');
	}

	///////////////

	render() {
		const { errors } = this.state;

		return(
			<Container>
				<ValidatedForm onSubmit={ this.submit }>
	        <div className={'form-group'}>
	          <label
	            htmlFor={'email'}
	            >
	            Email
	          </label>
	          <input
	            id={'email'}
	            className={'form-control'}
	            required={true}
	            name={'email'}
	            type={'email'}
	            />
	          <div className='invalid-feedback' />
	        </div>
	        <div className={'form-group'}>
	          <label
	            htmlFor={'password'}
	            >
	            Password
	          </label>
	          <input
	            id={'password'}
	            className={'form-control'}
	            required={true}
	            name={'password'}
	            type={'password'}
	            minLength={6}
	            pattern='(?=.*\d)(?=.*[a-z]).{6,}'
	            />
	          <small className='form-text text-muted'>Must be at least 6 characters long, contain letters and numbers</small>
	          <div className='invalid-feedback' />
	        </div>
	        <div className={'row justify-content-md-center'}>
	          <div className={'col-sm-12'}>
	            <button
	              type={'submit'}
	              className={'btn btn-primary mb-2'}
	              >
	              Test submit!
	            </button>
	          </div>
	        </div>
	      </ValidatedForm>

				<h2>Create an account</h2>
				<Form onSubmit={this.handleSubmit}>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="username">Username</Label>
								<Input
									type="text"
									name="username"
									id="username"
									onChange={ this.handleInputChange }
									value={ this.state.username }
									placeholder="Username"
								/>
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
									id="email"
									onChange={ this.handleInputChange }
									value={ this.state.email }
									placeholder="Email address"
								/>
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
									id="password"
									onChange={ this.handleInputChange }
									value={ this.state.password }
									placeholder="Password"
								/>
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
									onChange={ this.handleInputChange }
									value={ this.state.password_confirm }
									placeholder="Password"
								/>
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
				</Form>
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
