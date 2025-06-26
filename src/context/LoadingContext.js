import React, { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext({
  loading: false,
  setLoading: () => {},
  show: () => {},
  hide: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const show = useCallback(() => setLoading(true), []);
  const hide = useCallback(() => setLoading(false), []);
  return (
    <LoadingContext.Provider value={{ loading, setLoading, show, hide }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
