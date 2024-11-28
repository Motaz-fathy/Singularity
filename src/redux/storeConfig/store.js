// ** Redux, Thunk & Root Reducer Imports
import thunk from "redux-thunk";
import createDebounce from "redux-debounced";
import rootReducer from "../reducers/rootReducer";
import { createStore, applyMiddleware, compose } from "redux";
// import logger from "redux-logger";

// ** init middleware
const middleware = [thunk, createDebounce()];

if (process.env.NODE_ENV === `development`) {
  // middleware.push(logger);
}

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ** Create store
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(...middleware)));

export { store };
