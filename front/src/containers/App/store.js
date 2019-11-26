import { combineReducers, createStore, applyMiddleware } from 'redux';
// import { reducer as reduxFormReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  eventReducer,
  resourceReducer,
  playerReducer,
} from '../../redux/reducers/index';

const reducer = combineReducers({
  event: eventReducer,
  resource: resourceReducer,
  player: playerReducer,
});

// const store = createStore(reducer);
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)),
);


export default store;
