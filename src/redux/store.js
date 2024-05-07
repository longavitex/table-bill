// index.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk'
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import dishReducers from './reducers/dishReducers';

const rootReducer = combineReducers({
    dish: dishReducers
});

const middlewares = [thunk, logger];
const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

export const persistor = persistStore(store);
export default store;