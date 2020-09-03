import { createStore, compose, applyMiddleware } from 'redux';
import { Reducers } from '../Reducers/index.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const Store = createStore(Reducers, composeEnhancers());