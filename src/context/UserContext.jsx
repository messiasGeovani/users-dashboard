import React, { createContext, useContext, useState } from "react";

const UsersContext = createContext();

const baseUser = {
  name: "",
  username: "",
  address: { city: "" },
  email: "",
};

function UserProvider({ children }) {
  const [user, setUser] = useState(baseUser);

  const clearUser = () =>
    setUser({
      name: "",
      username: "",
      address: { city: "" },
      email: "",
    });

  return (
    <UsersContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export default UserProvider;
