// App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
// note that the Django template pages reset password load the bootstrap css from static/bootstrap

if(localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
	store.dispatch(setCurrentUser(localStorage.jwtToken));

	const currentTime = Date.now() / 1000;
	if(localStorage.jwtToken.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = '/login';
	}
}

class App extends Component {
	render() {
		return (
			<Provider store = { store }>
				<Router>
					<div>
						<Navbar />
						<Route exact path="/" component={ Home } />
						<div className="container">
							<Route exact path="/register" component={ Register } />
							<Route exact path="/login" component={ Login } />
							<Route exact path="/forgotpassword" component={ ForgotPassword } />
							{/* <Route path="/reset/:uid?/:token?" component={ ResetPassword } /> */}
						</div>
					</div>
				</Router>
			</Provider>
		);
	}
}

export default App;
