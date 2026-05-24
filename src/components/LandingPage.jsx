import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Target, BarChart3, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const { isDark, themeClasses } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${themeClasses.body}`}
      style={{ margin: 0, padding: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}
    >
      <Navbar />

      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-blue-400/30' : 'bg-indigo-400/40'} animate-pulse`}
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 left-10 w-20 h-20 ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-indigo-400/20 to-purple-400/20'} rotate-45 animate-bounce`} style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className={`absolute top-40 right-20 w-16 h-16 ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-pink-400/20 to-rose-400/20'} rounded-full animate-pulse`} style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className={`absolute bottom-40 left-1/4 w-12 h-12 ${isDark ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10' : 'bg-gradient-to-br from-emerald-400/20 to-teal-400/20'} rotate-12 animate-spin`} style={{ animationDuration: '20s' }} />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden" id="home" style={{ width: '100%', paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-blue-500/20' : 'bg-indigo-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${isDark ? 'bg-purple-500/20' : 'bg-purple-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          <div className="space-y-8 animate-fadeInUp">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="inline-block transition-all duration-500 hover:scale-105">Achieve goals.</span>
              <br />
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse inline-block transition-all duration-500 hover:scale-105">
                Track progress.
              </span>
              <br />
              <span className="inline-block transition-all duration-500 hover:scale-105">Win the day.</span>
            </h1>
            <p className={`text-xl ${themeClasses.muted} leading-relaxed max-w-lg`}>
              RoutineRush is your all-in-one productivity hub, designed to help you build lasting habits, set meaningful goals, and monitor your progress every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/signup')}
                className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden inline-block text-center"
              >
                <span className="relative z-10">Sign Up Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
              <button
                onClick={() => navigate('/login')}
                className={`group px-8 py-4 ${themeClasses.card} backdrop-blur-sm rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl border`}
              >
                Log In
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-all duration-300 group-hover:translate-x-2" />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className={`absolute top-0 left-1/2 w-4 h-4 ${isDark ? 'bg-blue-400' : 'bg-indigo-500'} rounded-full transform -translate-x-1/2 -translate-y-8`}></div>
                <div className={`absolute bottom-0 left-1/2 w-4 h-4 ${isDark ? 'bg-purple-400' : 'bg-purple-500'} rounded-full transform -translate-x-1/2 translate-y-8`}></div>
                <div className={`absolute left-0 top-1/2 w-4 h-4 ${isDark ? 'bg-green-400' : 'bg-emerald-500'} rounded-full transform -translate-x-8 -translate-y-1/2`}></div>
                <div className={`absolute right-0 top-1/2 w-4 h-4 ${isDark ? 'bg-yellow-400' : 'bg-yellow-500'} rounded-full transform translate-x-8 -translate-y-1/2`}></div>
              </div>
              <div
                className="w-80 h-96 bg-gradient-to-br from-rose-500 via-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-rose-500/25 transition-all duration-500 hover:scale-105 relative overflow-hidden group"
                style={{ transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * 0.02}deg)` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-8xl animate-bounce group-hover:scale-110 transition-transform duration-300 relative z-10">🏆</div>
                <div className="absolute inset-0 border-4 border-white/30 rounded-3xl animate-pulse"></div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl animate-spin" style={{ animationDuration: '10s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden" id="features" style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black mb-6">
              <span className="inline-block bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Core Features</span>
            </h2>
            <p className={`text-xl ${themeClasses.muted} max-w-2xl mx-auto`}>
              RoutineRush offers a suite of powerful tools to help you stay focused and achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: 'Routine Builder', description: 'Create and customize your daily routines with ease. Set reminders and track your progress to build consistent habits.', gradient: 'from-rose-500 to-orange-500' },
              { icon: Target, title: 'Streak Tracker', description: 'Stay motivated by tracking your streaks and celebrating your achievements. Never miss a day with visual reminders.', gradient: 'from-emerald-500 to-teal-500' },
              { icon: BarChart3, title: 'Progress Charts', description: 'Visualize your progress with interactive charts and graphs. Monitor your performance and identify areas for improvement.', gradient: 'from-blue-500 to-cyan-500' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className={`group ${themeClasses.card} backdrop-blur-xl rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:-translate-y-4 border relative overflow-hidden`}>
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-rose-500 group-hover:to-orange-500 transition-all duration-500">
                    {feature.title}
                  </h3>
                  <p className={`${themeClasses.muted} leading-relaxed`}>{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className={`${themeClasses.card} backdrop-blur-xl rounded-3xl p-12 border relative overflow-hidden group hover:scale-105 transition-all duration-700`}>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black mb-6">Ready to take control of your day?</h2>
              <p className={`text-xl ${themeClasses.muted} mb-10 max-w-2xl mx-auto`}>
                Join thousands of users who are achieving their goals with RoutineRush.
              </p>
              <button
                onClick={() => navigate('/signup')}
                className="group/btn px-12 py-6 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl font-bold text-xl transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden inline-block"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default LandingPage;
