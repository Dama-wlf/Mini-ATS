import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import {Spinner} from "./ui";

 //Composant pour protéger les routes

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  );

  //Vérification en cours du refresh token
  if (!isInitialized) {
    return <Spinner />;
  }

  //Non connecté, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  //Connecté, affiche les routes protége
  return <Outlet />;
};

export default ProtectedRoute;
