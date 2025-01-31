import { combineReducers } from 'redux';
import reducer from './reducers'; // Исправлено: используем основной редюсер

const rootReducer = combineReducers({
    delivery: reducer, // Исправлено: используем редюсер доставки
});

export default rootReducer;