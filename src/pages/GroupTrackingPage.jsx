import { useState } from "react";
import SideBar from "../components/Sidebar/SideBar";
import {
  Users,
  Trophy,
  Sparkles,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Search,
  Plus,
} from "lucide-react";
import { useLocation } from "react-router-dom";

// Example leaderboard and friends data (replace with real data)
const leaderboard = [
  { name: "Sophia Carter", streak: 9, points: 150, avatar: "/avatars/sophia.png" },
  { name: "Ethan Bennett", streak: 7, points: 100, avatar: "/avatars/ethan.png" },
  { name: "Olivia Hayes", streak: 6, points: 85, avatar: "/avatars/olivia.png" },
  { name: "Liam Foster", streak: 1, points: 62, avatar: "/avatars/liam.png" },
];

const friends = [
  { name: "Sophia Carter", completed: "90%", avatar: "/avatars/sophia.png" },
  { name: "Ethan Bennett", completed: "85%", avatar: "/avatars/ethan.png" },
  { name: "Olivia Hayes", completed: "28%", avatar: "/avatars/olivia.png" },
  { name: "Liam Foster", completed: "12%", avatar: "/avatars/liam.png" },
];

export default function GroupTrackingPage() {
  const [isDark, setIsDark] = useState(true);
  const [leaderSort, setLeaderSort] = useState("points"); // "points" or "streak"
  const [search, setSearch] = useState("");
  const location = useLocation();

  const themeClasses = {
    bg: isDark
      ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white"
      : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800",
    card: isDark ? "bg-white/5 border-white/10" : "bg-white/90 border-indigo-200/50",
    accent: isDark ? "text-blue-400" : "text-indigo-600",
    button: isDark
      ? "bg-gradient-to-r from-blue-500 to-cyan-400"
      : "bg-gradient-to-r from-indigo-500 to-purple-500",
    muted: isDark ? "text-slate-300" : "text-slate-600",
  };

  // Filter friends according to search query
  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`flex min-h-screen w-full overflow-hidden ${themeClasses.bg} transition-all duration-700`}
    >
      <SideBar isDark={isDark} setIsDark={setIsDark} location={location} />

      <main className="flex-1 px-4 md:px-12 py-8 md:py-12 overflow-y-auto">
        {/* Header */}
        <section className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fadeInDown">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold flex items-center gap-2">
              <Users className="w-8 h-8 text-blue-400" />
              Group Tracking
            </h2>
            <p className={`text-lg ${themeClasses.muted} mt-2`}>
              Friend progress, leaderboard, and motivation—all in one dashboard.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/10 rounded-xl px-4 py-2">
              <Search className="w-5 h-5 text-blue-400 mr-2" />
              <input
                className="bg-transparent focus:outline-none text-white placeholder-slate-400"
                placeholder="Search friends..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              className={`flex items-center gap-1 px-5 py-2 rounded-xl font-semibold ${themeClasses.button} text-white ml-3 hover:scale-105 transition-all`}
            >
              <Plus className="w-5 h-5" /> Invite Friend
            </button>
          </div>
        </section>

        {/* Leaderboard Section */}
        <section
          className={`mb-12 ${themeClasses.card} border rounded-3xl p-8 shadow-lg animate-fadeInUp`}
        >
          <div className="flex items-center mb-6">
            <Trophy className="w-8 h-8 text-yellow-400 mr-2" />
            <h3 className="text-2xl font-bold">This Week&apos;s Leaderboard</h3>
            <button
              onClick={() =>
                setLeaderSort(leaderSort === "points" ? "streak" : "points")
              }
              className="ml-4 px-3 py-1 rounded-lg text-xs flex items-center gap-1 border border-blue-400 bg-blue-500/10 hover:bg-blue-700/10 transition hover:scale-105 font-bold"
            >
              {leaderSort === "points" ? (
                <>
                  Points <ChevronDown className="w-4 h-4" />
                </>
              ) : (
                <>
                  Streak <ChevronUp className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[380px] w-full text-left mt-2">
              <thead>
                <tr className="uppercase text-xs tracking-wider text-slate-400">
                  <th className="py-2 pr-3">#</th>
                  <th className="py-2 pr-3">Name</th>
                  <th className="py-2 pr-3">Streak</th>
                  <th className="py-2 pr-3">Points</th>
                </tr>
              </thead>
              <tbody>
                {[...leaderboard]
                  .sort(
                    leaderSort === "points"
                      ? (a, b) => b.points - a.points
                      : (a, b) => b.streak - a.streak
                  )
                  .map((entry, idx) => (
                    <tr
                      key={entry.name}
                      className="hover:bg-blue-500/10 transition rounded-xl font-medium"
                    >
                      <td className="py-2 pr-3 font-extrabold text-rose-400">{idx + 1}</td>
                      <td className="flex items-center gap-2 py-2">
                        <img
                          src={entry.avatar}
                          className="w-8 h-8 rounded-full border-2 border-blue-400"
                          alt="avatar"
                        />
                        <span>{entry.name}</span>
                        {idx === 0 && (
                          <Sparkles
                            className="w-5 h-5 text-yellow-400 animate-bounce"
                            title="Current Leader"
                          />
                        )}
                      </td>
                      <td className="py-2 pr-3 text-blue-400">{entry.streak}</td>
                      <td className="py-2 pr-3 text-indigo-400">{entry.points}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Friends Progress Grid */}
        <section className="mb-12 animate-fadeInUp grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredFriends.length === 0 ? (
            <div className={`col-span-full text-xl font-semibold ${themeClasses.muted}`}>
              No friends found.
            </div>
          ) : (
            filteredFriends.map((f, idx) => (
              <div
                key={f.name}
                className={`${themeClasses.card} border rounded-3xl p-6 shadow-lg flex flex-col items-center gap-2 group hover:scale-[1.04] transition-transform duration-300 animate-pop`}
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                <img
                  src={f.avatar}
                  alt={f.name}
                  className="w-14 h-14 rounded-full border-2 border-blue-400 group-hover:scale-110 transition-transform"
                />
                <h4 className="text-xl font-bold mt-2 mb-1">{f.name}</h4>
                <div className="w-24 mb-1">
                  <div className="h-2 rounded-full bg-gray-200/30">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 animate-widthGrow`}
                      style={{ width: f.completed }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-blue-400 font-bold">{f.completed} daily tasks</span>
                <span className="text-xs text-slate-400">Consistency</span>
                <button
                  className={`mt-2 px-4 py-2 rounded-xl ${themeClasses.button} text-white font-bold text-xs shadow hover:scale-105 transition-all`}
                >
                  View Progress
                  <ArrowUpRight className="w-4 h-4 ml-1 inline" />
                </button>
              </div>
            ))
          )}
        </section>

        {/* Inline custom animations */}
        <style>{`
          @keyframes fadeInUp {0%{opacity:0;transform:translateY(42px);}100%{opacity:1;transform:none;}}
          @keyframes fadeInDown {0%{opacity:0;transform:translateY(-28px);}100%{opacity:1;transform:none;}}
          @keyframes popIn {0%{opacity:0;transform:scale(.93)}60%{transform:scale(1.07)}100%{opacity:1;transform:scale(1)}}
          @keyframes widthGrow {from{width:0} to {width:100%}}
          .animate-fadeInUp{animation:fadeInUp 0.7s cubic-bezier(.7,.2,.2,1) both;}
          .animate-fadeInDown{animation:fadeInDown .9s cubic-bezier(.7,.2,.2,1) both;}
          .animate-pop {animation: popIn .5s cubic-bezier(.43,.82,.53,1.28) both;}
          .animate-widthGrow {animation: widthGrow 1.2s cubic-bezier(.34,.86,.52,1) both;}
        `}</style>
      </main>
    </div>
  );
}
