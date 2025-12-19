import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../features/auth/authSlice.js";
import Logo from "../ui/Logo.jsx";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Columns3,
  FolderArchive,
  LogOut,
  Briefcase,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Tableau de bord" },
  { to: "/candidates", icon: Users, label: "Listes Candidats" },
  { to: "/add-candidate", icon: UserPlus, label: "Ajout Candidat" },
  { to: "/pipeline", icon: Columns3, label: "Pipeline" },
  { to: "/cv-bank", icon: FolderArchive, label: "Candidats rejetés" },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
console.log("user:", user);
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar">
      <div className="flex h-full flex-col">

        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <Logo size="h-9 w-9" iconSize="h-5 w-5 " rounded="rounded-lg"/>
          <span className="text-lg font-semibold text-sidebarText">
            Mini ATS
          </span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `
                sidebar-item
                ${isActive ? "sidebar-item-active" : ""}
                `
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

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

          <button
            onClick={handleLogout}
            className="sidebar-item w-full text-red-400 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
