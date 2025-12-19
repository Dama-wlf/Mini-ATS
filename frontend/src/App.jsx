import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "./features/auth/authSlice";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Candidates from "./pages/Candidates";
import CandidateForm from "./pages/CandidateForm";
import Pipeline from "./pages/Pipeline";
import CvBank from "./pages/CvBank";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";



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

      {/* Routes protégées */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/add-candidate" element={<CandidateForm />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/cv-bank" element={<CvBank />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
