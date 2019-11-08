import { createStore, combineReducers } from 'redux';

import { movies } from './reducers';

const reducers = combineReducers({
  movies,
});

const store = createStore(reducers);

export default store;
