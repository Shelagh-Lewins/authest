// store.js

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/rootReducer';

const store = createStore(
	rootReducer, 
	// inititalState, // by not supplying initial state, we tell the store to use the defaults specified in the reducer
	compose(applyMiddleware(thunk), 
		window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./modules/rootReducer', () => store.replaceReducer(rootReducer));
}

export default store;
