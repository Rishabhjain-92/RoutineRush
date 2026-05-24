import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';

const AboutPage = () => {
  const { isDark, themeClasses } = useTheme();

  return (
    <div
      className={`min-h-screen transition-all duration-700 ${themeClasses.body}`}
      style={{ margin: 0, padding: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}
    >
      <Navbar />

      <section className="relative overflow-hidden text-center max-w-4xl mx-auto pt-36 pb-20 px-6" style={{ minHeight: '75vh' }}>
        <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent animate-fadeInUp">
          About RoutineRush
        </h1>
        <p className={`${themeClasses.muted} text-xl mb-12 animate-fadeInUp`}>
          RoutineRush is your all-in-one productivity hub, empowering people to build habits, set goals, and track progress in a vibrant and engaging environment.
        </p>

        <div className={`${themeClasses.card} rounded-3xl shadow-2xl p-10 border animate-fadeInUp`}>
          <h2 className={`${themeClasses.accent} text-3xl font-bold mb-6`}>Our Mission</h2>
          <p className={`${themeClasses.muted} mb-6`}>
            We believe in helping everyone unlock their best selves by making daily routines accessible, motivating, and enjoyable. Through beautiful design and smart features, we help you take control of your day and achieve what matters most.
          </p>

          <h2 className={`${themeClasses.accent} text-3xl font-bold mb-4`}>Key Features</h2>
          <ul className="text-left list-disc list-inside space-y-2 text-lg">
            <li>🌟 Powerful <span className="font-semibold">Routine Builder</span> for effortless planning</li>
            <li>🔥 <span className="font-semibold">Streak Tracker</span> to maintain your momentum</li>
            <li>📊 Interactive <span className="font-semibold">Progress Charts</span> for tracking achievements</li>
            <li>🎨 Dynamic <span className="font-semibold">dark/light themes</span> for comfortable viewing</li>
          </ul>
        </div>

        <p className={`${themeClasses.muted} mt-12 text-lg animate-fadeInUp`}>
          Discover how RoutineRush can transform your productivity journey, one habit at a time!
        </p>
      </section>

      <Footer />

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 1s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default AboutPage;
