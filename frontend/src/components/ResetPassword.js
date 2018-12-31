// ForgotPassword.js
// request an email with a link to reset the password

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/authentication';
import classnames from 'classnames';
import $ from 'jquery'; 

class ResetPassword extends Component {
	constructor() {
		super();
		this.state = {
				password: '',
        password_confirm: '',
				errors: {}
		}
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.auth.isAuthenticated) {
				this.props.history.push('/')
		}
		if(nextProps.errors) {
				this.setState({
						errors: nextProps.errors
				});
		}
	}

	componentDidMount() {
		// http://localhost:8000/api/v1/reset/Mw/52k-907cfda87df2f1f3b009/

		if(this.props.auth.isAuthenticated) {
				this.props.history.push('/');
		}
		console.log('url params ', this.props.match.params)
	}

	handleInputChange(e) {
		this.setState({
				[e.target.name]: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = {
			uid: this.props.match.params.uid,
			csrfmiddlewaretoken: this.props.match.params.token,
			password: this.state.password,
      password_confirm: this.state.password_confirm
		}
		this.props.resetPassword(user);
	}

	// https://www.techiediaries.com/django-react-forms-csrf-axios/
	getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = $.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

	render() {
		const {errors} = this.state;
		var csrftoken = this.getCookie('csrftoken');
		return(
		<div className="container" style={{ marginTop: '50px', width: '700px'}}>
			<h2 style={{marginBottom: '40px'}}>Enter a new password</h2>
			<form onSubmit={ this.handleSubmit }>
 				<div className="form-group">
          <input
          type="password"
          placeholder="Password"
          className={classnames('form-control form-control-lg', {
              'is-invalid': errors.password
          })}
          name="password"
          onChange={ this.handleInputChange }
          value={ this.state.password }
          />
          {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
	      </div>
	      <div className="form-group">
          <input
          type="password"
          placeholder="Confirm Password"
          className={classnames('form-control form-control-lg', {
              'is-invalid': errors.password_confirm
          })}
          name="password_confirm"
          onChange={ this.handleInputChange }
          value={ this.state.password_confirm }
          />
          {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
	      </div>
				<div className="form-group">
					<input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
					<button type="submit" className="btn btn-primary">
							Set new password
					</button>
				</div>
			</form>
			{this.props.auth.forgotPasswordEmailSent && (<div className="feedback">An email has been sent to {this.state.email}</div>)}
		</div>
		)
	}
}

ResetPassword.propTypes = {
	resetPassword: PropTypes.func.isRequired,
//	forgotPasswordEmailNotSent: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export  default connect(mapStateToProps, { resetPassword })(ResetPassword)
