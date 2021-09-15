import { combineReducers } from 'redux';
import arenaMapReducer from './arena_map';
import operationReducer from './operation';

const allReducers=combineReducers({
    arena_map: arenaMapReducer,
    operation: operationReducer
});

export default allReducers;
