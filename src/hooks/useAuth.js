import React, { useEffect, useContext, createContext, useState } from "react";
import { useApi } from "./useApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { call, setUser, setData, unsetError, unsetLoading } = useApi();

  const login = async (handle, password) => {
    return await call({
      url: "http://localhost:3000/api/v1/auth/login",
      method: "POST",
      body: {
        handle,
        password,
      },
      callback: setUser,
    });
  };

  const signup = async (name, password, handle, email, birthdate) => {
    return await call({
      url: "http://localhost:3000/api/v1/auth/signup",
      method: "POST",
      body: {
        name,
        password,
        handle,
        email,
        birthdate,
      },
      callback: setData,
    });
  };

  const logout = async () => {
    return await call({
      url: "http://localhost:3000/api/v1/auth/logout",
      method: "POST",
      callback: setUser,
    });
  };

  const tryAuth = async () => {
    try {
      await call({
        url: "http://localhost:3000/api/v1/auth/profile",
        callback: setUser,
      });
    } catch {}
    try {
      await call({
        url: "http://localhost:3000/api/v1/auth/refresh",
        callback: setUser,
      });
    } catch {}
    setIsAuthLoading(false);
    unsetError();
    unsetLoading();
  };

  useEffect(() => {
    tryAuth();
  }, []);

  return { login, signup, logout, isAuthLoading };
};
