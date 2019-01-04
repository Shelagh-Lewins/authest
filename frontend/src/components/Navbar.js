// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'showDropdown': false,
		};
	}
	showDropdown(e) {
		e.preventDefault();
		this.setState(prevState => ({
			'showDropdown': !prevState.showDropdown,
		}));
	}

	onLogout(e) {
		e.preventDefault();
		this.props.logoutUser(this.props.history);
	}

	render() {
		const { isAuthenticated, user } = this.props.auth;

		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<a href="/" className="nav-link" onClick={this.onLogout.bind(this)}>Logout</a>
			</ul>
		);
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Register</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Login</Link>
				</li>
			</ul>
		);
		return(
			<nav className="navbar navbar-expand-sm navbar-light bg-light">
				<Link className="navbar-brand" to="/">My Top Tens</Link>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
					onClick={(e) => {this.showDropdown(e);}} >
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className={`collapse navbar-collapse ${this.state.showDropdown ? 'show' : ''}`} id="navbarSupportedContent">
					{isAuthenticated && <span>{user.username}</span>}
					{isAuthenticated ? authLinks : guestLinks}
					<form className="form-inline my-2 my-lg-0">
						<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
					</form>
				</div>
				
			</nav>
		);
	}
}
Navbar.propTypes = {
	'logoutUser': PropTypes.func.isRequired,
	'auth': PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	'auth': state.auth
});

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
