import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function store() {
 return createStore(
  rootReducer
 );
}

export default store;