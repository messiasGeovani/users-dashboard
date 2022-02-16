import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import usersReducer from "./users/reducers";
import usersSaga from "./users/sagas";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ usersReducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(usersSaga);

export default store;
