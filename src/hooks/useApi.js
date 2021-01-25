import { useState, useCallback, createContext, useContext } from "react";
import { useIsLoading } from "./useIsLoading";
import axios from "axios";

const ApiContext = createContext(null);

export const ApiProvider = ({ children }) => {
  const api = useProvideApi();
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};

const useProvideApi = () => {
  const [
    isLoading,
    isError,
    setLoading,
    unsetLoading,
    setError,
    unsetError,
  ] = useIsLoading();
  const [data, setData] = useState(undefined);
  const [user, setUser] = useState(null);

  const call = useCallback(
    async ({ url, method = "GET", body = null, callback }) => {
      try {
        unsetError();
        setLoading();
        const response = await axios({
          url,
          method,
          data: body,
        });
        if (response.status === 200 || response.status === 201) {
          callback(method === "DELETE" ? undefined : response.data);
          unsetLoading();
          return true;
        } else {
          setError();
          return false;
        }
      } catch (error) {
        // silently try to refresh auth on unauthorized api response
        if (error.response.status === 401) {
          // first through regular access token
          try {
            const { data } = await axios(
              "http://localhost:3000/api/v1/auth/profile"
            );
            setUser(data);
            unsetLoading();
            unsetError();
          } catch {}
          // then through refresh token
          try {
            const { data } = await axios(
              "http://localhost:3000/api/v1/auth/refresh"
            );
            setUser(data);
            unsetLoading();
            unsetError();
          } catch {
            // redirect user to login if refresh token auth fails
            // (only if they already aren't on /login)
            // since at this point refresh token doesn't exist or is invalid
            if (
              window.location.pathname !== "/login" &&
              window.location.pathname !== "/signup"
            ) {
              window.location = "/login";
              return false;
            }
          }
        }
        setError();
        return false;
      }
    },
    [setError, setLoading, unsetLoading, unsetError]
  );

  const fetch = useCallback(
    ({ url, callback }) => {
      call({ url, callback });
    },
    [call]
  );

  return {
    state: {
      isLoading,
      isError,
      data,
      user,
    },
    setData,
    setUser,
    unsetError,
    unsetLoading,
    call,
    fetch,
  };
};
