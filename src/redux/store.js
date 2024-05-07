// index.js
import { createStore, combineReducers } from 'redux';
import dishReducer from './reducers/dish';

const rootReducer = combineReducers({
    dish: dishReducer
});

const store = createStore(rootReducer);

export default store;