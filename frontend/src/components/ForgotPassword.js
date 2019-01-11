// ForgotPassword.js
// request an email with a link to reset the password

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as auth from '../modules/auth';
import { Container, Row, Col, Label, Input } from 'reactstrap';
import ValidatedForm from './ValidatedForm.js';
import FlashMessage from '../components/FlashMessage';
import formatErrorMessages from '../modules/formatErrorMessages';
import isEmpty from '../modules/isEmpty';
import { clearErrors } from '../modules/errors';

class ForgotPassword extends Component {
	constructor() {
		super();
		this.state = {
			'email': '',
			'errors': {}
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
			this.props.history.push('/');
		}
	}

	componentDidMount() {
		if(this.props.auth.isAuthenticated) {
			this.props.history.push('/');
		}
		this.props.dispatch(auth.forgotPasswordEmailNotSent());
	}

	handleInputChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	onCloseFlashMessage = () => {
		this.props.dispatch(clearErrors());
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			'email': this.state.email,
		};
		this.props.dispatch(auth.forgotPassword(user));
	}

	render() {
		return(
			<Container>
				{!isEmpty(this.props.errors) &&
				<Row>
					<Col>
						<FlashMessage
							message={formatErrorMessages(this.props.errors)}
							type="error"
							onClick={this.onCloseFlashMessage}
						/>
					</Col>
				</Row>}
				<h2>Forgot your password?</h2>
				<p>Enter your email address. A reset password link will be emailed to you.</p>
				<ValidatedForm onSubmit={ this.handleSubmit }>
					<Row>
						<Col>
							<div className="form-group">
								<Label for="email">Email address</Label>
								<Input
									type="email"
									name="email"
									required={true}
									id="email"
									onChange={ this.handleInputChange }
									value={ this.state.email }
									placeholder="Enter your email address"
								/>
								<div className='invalid-feedback' />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<button type="submit" className="btn btn-primary">
								Send me a password reset email
							</button>
						</Col>
					</Row>
					<Row>
						<Col>
							{this.props.errors.email && <div className="invalid-feedback" style={{ 'display': 'block' }}>{this.props.errors.email}</div>}
						</Col>
					</Row>
				</ValidatedForm>
				{this.props.auth.forgotPasswordEmailSent && (<div className="valid-feedback">An email has been sent to {this.state.email}. If you don't see it within a few minutes, please check your junk mail folder.</div>)}
			</Container>
		);
	}
}

ForgotPassword.propTypes = {
	'forgotPassword': PropTypes.func.isRequired,
	'forgotPasswordEmailNotSent': PropTypes.func.isRequired,
	'auth': PropTypes.object.isRequired,
	'errors': PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	'auth': state.auth,
	'errors': state.errors,
	'forgotPassword': auth.forgotPassword,
	'forgotPasswordEmailNotSent': auth.forgotPasswordEmailNotSent,
});

export default connect(mapStateToProps)(ForgotPassword);
