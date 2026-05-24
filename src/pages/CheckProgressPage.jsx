import { useState, useEffect } from 'react';
import SideBar from '../components/Sidebar/SideBar';
import { Calendar, TrendingUp, CalendarCheck, Flame, Check, Circle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import API from '../api/axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CheckProgressPage() {
  const { isDark, themeClasses } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

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
            <motion.section variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {routineStats.map((stat) => (
                <motion.div key={stat.label} variants={itemVariants} whileHover={{ scale: 1.05 }} className={`${themeClasses.cardStatic} border rounded-2xl p-5 flex flex-col items-center shadow group transition-shadow hover:shadow-xl`}>
                  <div className={`rounded-full p-2 mb-3 text-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div className="text-3xl font-bold leading-none mb-1">{stat.value}</div>
                  <div className="text-xs font-medium uppercase tracking-wider text-center">{stat.label}</div>
                </motion.div>
              ))}
            </motion.section>

            {/* Weekly Chart */}
            <section className={`${themeClasses.cardStatic} border rounded-3xl p-8 mb-12`}>
              <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Check className={`${themeClasses.accent} w-7 h-7`} />
                Weekly Routine Completion
              </h4>
              <div className="h-64 w-full">
                {weeklyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} domain={[0, 100]} />
                      <CartesianGrid vertical={false} strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e2e8f0'} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: isDark ? '#1e293b' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#f43f5e', fontWeight: 'bold' }}
                        formatter={(value) => [`${value}%`, 'Completed']}
                      />
                      <Area type="monotone" dataKey="percent" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorPercent)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className={`text-center ${themeClasses.muted}`}>Start completing routines to see your weekly progress!</p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
