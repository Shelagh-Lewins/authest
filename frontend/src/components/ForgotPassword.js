// ForgotPassword.js
// request an email with a link to reset the password

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword, forgotPasswordEmailNotSent } from '../actions/authentication';
import classnames from 'classnames';

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
		this.props.forgotPasswordEmailNotSent();
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
		};
		this.props.forgotPassword(user);
	}

	render() {
		const { errors } = this.state;
		return(
			<div className="container" style={ { 'marginTop': '50px', 'width': '700px' } }>
				<h2 style={ { 'marginBottom': '40px' } }>Forgot password?</h2>
				<form onSubmit={ this.handleSubmit }>
					<div className="form-group">
						<input
							type="email"
							placeholder="Email address"
							className={classnames('form-control form-control-lg', {
								'is-invalid': errors.email
							})}
							name="email"
							onChange={ this.handleInputChange }
							value={ this.state.email }
						/>
						{errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-primary">
								Send me a password reset email
						</button>
					</div>
				</form>
				{this.props.auth.forgotPasswordEmailSent && (<div className="feedback">An email has been sent to {this.state.email}</div>)}
			</div>
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
	'errors': state.errors
});

export  default connect(mapStateToProps, { forgotPassword, forgotPasswordEmailNotSent })(ForgotPassword);
