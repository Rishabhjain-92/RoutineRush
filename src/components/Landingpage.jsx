import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Calendar, Target, BarChart3, ArrowRight, Instagram, Mail, Github, Linkedin } from 'lucide-react';

const LandingPage = () => {
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
    muted: isDark ? 'text-slate-300' : 'text-slate-600'
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClasses.body}`} style={{ margin: 0, padding: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
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
            {[
              { name: 'Home', path: '/' },
           
              { name: 'About', path: '/about' },
              { name: 'Contact', path: '/contact' }
            ].map((item) => (
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
                    className={`${themeClasses.muted} hover:${themeClasses.accent} transition-all duration-300 relative group font-medium`}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden" id="home" style={{ width: '100%', paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        {/* Animated background glow */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-blue-500/20' : 'bg-indigo-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 ${isDark ? 'bg-purple-500/20' : 'bg-purple-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
          <div className="space-y-8 animate-fadeInUp">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight group">
              <span className="inline-block transition-all duration-500 hover:scale-105 hover:rotate-1">Achieve goals.</span>
              <br />
              <span className="bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent animate-pulse inline-block transition-all duration-500 hover:scale-105 hover:-rotate-1">
                Track progress.
              </span>
              <br />
              <span className="inline-block transition-all duration-500 hover:scale-105 hover:rotate-1">Win the day.</span>
            </h1>
            <p className={`text-xl ${themeClasses.muted} leading-relaxed max-w-lg animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
              RoutineRush is your all-in-one productivity hub, designed to help you build lasting habits, set meaningful goals, and monitor your progress every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link to="/signup" className="group px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden hover:-rotate-1 inline-block text-center">
                <span className="relative z-10">Sign Up Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-white/20 animate-ping"></div>
                </div>
              </Link>
              <button className={`group px-8 py-4 ${themeClasses.card} backdrop-blur-sm rounded-2xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl border hover:rotate-1`}>
                Try Demo
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
              </button>
            </div>
          </div>

          <div className="relative flex justify-center animate-fadeInRight">
            <div className="relative">
              {/* Floating rings around main element */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className={`absolute top-0 left-1/2 w-4 h-4 ${isDark ? 'bg-blue-400' : 'bg-indigo-500'} rounded-full transform -translate-x-1/2 -translate-y-8`}></div>
                <div className={`absolute bottom-0 left-1/2 w-4 h-4 ${isDark ? 'bg-purple-400' : 'bg-purple-500'} rounded-full transform -translate-x-1/2 translate-y-8`}></div>
                <div className={`absolute left-0 top-1/2 w-4 h-4 ${isDark ? 'bg-green-400' : 'bg-emerald-500'} rounded-full transform -translate-x-8 -translate-y-1/2`}></div>
                <div className={`absolute right-0 top-1/2 w-4 h-4 ${isDark ? 'bg-yellow-400' : 'bg-yellow-500'} rounded-full transform translate-x-8 -translate-y-1/2`}></div>
              </div>
              
              <div 
                className="w-80 h-96 bg-gradient-to-br from-rose-500 via-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-2xl hover:shadow-rose-500/25 transition-all duration-500 hover:scale-105 hover:rotate-2 relative overflow-hidden group"
                style={{
                  transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * 0.02}deg)`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="text-8xl animate-bounce group-hover:scale-110 transition-transform duration-300 relative z-10">🏆</div>
                <div className="absolute inset-0 border-4 border-white/30 rounded-3xl animate-pulse"></div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl animate-spin hover:animate-pulse transition-all duration-300" style={{animationDuration: '10s'}}></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse hover:animate-bounce transition-all duration-300"></div>
              <div className="absolute top-1/2 -left-8 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden" id="features" style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        {/* Background animation elements */}
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute top-0 left-1/3 w-64 h-64 ${isDark ? 'bg-rose-500/20' : 'bg-rose-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '8s' }}></div>
          <div className={`absolute bottom-0 right-1/3 w-48 h-48 ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '3s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20 animate-fadeInUp">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 group">
              <span className="inline-block transition-all duration-500 hover:scale-105 hover:rotate-1 bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                Core Features
              </span>
            </h2>
            <p className={`text-xl ${themeClasses.muted} max-w-2xl mx-auto animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
              RoutineRush offers a suite of powerful tools to help you stay focused and achieve your goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Routine Builder',
                description: 'Create and customize your daily routines with ease. Set reminders and track your progress to build consistent habits.',
                gradient: 'from-rose-500 to-orange-500'
              },
              {
                icon: Target,
                title: 'Streak Tracker',
                description: 'Stay motivated by tracking your streaks and celebrating your achievements. Never miss a day with visual reminders.',
                gradient: 'from-emerald-500 to-teal-500'
              },
              {
                icon: BarChart3,
                title: 'Progress Charts',
                description: 'Visualize your progress with interactive charts and graphs. Monitor your performance and identify areas for improvement.',
                gradient: 'from-blue-500 to-cyan-500'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className={`group ${themeClasses.card} backdrop-blur-xl rounded-3xl p-8 transition-all duration-700 hover:scale-105 hover:-translate-y-6 hover:rotate-1 border relative overflow-hidden animate-fadeInUp`}
                  style={{
                    animationDelay: `${index * 0.2 + 0.4}s`
                  }}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10`}></div>
                    <div className={`absolute -inset-4 bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:animate-pulse`}></div>
                  </div>

                  {/* Floating particles around card */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full animate-ping`}
                        style={{
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>
                  
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700 group-hover:shadow-2xl`}>
                    <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-all duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-rose-500 group-hover:to-orange-500 transition-all duration-500 relative z-10">
                    {feature.title}
                  </h3>
                  
                  <p className={`${themeClasses.muted} leading-relaxed relative z-10 group-hover:text-opacity-90 transition-all duration-300`}>
                    {feature.description}
                  </p>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} p-0.5`}>
                      <div className={`w-full h-full rounded-3xl ${themeClasses.body}`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden" style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        {/* Animated background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-1/2 left-1/2 w-96 h-96 ${isDark ? 'bg-gradient-to-r from-rose-500/20 to-orange-500/20' : 'bg-gradient-to-r from-rose-400/30 to-orange-400/30'} rounded-full blur-3xl animate-spin`} style={{ animationDuration: '15s' }}></div>
          <div className={`absolute top-0 right-0 w-64 h-64 ${isDark ? 'bg-blue-500/20' : 'bg-blue-400/30'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }}></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className={`${themeClasses.card} backdrop-blur-xl rounded-3xl p-12 border relative overflow-hidden group hover:scale-105 transition-all duration-700 animate-fadeInUp`}>
            {/* Rotating border animation */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 rounded-3xl animate-spin" style={{ animationDuration: '3s' }}>
                <div className={`absolute inset-1 ${themeClasses.body} rounded-3xl`}></div>
              </div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full animate-ping"
                  style={{
                    top: `${10 + Math.random() * 80}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${1.5 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-black mb-6 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-rose-500 group-hover:to-orange-500 transition-all duration-500">
                Ready to take control of your day?
              </h2>
              <p className={`text-xl ${themeClasses.muted} mb-10 max-w-2xl mx-auto group-hover:scale-105 transition-all duration-300`}>
                Join thousands of users who are achieving their goals with RoutineRush.
              </p>
              <Link to="/signup" className="group/btn px-12 py-6 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-2xl font-bold text-xl transition-all duration-700 hover:scale-125 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden hover:rotate-2 inline-block">
                <span className="relative z-10 group-hover/btn:scale-110 transition-transform duration-300">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700"></div>
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
                
                {/* Button particles */}
                <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${1 + Math.random()}s`
                      }}
                    />
                  ))}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDark ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-xl border-t ${isDark ? 'border-slate-700' : 'border-indigo-200'}`} id="contact" style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center relative overflow-hidden">
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
            <p className={`${themeClasses.muted} leading-relaxed`}>
              Empowering people to explore productivity affordably. Discover amazing features, save time, and create unforgettable achievements.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/rishabh_jain921', target:"_blank", color: 'hover:text-pink-500', hoverBg: 'hover:bg-pink-500/10' },
                { icon: Github, href: 'https://github.com/Rishabhjain-92', target:"_blank", color: isDark ? 'hover:text-gray-300' : 'hover:text-gray-800', hoverBg: 'hover:bg-gray-500/10' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/rishabh-jain-296235291', target:"_blank", color: 'hover:text-blue-700', hoverBg: 'hover:bg-blue-500/10' },
                { icon: Mail, href: 'mailto:rishabhjain92148@gmail.com', target:"_blank", color: 'hover:text-red-500', hoverBg: 'hover:bg-red-500/10' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-3 ${themeClasses.card} backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-125 hover:-translate-y-2 hover:rotate-6 border ${social.color} ${social.hoverBg} group`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
                  </a>
                );
              })}
            </div>
          </div>

          {[
            {
              title: 'Quick Links',
              links: ['Home', 'Features', 'About', 'Contact']
            },
            {
              title: 'Legal',
              links: ['Terms', 'Privacy', 'Cookies', 'Community']
            },
            {
              title: 'Stay Updated',
              links: [],
              isNewsletter: true
            }
          ].map((section, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-bold">{section.title}</h4>
              {section.isNewsletter ? (
                <div className="space-y-4">
                  <p className={`${themeClasses.muted} text-sm`}>
                    Get the latest productivity tips and features delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className={`flex-1 px-4 py-3 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white border-indigo-200 text-slate-800 placeholder-slate-500'} border rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50`}
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/25 flex items-center justify-center group">
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              ) : (
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      {link === 'Contact' ? (
                        <Link 
                          to="/contact"
                          className={`${themeClasses.muted} hover:${themeClasses.accent} transition-colors duration-300`}
                        >
                          {link}
                        </Link>
                      ) : (
                        <a 
                          href={`#${link.toLowerCase()}`} 
                          className={`${themeClasses.muted} hover:${themeClasses.accent} transition-colors duration-300`}
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className={`mt-16 pt-8 border-t ${isDark ? 'border-slate-700' : 'border-indigo-200'} text-center`}>
          <p className={`${themeClasses.muted}`}>
            © 2025 RoutineRush. All rights reserved. Made with ❤️ for productivity
          </p>
        </div>
      </footer>

      {/* Custom CSS for animations */}
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
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-fadeInRight {
          animation: fadeInRight 1s ease-out 0.6s forwards;
          opacity: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-text h1 {
            font-size: 2.5rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .nav-links {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;