// src/components/Sidebar/SideBar.jsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, BarChart, ListCheck, User, Users, ArrowRightCircle, Settings, LogOut, Menu, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Dashboard', icon: BarChart, to: '/dashboard' },
  { label: 'Check Progress', icon: ArrowRightCircle, to: '/progress' },
  { label: 'Routines', icon: ListCheck, to: '/routine' },
  { label: 'Group Tracking', icon: Users, to: '/group-tracking' },
  { label: 'Profile', icon: User, to: '/profile' },
];

export default function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme, themeClasses } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Hamburger for Mobile */}
      <button
        className={`md:hidden fixed top-5 left-5 z-[100] p-2 rounded-md border ${
          isDark ? 'border-white/30 text-white' : 'border-gray-400 text-gray-800'
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
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col md:py-10 md:px-5
        `}
        aria-label="Sidebar navigation"
      >
        <div className="flex justify-between items-center px-4 mb-8 mt-6">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow overflow-hidden">
              <img src="/Preview.png" alt="RoutineRush Logo" className="object-contain w-full h-full" />
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

        {/* User info */}
        {user && (
          <div className="px-4 mb-6">
            <div className={`flex items-center gap-3 p-3 rounded-xl ${themeClasses.cardStatic} border`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.firstName} {user.lastName}</p>
                <p className={`text-xs ${themeClasses.muted} truncate`}>{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2">
          <ul className="space-y-3">
            {navLinks.map(({ label, icon: Icon, to }) => {
              const active = location.pathname === to;
              return (
                <li key={label}>
                  <Link
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      group flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-300
                      ${active
                        ? 'bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-500 shadow-sm'
                        : isDark
                        ? 'text-slate-300 hover:text-white hover:bg-white/5'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-rose-500' : isDark ? 'text-blue-400 group-hover:text-white' : 'text-indigo-500 group-hover:text-indigo-700'}`} />
                    <span>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom controls */}
        <div className="pt-6 mt-auto flex items-center justify-between px-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl ${isDark ? 'bg-blue-500/20 hover:bg-blue-500/30' : 'bg-indigo-100 hover:bg-indigo-200'} transition-all`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
          <button
            onClick={handleLogout}
            className={`ml-auto px-3 py-2 rounded-xl ${isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'} transition-all flex items-center group`}
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-500" />
            <span className="hidden md:inline ml-2 text-sm text-red-400 group-hover:text-red-500">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
