import React, { createContext, useContext, useState } from "react";
import { CustomAxios } from "../../config/api";
import { useNavigate } from "react-router";
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      //authenticatuion api
      const response = await CustomAxios.post("/auth/logout");

      //if authenticated
      if (response.status === 200) {
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
      }
    } catch (error) {
      navigate(0);
    }
  };

  const signIn = async (signInData) => {
    try {
      //authenticatuion api
      const response = await CustomAxios.post("auth/login", signInData);

      //if authenticated
      if (response.status === 200) {
        const expirationTime = Date.now() + 3600000;
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...signInData,
            sessionExpiration: expirationTime,
          })
        );

        setUser(signInData);
        navigate("/dogs");
      }
    } catch (error) {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
