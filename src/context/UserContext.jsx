import React from "react";
import { getLocalStorage } from "../utils/helper";

export const UserInfoContext = React.createContext();
const initialState = {
  isAuthenticated: Boolean(getLocalStorage("access_token")),
  user: null,
};

const UserContext = ({ children }) => {
  const [userInfo, setUserInfo] = React.useState(initialState.user);
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    initialState.isAuthenticated
  );
  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserContext;
