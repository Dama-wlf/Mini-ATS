import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice.js";
import Logo from "../ui/Logo.jsx";
import { LayoutDashboard, Users, UserPlus, Columns3, FolderArchive, LogOut, Menu, X, AlertCircle } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/candidates", icon: Users, label: "Listes Candidats" },
  { to: "/add-candidate", icon: UserPlus, label: "Ajout Candidat" },
  { to: "/pipeline", icon: Columns3, label: "Pipeline" },
  { to: "/cv-bank", icon: FolderArchive, label: "Banque de CV" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    dispatch(logoutUser());
    setShowLogoutModal(false);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Modale de confirmation de logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 " onClick={closeLogoutModal}>
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-red-100 p-3">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
              Se déconnecter ?
            </h3>
            
            <p className="text-gray-600 text-center mb-6">
              Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={closeLogoutModal}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleLogoutConfirm}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
              >
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bouton menu mobile */}
      <button
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white sm:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity sm:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-sidebar shadow-lg transform transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          sm:translate-x-0  sm:shadow-none
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
            <Logo size="h-9 w-9" iconSize="h-5 w-5" rounded="rounded-lg" />
            <span className="text-lg font-semibold text-sidebarText">Mini ATS</span>
            {/* Close button mobile */}
            <button
              className="ml-auto sm:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sidebarText hover:bg-primary/10 transition
                  ${isActive ? "bg-primary/20 font-semibold" : ""}`
                }
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <div className="mb-3 flex items-center gap-3 px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                {user?.userName?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium text-sidebarText">
                  {user?.userName}
                </p>
                <p className="truncate text-xs text-sidebarText/60">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Bouton deconnecter */}
            <button
              onClick={openLogoutModal}
              className="flex items-center gap-2 w-full text-red-400 hover:bg-red-500/10 hover:text-red-500 px-4 py-2 rounded-lg transition"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Se déconnecter</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}