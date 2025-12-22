import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshToken } from "./features/auth/authSlice";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CandidatesList from "./pages/CandidatesList";
import CandidateForm from "./pages/CandidateForm";
import Pipeline from "./pages/Pipeline";
import CvBank from "./pages/CvBank";
import LandingPage from "./pages/LandingPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/layout/MainLayout";



function App() {
  const dispatch = useDispatch();

  //rafraîchir le token si existant
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Routes>
      {/* Route publiques */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<LandingPage />} />

      {/* Routes protégées */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<CandidatesList />} />
          <Route path="/add-candidate" element={<CandidateForm />} />
          <Route path="/edit-candidate/:id" element={<CandidateForm />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/cv-bank" element={<CvBank />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
