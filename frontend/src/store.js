// store.js

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

//const inititalState = {};

const store = createStore(
	rootReducer, 
//	inititalState, 
	compose(applyMiddleware(thunk), 
		window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
}

export default store;
