import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

const renderApp = () => {
	ReactDOM.render(
		<App />, document.getElementById('root')
	);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./App', renderApp);
}

renderApp();

