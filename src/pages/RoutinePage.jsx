import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Sun,
  Moon,
  Plus,
  Edit2,
  Trash2,
  ArrowRight,
  ListCheck,
  BarChart,
  User,
  Users,
  Mail,
} from "lucide-react";
import SideBar from "../components/Sidebar/SideBar";

// Sample data
const routines = [
  {
    name: "Morning Routine",
    time: "5:00 AM",
    tasks: [
      { name: "Wake up", completed: true },
      { name: "Meditate", completed: true },
      { name: "Exercise", completed: true },
      { name: "Read", completed: false },
      { name: "Plan the day", completed: false },
    ],
    streak: 7,
    longest: 14,
  },
  {
    name: "Study Routine",
    time: "9:00 PM",
    tasks: [
      { name: "Review notes", completed: true },
      { name: "Flash cards", completed: false },
      { name: "Quiz", completed: false },
    ],
    streak: 3,
    longest: 8,
  },
];

export default function RoutinePage() {
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const [showAdd, setShowAdd] = useState(false);

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
    Array.from({ length: 24 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }))
  );

  return (
    <div
      className={`flex h-screen w-full overflow-hidden ${themeClasses.bg} transition-all duration-700`}
    >
      {/* Sidebar with theme props */}
      <SideBar isDark={isDark} setIsDark={setIsDark} location={location} />

      {/* Particle animated BG */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              isDark ? "bg-blue-400/30" : "bg-indigo-400/40"
            } animate-pulse`}
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
      <main className="flex-1 px-4 md:px-14 py-8 md:py-14 overflow-y-auto">
        <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fadeIn">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Your Routines</h2>
            <p className={`text-base md:text-lg ${themeClasses.muted} animate-fadeInDelay`}>
              Kickstart consistency—manage all your habits and workflows here!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className={`${themeClasses.card} border rounded-xl p-6 flex flex-col items-center animate-pop`}
            >
              <span className="text-xs mb-1">Current Streak</span>
              <span className="text-2xl font-extrabold text-green-400">7 days</span>
            </div>
            <div
              className={`${themeClasses.card} border rounded-xl p-6 flex flex-col items-center animate-pop`}
              style={{ animationDelay: "100ms" }}
            >
              <span className="text-xs mb-1">Longest Streak</span>
              <span className="text-2xl font-extrabold text-indigo-400">14 days</span>
            </div>
            <button
              className={`flex items-center gap-2 px-5 py-2 rounded-xl shadow ${themeClasses.button} transition-all text-white font-semibold hover:scale-110 hover:shadow-2xl animate-fadeIn`}
              style={{ animationDelay: "275ms" }}
              onClick={() => setShowAdd(true)}
            >
              <Plus className="w-5 h-5" /> Add Routine
            </button>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          {routines.map((routine, idx) => (
            <div
              key={routine.name}
              className={`${themeClasses.card} border rounded-3xl p-6 flex flex-col gap-5 shadow-lg group transition-transform duration-300 hover:scale-[1.03] animate-slideUp`}
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold">{routine.name}</h4>
                <span
                  className={`px-3 py-1 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 text-white text-xs font-bold animate-bounce`}
                >
                  {routine.time}
                </span>
              </div>
              <ul className="mb-4">
                {routine.tasks.map((task) => (
                  <li
                    key={task.name}
                    className="flex items-center mt-2"
                  >
                    <span
                      className={`inline-block w-4 h-4 mr-2 rounded border-2 ${
                        task.completed
                          ? "bg-green-400 border-green-400 animate-check"
                          : "border-gray-300"
                      } transition`}
                    />
                    <span
                      className={`${task.completed ? "line-through text-green-400" : themeClasses.muted}`}
                    >
                      {task.name}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-3 items-center justify-between">
                <div className="flex-1 flex items-center">
                  <span className="text-xs mr-2">Progress</span>
                  <div className="w-[120px] h-2 bg-gray-200/20 rounded-full overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 transition-all animate-growBar"
                      style={{
                        width: `${Math.round(
                          (routine.tasks.filter((t) => t.completed).length /
                            routine.tasks.length) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-bold">
                    {Math.round(
                      (routine.tasks.filter((t) => t.completed).length /
                        routine.tasks.length) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/routines/${routine.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <button
                      className="rounded-full bg-blue-500/10 p-2 hover:bg-blue-500/20 transition animate-pop"
                      title="Edit routine"
                    >
                      <Edit2 className="w-5 h-5 text-blue-400" />
                    </button>
                  </Link>
                  <button
                    className="rounded-full bg-rose-500/10 p-2 hover:bg-rose-500/20 transition animate-pop"
                    title="Delete routine"
                    style={{ animationDelay: "100ms" }}
                  >
                    <Trash2 className="w-5 h-5 text-rose-400" />
                  </button>
                </div>
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-green-500">Streak: {routine.streak} days</span>
                <span className="text-indigo-400">
                  Longest: {routine.longest} days
                </span>
              </div>
            </div>
          ))}
        </section>

        {showAdd && (
          <div className="fixed z-50 inset-0 flex items-center justify-center bg-black/40 animate-fadeInFast">
            <div
              className={`w-full max-w-lg mx-auto border rounded-3xl p-8 shadow-2xl relative transition-all
                ${isDark ? "bg-slate-900/90 border-blue-500/40" : "bg-white/95 border-indigo-200/90"}
                animate-slideUpModal`}
            >
              <button
                type="button"
                className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-rose-500 transition-transform hover:scale-125 hover:rotate-12"
                onClick={() => setShowAdd(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2
                className={`text-3xl font-extrabold text-center mb-7 ${
                  isDark ? "text-blue-400" : "text-indigo-600"
                } animate-fadeInFast`}
              >
                Add New Routine
              </h2>
              <form className="space-y-6 animate-slideUp">
                <input
                  className="w-full p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                  placeholder="Routine Name"
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    className="flex-1 p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                    placeholder="Category (optional)"
                  />
                  <input
                    className="flex-1 p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                    placeholder="Tag (optional)"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    className="flex-1 p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                    type="date"
                  />
                  <input
                    className="flex-1 p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                    type="date"
                    placeholder="End Date"
                  />
                </div>
                <select className="w-full p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none">
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Every 2 Days</option>
                  <option>Every 3 Days</option>
                </select>
                <input
                  className="w-full p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                  type="time"
                  placeholder="Reminder Time (optional)"
                />
                <textarea
                  className="w-full p-3 rounded-xl border border-gray-400 dark:border-gray-600 bg-transparent focus:outline-none"
                  rows={2}
                  placeholder="Notes / Motivation (optional)"
                />
                <button
                  type="submit"
                  className={`w-full py-3 mt-2 rounded-xl font-bold text-lg shadow-lg transition-all hover:scale-105 ${
                    isDark
                      ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500"
                  } text-white animate-pop`}
                >
                  Create Routine
                </button>
              </form>
              <div className="mt-4 text-xs text-center text-slate-400 animate-fadeInDelay">
                You can always edit, reorder, or add tasks later.
              </div>
            </div>
          </div>
        )}

        {/* Animations CSS */}
        <style>{`
          .animate-fadeIn { animation: fadeIn 1.2s cubic-bezier(.7,.2,.2,1) both; }
          .animate-fadeInDelay { animation: fadeIn 1s .5s cubic-bezier(.7,.2,.2,1) both; }
          .animate-fadeInFast { animation: fadeIn 0.6s cubic-bezier(.7,.2,.2,1) both; }
          .animate-pop { animation: popIn 0.8s cubic-bezier(.7,.2,.2,1) both; }
          .animate-slideUp { animation: slideUp 0.75s cubic-bezier(.7,.2,.2,1) both; }
          .animate-slideUpModal { animation: slideUpModal 0.7s cubic-bezier(.7,.2,.2,1) both; }
          .animate-growBar { animation: growBar 1.5s cubic-bezier(.7,.2,.2,1) both; }
          .animate-bounce { animation: bounce1 2.2s infinite alternate; }
          .animate-check { animation: quickPop 0.5s; }
          @keyframes fadeIn {0% {opacity:0;transform:translateY(30px);} 100% {opacity:1;transform:none;}}
          @keyframes popIn {0% {opacity:0;transform:scale(.85);} 100% {opacity:1;transform:none;}}
          @keyframes slideUp {0%{opacity:0;transform:translateY(40px);} 100%{opacity:1;transform:none;}}
          @keyframes slideUpModal {0%{opacity:0;transform:translateY(80px) scale(.9);} 100%{opacity:1;transform:none;}}
          @keyframes growBar {from {width:0;} to {width:var(--tw-progress-width,100%);}}
          @keyframes bounce1 {0%,100%{transform:translateY(0);} 50% {transform:translateY(-6px);}}
          @keyframes quickPop {0%{transform:scale(.85);} 45%{transform:scale(1.15);} 100%{transform:none;}}
        `}</style>
      </main>
    </div>
  );
}
