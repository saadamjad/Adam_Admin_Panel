import { createStore, combineReducers, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

// reducers

import { Login } from "./reducer";

export const rootReducer = combineReducers({ Login });

const middleware = applyMiddleware(thunk, createLogger());

export const store = createStore(rootReducer, middleware);
