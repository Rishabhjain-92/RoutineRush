import React from 'react'
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
  
} from "lucide-react";

import { Link } from "react-router-dom";



function SideBar() {
      const [isDark, setIsDark] = useState(true);
      const navLinks = [
  { label: "Dashboard", icon: BarChart, to: "/dashboard" },
  { label: "Check Progress", icon: ArrowRightCircle, to: "/progress" },
  { label: "Routines", icon: ListCheck, to: "/routine" },
  { label: "Group Tracking", icon: Users, to: "/group-tracking" },
  { label: "Contact", icon: Mail, to: "/contact" },
  { label: "Profile", icon: User, to: "/profile" },
];
      
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
     
  return (
  
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
  )
}

export default SideBar