import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      {/* Contenu principal */}
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
