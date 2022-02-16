import { GET_USERS_SUCCESS, UPDATE_USER, ADD_USER, DELETE_USER } from "./types";

function normalizeUsers(currentUsers, incomingUsers) {
  const normalizedUsers = [...currentUsers];

  incomingUsers.forEach((user) => {
    const userAlreadyExist = normalizeUsers.find((item) => item.id === user.id);

    if (!userAlreadyExist) {
      normalizedUsers.push(user);
    }
  });

  return normalizedUsers;
}

const usersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      if (!state.users.length) {
        return { ...state, users: action.users };
      }

      const users = normalizeUsers(state.users, action.users);

      return { ...state, users: users };

    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case UPDATE_USER:
      const updateUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      const updatedUser = {
        ...state.users[updateUserIndex],
        ...action.payload,
      };

      return {
        ...state,
        users: [
          ...state.users.slice(0, updateUserIndex),
          updatedUser,
          ...state.users.slice(updateUserIndex + 1),
        ],
      };

    case DELETE_USER:
      const deleteUserIndex = state.users.findIndex(
        (user) => user.id === action.id
      );

      return {
        ...state,
        users: [
          ...state.users.slice(0, deleteUserIndex),
          ...state.users.slice(deleteUserIndex + 1),
        ],
      };

    default:
      return state;
  }
};

export default usersReducer;
