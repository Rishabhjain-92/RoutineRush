import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Clock, MapPin, Instagram, Mail, Github, Linkedin, Phone, Send, ArrowRight } from 'lucide-react';

const ContactPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  const themeClasses = {
    body: isDark 
      ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' 
      : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-slate-800',
    header: isDark 
      ? 'bg-slate-900/95 border-blue-500/10' 
      : 'bg-white/95 border-indigo-200/50',
    card: isDark 
      ? 'bg-white/5 border-white/10' 
      : 'bg-white/80 border-indigo-200/30',
    input: isDark 
      ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-rose-500/50' 
      : 'bg-white border-indigo-200 text-slate-800 placeholder-slate-500 focus:border-indigo-500/50',
    accent: isDark ? 'text-blue-400' : 'text-indigo-600',
    muted: isDark ? 'text-slate-300' : 'text-slate-600'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log('Contact form submitted:', formData);
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 2000);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClasses.body}`} style={{ margin: 0, padding: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      {/* Floating Shapes */}
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
                <Link 
                  to={item.path}
                  className={`${themeClasses.muted} hover:${themeClasses.accent} transition-all duration-300 relative group font-medium ${item.name === 'Contact' ? 'text-rose-500 font-bold' : ''}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
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
            <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative" style={{ width: '100%', paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        {/* Hero Section */}
        <section className="text-center mb-20 relative z-10">
          <h1 className="text-5xl lg:text-7xl font-black mb-6 animate-fadeInUp">
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-500">
              Get In Touch
            </span>
          </h1>
          <p className={`text-xl ${themeClasses.muted} max-w-3xl mx-auto leading-relaxed animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
            Connect with us through any of these platforms. We're always excited to discuss new opportunities and collaborations.
          </p>
        </section>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Availability Section */}
          <section className="mb-20">
            <div className="text-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-3xl font-black mb-4 hover:scale-105 transition-transform duration-300">Availability</h2>
              <p className={`text-lg ${themeClasses.muted}`}>
                Here's when you can typically expect responses from us
              </p>
            </div>

            <div className={`max-w-2xl mx-auto ${themeClasses.card} backdrop-blur-xl rounded-3xl p-8 border relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-fadeInUp`} style={{ animationDelay: '0.6s' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-yellow-500/5"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-rose-500 mr-3 animate-pulse" />
                  <h3 className="text-xl font-bold">Response Times</h3>
                </div>

                <div className="space-y-4">
                  {[
                    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM IST' },
                    { day: 'Saturday', time: '10:00 AM - 4:00 PM IST' },
                    { day: 'Sunday', time: 'Closed', isSpecial: true }
                  ].map((schedule, index) => (
                    <div 
                      key={schedule.day}
                      className="flex justify-between items-center py-3 border-b border-opacity-20 border-gray-500 hover:scale-102 transition-all duration-300 hover:bg-white/5 rounded-lg px-2"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="font-semibold">{schedule.day}</span>
                      <span className={schedule.isSpecial ? 'text-red-400' : themeClasses.muted}>
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className={`mt-6 p-4 ${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'} border-l-4 border-blue-500 rounded-r-xl hover:scale-105 transition-all duration-300`}>
                  <p className="text-sm">
                    <strong>Note:</strong> For urgent matters, please mention "URGENT" in your subject line. We'll do our best to respond as quickly as possible.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Methods */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Phone,
                  title: 'Phone',
                  content: '+91 9214805770',
                  description: 'Available during business hours for urgent matters.',
                  gradient: 'from-green-500 to-emerald-600',
                  textColor: 'text-green-100',
                  delay: '0.8s'
                },
                {
                  icon: MapPin,
                  title: 'Location',
                  content: 'Jaipur, Rajasthan, India',
                  description: 'Based in the Pink City of India, open to remote collaborations worldwide.',
                  gradient: 'from-red-500 to-rose-600',
                  textColor: 'text-red-100',
                  delay: '1.0s'
                },
                {
                  icon: Instagram,
                  title: 'Social Media',
                  content: null,
                  description: 'Follow us for updates, insights, and behind-the-scenes content.',
                  gradient: 'from-purple-500 to-indigo-600',
                  textColor: 'text-purple-100',
                  delay: '1.2s'
                }
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div 
                    key={contact.title}
                    className={`bg-gradient-to-br ${contact.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-110 hover:rotate-2 transition-all duration-700 animate-fadeInUp cursor-pointer`}
                    style={{ animationDelay: contact.delay }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative z-10">
                      <Icon className="w-8 h-8 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                      <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">{contact.title}</h3>
                      {contact.content && (
                        <p className="text-xl font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">{contact.content}</p>
                      )}
                      {contact.title === 'Social Media' && (
                        <div className="space-y-2 mb-2">
                        
                          <p className="flex items-center group-hover:translate-x-2 transition-transform duration-300">
                            <Instagram className="w-4 h-4 mr-2" /> <a href="https://www.instagram.com/rishabh_jain921" target="_blank">See our Instagram</a>
                          </p>
                        </div>
                      )}
                      <p className={`${contact.textColor} mt-2 group-hover:scale-105 transition-transform duration-300`}>
                        {contact.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact Cards */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  content: <a href="mailto:rishabhjain92148@gmail.com" target="_blank">rishabhjain92148@gmail.com</a>,
                  description: 'Drop us a line anytime. We usually respond within 24 hours.',
                  gradient: 'from-blue-500 to-blue-600',
                  textColor: 'text-blue-100',
                  delay: '1.4s'
                },
                {
                  icon: Linkedin,
                  title: 'LinkedIn',
                  content: <a href="https://www.linkedin.com/in/rishabh-jain-296235291" target="_blank">Connect with us on LinkedIn</a>,
                  description: "Let's connect and expand our professional network together.",
                  gradient: 'from-blue-600 to-blue-700',
                  textColor: 'text-blue-100',
                  delay: '1.6s'
                },
                {
                  icon: Github,
                  title: 'GitHub',
                  content: <a href="https://github.com/Rishabhjain-92" target="_blank">Check out our repositories</a>,
                  description: 'Explore our open-source projects and contributions.',
                  gradient: 'from-gray-700 to-gray-800',
                  textColor: 'text-gray-100',
                  delay: '1.8s'
                }
              ].map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <div 
                    key={contact.title}
                    className={`bg-gradient-to-br ${contact.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-110 hover:-rotate-2 transition-all duration-700 animate-fadeInUp cursor-pointer`}
                    style={{ animationDelay: contact.delay }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <Icon className="w-8 h-8 mb-4 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-500" />
                      <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">{contact.title}</h3>
                      <p className="text-xl font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">{contact.content}</p>
                      <p className={`${contact.textColor} group-hover:scale-105 transition-transform duration-300`}>{contact.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Contact Form */}
          <section className="max-w-2xl mx-auto">
            <div className="text-center mb-12 animate-fadeInUp" style={{ animationDelay: '2.0s' }}>
              <h2 className="text-3xl font-black mb-4 hover:scale-105 transition-transform duration-300">Send us a message</h2>
              <p className={`text-lg ${themeClasses.muted}`}>
                Have a specific question? Fill out the form below and we'll get back to you soon.
              </p>
            </div>

            <div className={`${themeClasses.card} backdrop-blur-xl rounded-3xl p-8 border relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-fadeInUp`} style={{ animationDelay: '2.2s' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-yellow-500/5"></div>
              </div>

              <div className="relative z-10">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-semibold mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:scale-105`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.name}</p>}
                    </div>
                    <div className="hover:scale-105 transition-transform duration-300">
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:scale-105`}
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-semibold mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:scale-105`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.subject}</p>}
                  </div>

                  <div className="hover:scale-105 transition-transform duration-300">
                    <label className="block text-sm font-semibold mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none focus:scale-105`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="text-red-500 text-sm mt-1 animate-pulse">{errors.message}</p>}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="group w-full px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold text-lg transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden disabled:opacity-50 hover:rotate-1"
                  >
                    <span className="relative z-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

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

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }

        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .grid-cols-3 {
            grid-template-columns: 1fr;
          }
          
          .text-5xl {
            font-size: 2.5rem;
          }
          
          .text-7xl {
            font-size: 3rem;
          }
          
          .px-8 {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .hover\\:scale-110:hover {
            transform: scale(1.05);
          }

          .hover\\:rotate-2:hover {
            transform: rotate(1deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;