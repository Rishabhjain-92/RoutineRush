import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme, themeClasses } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobile = () => setMobileOpen((open) => !open);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${themeClasses.header} backdrop-blur-xl border-b`}
      style={{ width: '100%', margin: 0, padding: 0 }}
    >
      <nav className="flex justify-between items-center py-4 px-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow overflow-hidden">
            <img src="/Preview.png" alt="RoutineRush Logo" className="object-contain w-full h-full" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
            RoutineRush
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-8 z-50">
          {navLinks.map(({ name, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-base lg:text-lg font-medium transition-colors relative group ${
                    isActive
                      ? 'text-rose-500'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
          {user && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `text-base lg:text-lg font-medium transition-colors relative group ${
                    isActive
                      ? 'text-rose-500'
                      : isDark
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4 z-50">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl ${themeClasses.cardStatic} backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:rotate-12`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>

          {/* Desktop buttons */}
          <div className="hidden md:flex space-x-4 items-center">
            {user ? (
              <>
                <span className={`text-sm font-medium ${themeClasses.muted}`}>
                  Hi, {user.firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-4 py-2 ${
                    isDark ? 'border-slate-600 text-slate-300 hover:border-blue-500' : 'border-indigo-300 text-indigo-600 hover:border-indigo-500'
                  } border rounded-xl transition-all duration-300 hover:scale-105`}
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className={`px-6 py-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Hamburger Button on Mobile */}
          <button
            onClick={toggleMobile}
            aria-label="Toggle menu"
            className={`md:hidden p-2 rounded-md ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'} focus:outline-none relative z-50`}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`absolute top-0 left-0 w-full h-screen ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transform transition-transform duration-300 ease-in-out ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden z-40`}
        >
          <div className="p-6 pt-24 flex flex-col space-y-8 font-semibold">
            {navLinks.map(({ name, path }) => (
              <NavLink
                key={name}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-2xl transition-colors ${isActive ? 'text-rose-500' : isDark ? 'text-white hover:text-rose-400' : 'text-slate-800 hover:text-rose-500'}`
                }
              >
                {name}
              </NavLink>
            ))}
            {user && (
              <NavLink
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `text-2xl transition-colors ${isActive ? 'text-rose-500' : isDark ? 'text-white hover:text-rose-400' : 'text-slate-800 hover:text-rose-500'}`
                }
              >
                Dashboard
              </NavLink>
            )}
            <div className="flex flex-col space-y-4 mt-6">
              {user ? (
                <>
                  <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Signed in as {user.firstName}</p>
                  <button onClick={handleLogout} className={`px-6 py-3 border rounded-xl text-center transition-all ${isDark ? 'bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500/30' : 'bg-red-50 border-red-200 text-red-500 hover:bg-red-100'}`}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)} className={`px-6 py-3 border rounded-xl text-center transition-all ${isDark ? 'border-white text-white hover:bg-white/10' : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}>
                    Log In
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl text-center text-white font-semibold transition-all hover:scale-105 hover:shadow-lg">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
