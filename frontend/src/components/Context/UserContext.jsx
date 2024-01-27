import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    firstname: "",
    email: "",
    phone: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (credentials) => {};

  const contextValue = {
    user,
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    handleLogin,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
