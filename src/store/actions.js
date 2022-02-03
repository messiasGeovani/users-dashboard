import { ADD_USER, GET_USERS_FETCH, UPDATE_USER, DELETE_USER } from "./types";

export const getUsersFetch = () => ({
  type: GET_USERS_FETCH,
});

export const addUser = (payload) => ({
  type: ADD_USER,
  payload,
});

export const updateUser = (payload) => ({
  type: UPDATE_USER,
  payload,
});

export const deleteUser = (id) => ({
  type: DELETE_USER,
  id,
});
