import { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import {
  Calendar,
  TrendingUp,
  CalendarCheck,
  Flame,
  Check,
  Circle,
} from "lucide-react";

// Demo data for progress stats
const routineStats = [
  {
    label: "Total Routines",
    icon: Calendar,
    value: 5,
    color: "text-indigo-500",
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    label: "Days Completed",
    icon: CalendarCheck,
    value: 132,
    color: "text-green-500",
    bg: "bg-green-100 dark:bg-green-900/30",
  },
  {
    label: "Current Streak",
    icon: Flame,
    value: 11,
    color: "text-orange-500",
    bg: "bg-orange-100 dark:bg-orange-900/30",
  },
  {
    label: "Longest Streak",
    icon: TrendingUp,
    value: 22,
    color: "text-rose-500",
    bg: "bg-rose-100 dark:bg-rose-900/30",
  },
];

// Example weekly completion data (could be replaced with a chart lib)
const last7Days = [
  { day: "Mon", percent: 100 },
  { day: "Tue", percent: 80 },
  { day: "Wed", percent: 70 },
  { day: "Thu", percent: 90 },
  { day: "Fri", percent: 60 },
  { day: "Sat", percent: 100 },
  { day: "Sun", percent: 50 },
];

export default function CheckProgressPage() {
  const [isDark, setIsDark] = useState(true); // Theme example

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800",
    card: isDark
      ? "bg-white/5 border-white/10"
      : "bg-white/80 border-indigo-200/30",
    accent: isDark ? "text-blue-400" : "text-indigo-600",
    muted: isDark ? "text-slate-300" : "text-slate-600",
  };

  // Animated background particles
  const [particles] = useState(() =>
    Array.from({ length: 18 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  );

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.bg} transition-all duration-700`}>
      <SideBar isDark={isDark} setIsDark={setIsDark} />

      {/* Particle Animated BG */}
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
      <main className="flex-1 px-5 md:px-16 py-10 relative overflow-y-auto">
        <section className="mb-10 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            <span className="inline-block bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Your Progress Overview
            </span>
          </h2>
          <p className={`${themeClasses.muted} text-lg mb-6`}>
            Track your routine streaks, completions, and consistency trends.
          </p>
        </section>

        {/* Quick Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {routineStats.map(stat => (
            <div
              key={stat.label}
              className={`${themeClasses.card} border rounded-2xl p-5 flex flex-col items-center animate-pop shadow group`}
            >
              <div className={`rounded-full p-2 mb-3 text-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-3xl font-bold leading-none mb-1">{stat.value}</div>
              <div className="text-sm font-medium uppercase tracking-wider text-center">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Last 7 Days Chart */}
        <section className={`${themeClasses.card} border rounded-3xl p-8 mb-12 animate-slideUp`}>
          <h4 className="text-xl font-bold mb-5 flex items-center gap-2">
            <Check className={`${themeClasses.accent} w-7 h-7`} />
            Weekly Routine Completion
          </h4>
          <div className="flex items-end gap-4 h-40">
            {last7Days.map((d, i) => (
              <div
                key={d.day}
                className="flex flex-col items-center flex-1"
                style={{ animation: `fadeInBar 0.8s ${i * 0.1}s cubic-bezier(.7,.2,.2,1) both` }}
              >
                <div
                  className="w-7 rounded-full transition-all mb-2"
                  style={{
                    height: `${d.percent * 0.32}px`,
                    background: `linear-gradient(to top, #3b82f6, #c026d3)`,
                    opacity: d.percent === 100 ? 1 : 0.8,
                  }}
                />
                <div className={`text-sm font-bold ${themeClasses.accent}`}>{d.day}</div>
                <div className="text-xs">{d.percent}%</div>
              </div>
            ))}
          </div>
        </section>

        {/* Completion Summary */}
        <section className="flex flex-col md:flex-row gap-8">
          {/* Most consistent routines */}
          <div className={`${themeClasses.card} border rounded-2xl p-6 flex-1 animate-slideUp`} style={{ animationDelay: "0.12s" }}>
            <h5 className="text-lg font-bold mb-2 flex items-center gap-1">
              <Circle className="w-5 h-5 text-green-400" /> Most Consistent
            </h5>
            <ul className="ml-2">
              <li>• Morning Routine <span className="text-green-400 ml-3 font-semibold">89%</span></li>
              <li>• Study Routine <span className="text-green-400 ml-3 font-semibold">78%</span></li>
            </ul>
          </div>
          {/* Least consistent */}
          <div className={`${themeClasses.card} border rounded-2xl p-6 flex-1 animate-slideUp`} style={{ animationDelay: "0.24s" }}>
            <h5 className="text-lg font-bold mb-2 flex items-center gap-1">
              <Circle className="w-5 h-5 text-rose-400" /> Needs Focus
            </h5>
            <ul className="ml-2">
              <li>• Night Routine <span className="text-rose-400 ml-3 font-semibold">46%</span></li>
              <li>• Reading <span className="text-rose-400 ml-3 font-semibold">38%</span></li>
            </ul>
          </div>
        </section>
        {/* Animations */}
        <style>{`
          @keyframes fadeInBar { 0%{opacity:0;transform:scaleY(0.1);} 100%{opacity:1;transform:none;} }
          .animate-fadeInUp    { animation: fadeInUp 1s cubic-bezier(.7,.2,.2,1) both; }
          .animate-slideUp     { animation: fadeInUp 0.9s cubic-bezier(.7,.2,.2,1) both; }
          .animate-pop         { animation: popIn 0.65s cubic-bezier(.7,.2,.2,1) both; }
          @keyframes fadeInUp { 0%{opacity:0;transform:translateY(40px);} 100%{opacity:1;transform:none;} }
          @keyframes popIn    { 0%{opacity:0;transform:scale(.90);} 100%{opacity:1;transform:none;} }
        `}</style>
      </main>
    </div>
  );
}
