import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "./features/auth/authSlice";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  const dispatch = useDispatch();

  //rafraîchir le token si existant
  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <Routes>
      {/* Route publiques */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Route protégée */}
      <Route path="/" element={ <ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
    </Routes>
  );
}

export default App;
