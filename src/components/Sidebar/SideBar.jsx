// src/components/Sidebar/SideBar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  BarChart,
  ListCheck,
  User,
  Users,
  ArrowRightCircle,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Dashboard", icon: BarChart, to: "/dashboard" },
  { label: "Check Progress", icon: ArrowRightCircle, to: "/progress" },
  { label: "Routines", icon: ListCheck, to: "/routine" },
  { label: "Group Tracking", icon: Users, to: "/group-tracking" },

  { label: "Profile", icon: User, to: "/profile" },
];

export default function SideBar({ isDark, setIsDark }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const themeClasses = {
    sidebar: isDark
      ? "bg-slate-900/90 border-r border-blue-500/10"
      : "bg-white/80 border-indigo-200/50",
  };

  return (
    <>
      {/* Hamburger for Mobile */}
      <button
        className={`md:hidden fixed top-5 left-5 z-[100] p-2 rounded-md border ${
          isDark ? "border-white/30 text-white" : "border-gray-400 text-gray-800"
        }`}
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 flex-shrink-0 transition-transform duration-300 ease-in-out
          ${themeClasses.sidebar}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex md:flex-col md:py-10 md:px-5
        `}
        aria-label="Sidebar navigation"
      >
        <div className="flex justify-between items-center px-4 mb-8 mt-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow overflow-hidden">
  {/* Replace 'company-logo.png' with your actual filename and alt text */}
  <img
    src="/Preview.png"
    alt="Your Company Logo"
    className="object-contain w-full h-full"
  />
</div>

            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent whitespace-nowrap">
              RoutineRush
            </span>
          </Link>
          {/* Close button on mobile */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">
          <ul className="space-y-3">
            {navLinks.map(({ label, icon: Icon, to }) => {
              const active = location.pathname === to;
              return (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)} // close mobile menu on click
                    className={`
                      group flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-colors
                      ${active
                        ? "bg-gradient-to-r from-blue-500/20 to-amber-500 text-amber-700"
                        : "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-400/10"
                      }
                    `}
                  >
                    <Icon
                      className={`w-6 h-6 ${active ? "text-amber-700" : "text-blue-400 group-hover:text-white"}`}
                    />
                    <span className="hidden md:inline">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom controls */}
        <div className="pt-6 mt-auto flex items-center justify-between px-3">
          <button
            onClick={() => setIsDark((d) => !d)}
            className="p-2 rounded-xl bg-gradient-to-br from-blue-500/70 to-cyan-500/80 hover:from-indigo-500 hover:to-purple-500 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600" />
            )}
          </button>
          <button className="ml-auto px-3 py-2 rounded-xl hover:bg-gradient-to-tr hover:from-rose-500/10 hover:to-orange-500/10 transition-all flex items-center group">
            <Settings className="w-5 h-5 group-hover:text-orange-500" />
            <span className="hidden md:inline ml-2 text-sm">Settings</span>
          </button>
          <button className="ml-2 px-3 py-2 rounded-xl hover:bg-gradient-to-tr hover:from-red-500/10 hover:to-orange-500/10 transition-all flex items-center group">
            <LogOut className="w-5 h-5 group-hover:text-red-500" />
            <span className="hidden md:inline ml-2 text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
