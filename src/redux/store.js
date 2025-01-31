import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'; // Убедитесь, что путь правильный

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
