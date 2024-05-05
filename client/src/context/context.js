import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Context = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // if (!userInfo) navigate("/");
  }, []);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        items,
        setItems
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const UserState = () => {
  return useContext(Context);
};
export default UserProvider;