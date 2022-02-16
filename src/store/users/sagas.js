import { call, put, takeEvery } from "redux-saga/effects";
import { GET_USERS_FETCH, GET_USERS_SUCCESS } from "./types";

function usersFetch() {
  return fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
  ).then((response) => response.json());
}

function* workGetUsersFetch() {
  const users = yield call(usersFetch);
  yield put({ type: GET_USERS_SUCCESS, users });
}

function* usersSaga() {
  yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
}

export default usersSaga;
