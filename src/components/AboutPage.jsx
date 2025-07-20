import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const AboutPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark((d) => !d);

  const themeClasses = {
    body: isDark 
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800',
    header: isDark 
      ? 'bg-slate-900/95 border-blue-500/10' 
      : 'bg-white/95 border-indigo-200/50',
    card: isDark 
      ? 'bg-white/5 border-white/10 hover:border-blue-500/30' 
      : 'bg-white/80 border-indigo-200/30 hover:border-indigo-400/50',
    button: isDark 
      ? 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500' 
      : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600',
    accent: isDark ? 'text-blue-400' : 'text-indigo-600',
    muted: isDark ? 'text-slate-300' : 'text-slate-600'
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClasses.body}`} style={{ margin: 0, padding: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-blue-400/30' : 'bg-indigo-400/40'} animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Floating Geometric Shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-20 left-10 w-20 h-20 ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-indigo-400/20 to-purple-400/20'} rotate-45 animate-bounce`} style={{animationDelay: '0s', animationDuration: '6s'}} />
        <div className={`absolute top-40 right-20 w-16 h-16 ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-pink-400/20 to-rose-400/20'} rounded-full animate-pulse`} style={{animationDelay: '2s', animationDuration: '4s'}} />
        <div className={`absolute bottom-40 left-1/4 w-12 h-12 ${isDark ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10' : 'bg-gradient-to-br from-emerald-400/20 to-teal-400/20'} rotate-12 animate-spin`} style={{animationDuration: '20s'}} />
      </div>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${themeClasses.header} backdrop-blur-xl border-b`} style={{ width: '100%', margin: 0, padding: 0 }}>
        <nav className="flex justify-between items-center py-4 px-4 max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center relative overflow-hidden animate-pulse">
              {/* Calendar Icon */}
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
                <rect x="7" y="12" width="2" height="2" fill="currentColor"/>
                <rect x="11" y="12" width="2" height="2" fill="currentColor"/>
                <rect x="15" y="12" width="2" height="2" fill="currentColor"/>
                <rect x="7" y="16" width="2" height="2" fill="currentColor"/>
                <rect x="11" y="16" width="2" height="2" fill="currentColor"/>
                <rect x="15" y="16" width="2" height="2" fill="currentColor"/>
              </svg>
              {/* Clock overlay */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                <svg className="w-2 h-2 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
              RoutineRush
            </span>
          </Link>
          <ul className="hidden md:flex space-x-8">
            {navLinks.map((item) => (
              <li key={item.name}>
                {item.path.startsWith('#') ? (
                  <a
                    href={item.path}
                    className={`${themeClasses.muted} hover:${themeClasses.accent} transition-all duration-300 relative group font-medium`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={`${themeClasses.muted} hover:${themeClasses.accent} transition-all duration-300 relative group font-medium${location.pathname === item.path ? ' font-bold' : ''}`}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${themeClasses.card} backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:rotate-12`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
            <Link to="/login" className={`px-4 py-2 ${isDark ? 'border-slate-600 text-slate-300 hover:border-blue-500' : 'border-indigo-300 text-indigo-600 hover:border-indigo-500'} border rounded-xl transition-all duration-300 hover:scale-105`}>
              Log In
            </Link>
            <Link to="/signup" className={`px-6 py-2 ${themeClasses.button} rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Animated Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 pt-40 pb-20 min-h-[60vh] max-w-4xl mx-auto relative z-10 animate-fadeInUp">
        <h1 className="text-5xl font-black mb-6 bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent animate-fadeInRight">
          About RoutineRush
        </h1>
        <p className={`${themeClasses.muted} mb-10 text-xl animate-fadeInRight`} style={{ animationDelay: '0.1s' }}>
          RoutineRush is your all-in-one productivity hub, empowering people to build habits, set goals, and track progress in a vibrant and engaging environment.
        </p>
        <div className={`${themeClasses.card} rounded-3xl shadow-2xl p-8 my-8 w-full border animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
          <h2 className={`${themeClasses.accent} text-2xl font-bold mb-4 animate-fadeInRight`}>Our Mission</h2>
          <p className={`${themeClasses.muted} mb-4 animate-fadeInRight`} style={{ animationDelay: '0.3s' }}>
            We believe in helping everyone unlock their best selves by making daily routines accessible, motivating, and enjoyable. Through beautiful design and smart features, we help you take control of your day and achieve what matters most.
          </p>
          <h2 className={`${themeClasses.accent} text-2xl font-bold mb-4 animate-fadeInRight`} style={{ animationDelay: '0.4s' }}>
            Key Features
          </h2>
          <ul className="space-y-2 text-left pl-5 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <li>🌟 Powerful <span className="font-semibold">Routine Builder</span> for effortless planning</li>
            <li>🔥 <span className="font-semibold">Streak Tracker</span> to maintain your momentum</li>
            <li>📊 Interactive <span className="font-semibold">Progress Charts</span> for tracking achievements</li>
            <li>🎨 Dynamic <span className="font-semibold">dark/light themes</span> for comfortable viewing</li>
          </ul>
        </div>
        <div className={`${themeClasses.muted} mt-10 text-lg animate-fadeInRight`} style={{ animationDelay: '0.6s' }}>
          Discover how RoutineRush can transform your productivity journey, one habit at a time!
        </div>
      </main>

      {/* Footer */}
      <footer className={`${themeClasses.muted} py-8 border-t border-white/20 text-center`}>
        © 2025 RoutineRush. All rights reserved.
      </footer>

      {/* Animations CSS */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
