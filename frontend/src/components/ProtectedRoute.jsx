import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


 //Composant pour protéger les routes

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isInitialized } = useSelector(
    (state) => state.auth
  );

  //Vérification en cours du refresh token
  if (!isInitialized) {
    return <div>Chargement...</div>; //spiner plus tard
  }

  //Non connecté, rediriger vers login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //Connecté, affiche les routes protége
  return <Outlet />;
};

export default ProtectedRoute;
