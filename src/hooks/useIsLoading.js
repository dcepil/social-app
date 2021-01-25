import { useState, useCallback } from "react";

export const useIsLoading = () => {
  const [state, setState] = useState({
    isError: false,
    isLoading: false,
  });

  const setLoading = useCallback(() => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
  }, []);

  const unsetLoading = useCallback(() => {
    setState((prevState) => ({ ...prevState, isLoading: false }));
  }, []);

  const setError = useCallback(() => {
    setState((prevState) => ({ ...prevState, isError: true }));
  }, []);

  const unsetError = useCallback(() => {
    setState((prevState) => ({ ...prevState, isError: false }));
  }, []);

  return [
    state.isLoading,
    state.isError,
    setLoading,
    unsetLoading,
    setError,
    unsetError,
  ];
};
