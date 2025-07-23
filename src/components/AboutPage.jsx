import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

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
    muted: isDark ? 'text-slate-300' : 'text-slate-600',
  };

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${themeClasses.body}`}
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
      }}
    >
      <Navbar isDark={isDark} toggleTheme={toggleTheme} themeClasses={themeClasses} />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden text-center max-w-4xl mx-auto pt-36 pb-20 px-6"
        style={{ minHeight: '75vh' }}
      >
        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent animate-fadeInUp">
          About RoutineRush
        </h1>
        <p className={`${themeClasses.muted} text-xl mb-12 animate-fadeInUp`}>
          RoutineRush is your all-in-one productivity hub, empowering people to build habits, set goals, and track progress in a vibrant and engaging environment.
        </p>

        <div className={`${themeClasses.card} rounded-3xl shadow-2xl p-10 border animate-fadeInUp`}>
          <h2 className={`${themeClasses.accent} text-3xl font-bold mb-6`}>Our Mission</h2>
          <p className={`${themeClasses.muted} mb-6`}>
            We believe in helping everyone unlock their best selves by making daily routines
            accessible, motivating, and enjoyable. Through beautiful design and smart features,
            we help you take control of your day and achieve what matters most.
          </p>

          <h2 className={`${themeClasses.accent} text-3xl font-bold mb-4`}>Key Features</h2>
          <ul className="text-left list-disc list-inside space-y-2 text-lg">
            <li>
              🌟 Powerful <span className="font-semibold">Routine Builder</span> for effortless planning
            </li>
            <li>
              🔥 <span className="font-semibold">Streak Tracker</span> to maintain your momentum
            </li>
            <li>
              📊 Interactive <span className="font-semibold">Progress Charts</span> for tracking achievements
            </li>
            <li>
              🎨 Dynamic <span className="font-semibold">dark/light themes</span> for comfortable viewing
            </li>
          </ul>
        </div>

        <p className={`${themeClasses.muted} mt-12 text-lg animate-fadeInUp`}>
          Discover how RoutineRush can transform your productivity journey, one habit at a time!
        </p>
      </section>

      <Footer isDark={isDark} themeClasses={themeClasses} />
    </div>
  );
};

export default AboutPage;
