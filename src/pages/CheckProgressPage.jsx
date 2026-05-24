import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar/SideBar';
import { Calendar, TrendingUp, CalendarCheck, Flame, Check, Circle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';

export default function CheckProgressPage() {
  const { isDark, themeClasses } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/progress/stats');
        setStats(data);
      } catch (error) {
        console.error('Failed to load stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const routineStats = [
    { label: 'Total Routines', icon: Calendar, value: stats?.totalRoutines || 0, color: 'text-indigo-500', bg: isDark ? 'bg-indigo-900/30' : 'bg-indigo-100' },
    { label: 'Days Completed', icon: CalendarCheck, value: stats?.completedDays || 0, color: 'text-green-500', bg: isDark ? 'bg-green-900/30' : 'bg-green-100' },
    { label: 'Current Streak', icon: Flame, value: stats?.currentStreak || 0, color: 'text-orange-500', bg: isDark ? 'bg-orange-900/30' : 'bg-orange-100' },
    { label: 'Longest Streak', icon: TrendingUp, value: stats?.longestStreak || 0, color: 'text-rose-500', bg: isDark ? 'bg-rose-900/30' : 'bg-rose-100' },
  ];

  const weeklyData = stats?.weeklyData || [];

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.body} transition-all duration-700`}>
      <SideBar />

      <main className="flex-1 px-5 md:px-16 py-10 relative overflow-y-auto">
        <section className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            <span className="inline-block bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              Your Progress Overview
            </span>
          </h2>
          <p className={`${themeClasses.muted} text-lg mb-6`}>
            Track your routine streaks, completions, and consistency trends.
          </p>
        </section>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {routineStats.map((stat) => (
                <div key={stat.label} className={`${themeClasses.cardStatic} border rounded-2xl p-5 flex flex-col items-center shadow group hover:scale-105 transition-transform duration-300`}>
                  <div className={`rounded-full p-2 mb-3 text-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="text-3xl font-bold leading-none mb-1">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-center">{stat.label}</div>
                </div>
              ))}
            </section>

            {/* Weekly Chart */}
            <section className={`${themeClasses.cardStatic} border rounded-3xl p-8 mb-12`}>
              <h4 className="text-xl font-bold mb-5 flex items-center gap-2">
                <Check className={`${themeClasses.accent} w-7 h-7`} />
                Weekly Routine Completion
              </h4>
              <div className="flex items-end gap-4 h-40">
                {weeklyData.map((d, i) => (
                  <div key={d.day + i} className="flex flex-col items-center flex-1">
                    <div
                      className="w-8 rounded-full transition-all mb-2"
                      style={{
                        height: `${Math.max(d.percent * 1.2, 8)}px`,
                        background: `linear-gradient(to top, #f43f5e, #f97316)`,
                        opacity: d.percent === 0 ? 0.3 : 1,
                      }}
                    />
                    <div className={`text-sm font-bold ${themeClasses.accent}`}>{d.day}</div>
                    <div className="text-xs">{d.percent}%</div>
                  </div>
                ))}
              </div>
              {weeklyData.length === 0 && (
                <p className={`text-center ${themeClasses.muted} py-8`}>Start completing routines to see your weekly progress!</p>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
