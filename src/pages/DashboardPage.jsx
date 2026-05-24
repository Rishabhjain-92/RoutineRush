import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Flame, ListCheck, Calendar, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import SideBar from '../components/Sidebar/SideBar';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  const { isDark, themeClasses } = useTheme();
  const { user } = useAuth();
  const [routines, setRoutines] = useState([]);
  const [stats, setStats] = useState({ todayCompleted: 0, currentStreak: 0, totalRoutines: 0, points: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (!routines.length) return;
    
    const intervalId = setInterval(() => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      routines.forEach((routine) => {
        routine.tasks.forEach((task) => {
          if (!task.completed && task.time === currentTime) {
            const notifyKey = `notify_${task._id}_${now.toDateString()}`;
            if (!localStorage.getItem(notifyKey)) {
              if (Notification.permission === 'granted') {
                new Notification('RoutineRush Reminder 🔔', {
                  body: `Time to: ${task.name} (${routine.name})`,
                  icon: '/Preview.png'
                });
              }
              toast(`Time to: ${task.name} (${routine.name})`, { icon: '⏰', duration: 10000 });
              localStorage.setItem(notifyKey, 'true');
            }
          }
        });
      });
    }, 30000);

    return () => clearInterval(intervalId);
  }, [routines]);

  const fetchData = async () => {
    try {
      const [routinesRes, statsRes] = await Promise.all([
        API.get('/routines'),
        API.get('/progress/stats'),
      ]);
      setRoutines(routinesRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompleteRoutine = async (routineId) => {
    const routine = routines.find((r) => r._id === routineId);
    const allCompletedBefore = routine?.tasks.length > 0 && routine.tasks.every((t) => t.completed);
    if (allCompletedBefore) {
      toast.error('Once marked as completed, a routine cannot be unchecked today!');
      return;
    }
    try {
      const { data } = await API.put(`/routines/${routineId}/toggle-complete`);
      toast.success('Routine completed! 🏆 +50 Bonus Points!');
      fetchData();
    } catch (error) {
      console.error('Toggle complete routine error:', error);
      toast.error(error.response?.data?.message || 'Failed to update routine status');
    }
  };

  const getCompletionPercent = (routine) => {
    if (!routine.tasks || routine.tasks.length === 0) return 0;
    const completed = routine.tasks.filter((t) => t.completed).length;
    return Math.round((completed / routine.tasks.length) * 100);
  };

  return (
    <div className={`flex h-screen w-full overflow-hidden ${themeClasses.body} transition-all duration-700`}>
      <SideBar />

      <main className="flex-1 px-3 md:px-12 py-8 md:py-12 relative overflow-y-auto">
        {/* Greeting & Quick Stats */}
        <section className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fadeIn">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
              Welcome back, <span className={themeClasses.accent}>{user?.firstName || 'User'}!</span>
            </h2>
            <p className={`text-base md:text-lg ${themeClasses.muted}`}>
              Here's your progress and routines at a glance.
            </p>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full lg:w-auto">
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className={`${themeClasses.cardStatic} p-4 rounded-2xl border flex flex-col items-center min-w-[100px]`}>
              <ListCheck className="w-5 h-5 text-green-400 mb-1" />
              <span className="text-xs font-medium mb-1">Tasks Today</span>
              <span className="font-extrabold text-xl text-green-400">{stats.todayCompleted}</span>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className={`${themeClasses.cardStatic} p-4 rounded-2xl border flex flex-col items-center min-w-[100px]`}>
              <Flame className="w-5 h-5 text-orange-400 mb-1" />
              <span className="text-xs font-medium mb-1">Streak</span>
              <span className="font-extrabold text-xl text-orange-400">{stats.currentStreak} days</span>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className={`${themeClasses.cardStatic} p-4 rounded-2xl border flex flex-col items-center min-w-[100px]`}>
              <Trophy className="w-5 h-5 text-yellow-400 mb-1" />
              <span className="text-xs font-medium mb-1">Points</span>
              <span className="font-extrabold text-xl text-yellow-400">{stats.points} pts</span>
            </motion.div>
            <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} className={`${themeClasses.cardStatic} p-4 rounded-2xl border flex flex-col items-center min-w-[100px]`}>
              <Calendar className="w-5 h-5 text-blue-400 mb-1" />
              <span className="text-xs font-medium mb-1">Routines</span>
              <span className="font-extrabold text-xl text-blue-400">{stats.totalRoutines}</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Routines Section */}
        <section>
          <div className="flex items-center justify-between mb-7">
            <h3 className="text-2xl font-bold">Your Routines</h3>
            <Link
              to="/routine"
              className="flex items-center gap-2 px-5 py-2 rounded-xl shadow bg-gradient-to-r from-rose-500 to-orange-500 transition-all text-white font-semibold hover:scale-105 hover:shadow-2xl"
            >
              <Plus className="w-5 h-5" /> Add Routine
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : routines.length === 0 ? (
            <div className={`${themeClasses.cardStatic} border rounded-3xl p-12 text-center`}>
              <div className="text-6xl mb-4">🎯</div>
              <h4 className="text-xl font-bold mb-2">No routines yet!</h4>
              <p className={`${themeClasses.muted} mb-6`}>Create your first routine to start building better habits.</p>
              <Link
                to="/routine"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-semibold hover:scale-105 transition-all"
              >
                <Plus className="w-5 h-5" /> Create Routine
              </Link>
            </div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-2 gap-6">
              {routines.slice(0, 4).map((routine) => {
                const isAllDone = routine.tasks.length > 0 && routine.tasks.every((t) => t.completed);
                return (
                  <motion.div key={routine._id} variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/routine"
                      className={`flex flex-col h-full ${themeClasses.cardStatic} border rounded-3xl p-6 gap-4 group transition-shadow hover:shadow-xl`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-bold">{routine.name}</h4>
                        <span className="px-3 py-1 rounded-lg bg-gradient-to-br from-rose-500/20 to-orange-500/20 text-rose-500 text-xs font-bold uppercase tracking-wider">
                          {routine.category || 'General'}
                        </span>
                      </div>
                      <ul className="text-sm pl-2 space-y-1.5 flex-1">
                        {routine.tasks.slice(0, 3).map((task) => (
                          <li key={task._id} className={`list-none flex items-center gap-2 ${task.completed ? 'line-through text-green-400' : themeClasses.muted}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${task.completed ? 'bg-green-400' : 'bg-rose-400'} flex-shrink-0`}></span>
                            <span className="truncate pr-2">{task.name}</span>
                            {task.time && (
                              <span className="text-xs text-rose-400 font-bold ml-auto flex items-center gap-0.5 flex-shrink-0">
                                🕒 {task.time}
                              </span>
                            )}
                          </li>
                        ))}
                        {routine.tasks.length > 3 && (
                          <li className={`${themeClasses.muted} list-none pl-3.5`}>+{routine.tasks.length - 3} more</li>
                        )}
                      </ul>
                      <div className="flex items-center mt-auto">
                        <div className="w-full h-3 bg-gray-200/20 rounded-full overflow-hidden">
                          <div
                            className="h-3 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-500"
                            style={{ width: `${getCompletionPercent(routine)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs ml-3 font-semibold">{getCompletionPercent(routine)}%</span>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                        <div className="flex gap-3 text-xs">
                          <span className="text-green-400">🔥 Streak: {routine.streak}d</span>
                          <span className={themeClasses.muted}>Best: {routine.longestStreak}d</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleToggleCompleteRoutine(routine._id);
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all hover:scale-105 ${
                            isAllDone
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20'
                          }`}
                        >
                          {isAllDone ? '✓ Reset' : '✓ Mark Done'}
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </section>

        <style>{`
          .animate-fadeIn { animation: fadeIn 0.8s ease-out both; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        `}</style>
      </main>
    </div>
  );
}
