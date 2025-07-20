import { useState } from "react";
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
  Plus,
} from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

// Navigation links
const navLinks = [
  { label: "Dashboard", icon: BarChart, to: "/dashboard" },
  { label: "Check Progress", icon: ArrowRightCircle, to: "/progress" },
  { label: "Routines", icon: ListCheck, to: "/routines" },
  { label: "Group Tracking", icon: Users, to: "/group-tracking" },
  { label: "Contact", icon: Mail, to: "/contact" },
  { label: "Profile", icon: User, to: "/profile" },
];

// Demo routines/stat data
const sampleRoutines = [
  {
    name: "Morning Routine",
    tasks: ["Meditation", "Journaling", "Stretching"],
    completion: 70,
    streak: 8,
  },
  {
    name: "Night Routine",
    tasks: ["Reading", "Reflection", "Plan Tomorrow"],
    completion: 40,
    streak: 4,
  },
];

export default function DashboardPage() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800",
    sidebar: isDark
      ? "bg-slate-900/90 border-r border-blue-500/10"
      : "bg-white/80 border-indigo-200/50",
    card: isDark
      ? "bg-white/5 border-white/10"
      : "bg-white/80 border-indigo-200/30",
    accent: isDark ? "text-blue-400" : "text-indigo-600",
    muted: isDark ? "text-slate-300" : "text-slate-600",
    button: isDark
      ? "bg-gradient-to-r from-blue-500 to-cyan-400"
      : "bg-gradient-to-r from-indigo-500 to-purple-500",
  };

  // Stable animated dots for background (per session)
  const [particles] = useState(() =>
    Array.from({ length: 26 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  );

  return (
    <NavLink 
    to="/dashboard"
    className={({ isActive }) =>
                 ` text-base lg:text-lg font-medium transition-colors ${isActive ? 'text-amber-700' : 'text-slate-300 hover:text-white'}`
                }
    >
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.bg} transition-all duration-700`}>
      {/* Sidebar */}
      <aside className={`min-w-[80px] md:min-w-[220px] flex flex-col py-8 md:py-10 px-3 md:px-5 ${themeClasses.sidebar} relative z-20`}>
        {/* Logo area - update src to your logo's path */}
        <div className="w-24 h-12 flex items-center justify-center mb-8 cursor-pointer">
          <img
            src="/Preview.png" // Place your logo in public/ and use the correct path
            alt="RoutineRush Logo"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        {/* Navigation */}
        <nav className="flex-1">
          <ul className="space-y-1 md:space-y-3">
            {navLinks.map((nav) => (
              <li key={nav.label}>
                <Link
                  to={nav.to}
                  className={`flex items-center space-x-4 rounded-xl px-3 py-3 transition-all group
                    ${location.pathname === nav.to
                      ? "bg-gradient-to-r from-blue-500/10 to-amber-500 font-bold"
                      : "hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-cyan-400/10"}
                  `}
                >
                  <nav.icon className={`w-6 h-6 group-hover:scale-110 ${themeClasses.accent}`} />
                  <span className="hidden md:block">{nav.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="pt-8 mt-auto flex items-center justify-between">
          <button
            onClick={() => setIsDark((d) => !d)}
            className="p-2 rounded-xl bg-gradient-to-br from-blue-500/70 to-cyan-500/80 hover:from-indigo-500 hover:to-purple-500 transition-all"
            aria-label="Toggle dark/light mode"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
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

      {/* Particle Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? "bg-blue-400/30" : "bg-indigo-400/40"} animate-pulse`}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 px-3 md:px-12 py-8 md:py-12 relative overflow-y-auto">
        {/* Greeting & Quick Stats */}
        <section className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Welcome back, <span className={themeClasses.accent}>User!</span>
            </h2>
            <p className={`text-base md:text-lg ${themeClasses.muted}`}>
              Here’s your progress and routines at a glance.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 w-full md:w-auto">
            <div className={`${themeClasses.card} p-4 rounded-2xl border flex flex-col items-center`}>
              <span className="text-sm font-medium mb-1">Tasks Completed Today</span>
              <span className="font-extrabold text-2xl text-green-400">5</span>
            </div>
            <div className={`${themeClasses.card} p-4 rounded-2xl border flex flex-col items-center`}>
              <span className="text-sm font-medium mb-1">Total Streak</span>
              <span className="font-extrabold text-2xl text-purple-400">23</span>
            </div>
            <div className={`${themeClasses.card} p-4 rounded-2xl border flex flex-col items-center`}>
              <span className="text-sm font-medium mb-1">Upcoming Routines</span>
              <span className="font-extrabold text-2xl text-blue-400">3</span>
            </div>
          </div>
        </section>

        {/* Routines Section with Add button */}
        <section>
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-2xl font-bold">Your Routines</h3>
            <Link
              to="/add-routine"
              className={`flex items-center gap-2 px-5 py-2 rounded-xl shadow ${themeClasses.button} transition-all text-white font-semibold hover:scale-105 hover:shadow-2xl`}
            >
              <Plus className="w-5 h-5" /> Add Routine
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {sampleRoutines.map((routine) => (
              <Link
                key={routine.name}
                to={`/routines/${encodeURIComponent(routine.name.replace(/\s+/g, '-').toLowerCase())}`}
                className={`flex flex-col md:flex-row items-center md:items-stretch ${themeClasses.card} border rounded-3xl p-6 gap-6 hover:scale-[1.025] group transition-transform duration-300 hover:shadow-lg`}
                style={{ textDecoration: "none" }}
              >
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-bold mb-2">{routine.name}</h4>
                  <ul className="text-sm mb-4 list-disc list-inside pl-2">
                    {routine.tasks.map((task) => (
                      <li key={task} className={themeClasses.muted}>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center mb-2">
                    <div className="w-full h-3 bg-gray-200/30 rounded-full overflow-hidden">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-orange-400 transition-all"
                        style={{ width: `${routine.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-3 font-semibold">{routine.completion}%</span>
                  </div>
                  <span className={`text-xs ${themeClasses.muted}`}>
                    Current Streak: {routine.streak} days
                  </span>
                </div>
                <span className="md:hidden text-sm px-3 py-1 rounded-xl font-medium bg-blue-500/10 text-blue-500 group-hover:bg-orange-500/20 group-hover:text-orange-600">
                  View Details &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
    </NavLink>
  );
}
