import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Spinner } from "./ui";

const ProtectedRoute = ({ children, minLoadingTime = 1000 }) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer;

    if (isInitialized) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, minLoadingTime);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isInitialized, minLoadingTime]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;