import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Clock,
  MapPin,
  Instagram,
  Mail,
  Github,
  Linkedin,
  Phone,
  Send,
} from 'lucide-react';

const ContactPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
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
    muted: isDark ? 'text-slate-300' : 'text-slate-600',
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
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
        // Simulating sending the form
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 2000);
    }
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

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-blue-400/30' : 'bg-indigo-400/40'} animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className={`absolute top-20 left-10 w-20 h-20 ${isDark ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10' : 'bg-gradient-to-br from-indigo-400/20 to-purple-400/20'} rotate-45 animate-bounce`} style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className={`absolute top-40 right-20 w-16 h-16 ${isDark ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10' : 'bg-gradient-to-br from-pink-400/20 to-rose-400/20'} rounded-full animate-pulse`} style={{ animationDelay: '2s', animationDuration: '4s' }} />
        <div className={`absolute bottom-40 left-1/4 w-12 h-12 ${isDark ? 'bg-gradient-to-br from-green-500/10 to-teal-500/10' : 'bg-gradient-to-br from-emerald-400/20 to-teal-400/20'} rotate-12 animate-spin`} style={{ animationDuration: '20s' }} />
      </div>

      {/* Main content */}
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

        {/* Availability Section */}
        <section className="mb-20">
          <div className="text-center mb-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-3xl font-black mb-4 hover:scale-105 transition-transform duration-300">Availability</h2>
            <p className={`text-lg ${themeClasses.muted}`}>
              Here's when you can typically expect responses from us.
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
                ].map((schedule) => (
                  <div
                    key={schedule.day}
                    className="flex justify-between items-center py-3 border-b border-opacity-20 border-gray-500 hover:scale-102 transition-all duration-300 hover:bg-white/5 rounded-lg px-2"
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

        {/* Contact Methods - First Row of Cards */}
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
              },
              {
                icon: MapPin,
                title: 'Location',
                content: 'Jaipur, Rajasthan, India',
                description: 'Based in the Pink City of India, open to remote collaborations worldwide.',
                gradient: 'from-red-500 to-rose-600',
                textColor: 'text-red-100',
              },
              {
                icon: Instagram,
                title: 'Social Media',
                description: 'Follow us for updates, insights, and behind-the-scenes content.',
                content: (
                  <a
                    href="https://www.instagram.com/rishabh_jain921"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    See our Instagram
                  </a>
                ),
                gradient: 'from-purple-500 to-indigo-600',
                textColor: 'text-purple-100',
              },
            ].map((contact, idx) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.title}
                  className={`bg-gradient-to-br ${contact.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-110 hover:rotate-2 transition-all duration-700 animate-fadeInUp cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <Icon className="w-8 h-8 mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500" />
                    <h3 className="text-2xl font-bold mb-4 group-hover:scale-105 transition-transform duration-300">{contact.title}</h3>
                    {contact.content && (
                      <p className="text-xl font-semibold mb-2 group-hover:scale-105 transition-transform duration-300">{contact.content}</p>
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

        {/* Contact Cards - Second Row */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: (
                  <a href="mailto:rishabhjain92148@gmail.com" target="_blank" rel="noopener noreferrer" className="underline">
                    rishabhjain92148@gmail.com
                  </a>
                ),
                description: 'Drop us a line anytime. We usually respond within 24 hours.',
                gradient: 'from-blue-500 to-blue-600',
                textColor: 'text-blue-100',
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                content: (
                  <a href="https://www.linkedin.com/in/rishabh-jain-296235291" target="_blank" rel="noopener noreferrer" className="underline">
                    Connect with us on LinkedIn
                  </a>
                ),
                description: "Let's connect and expand our professional network together.",
                gradient: 'from-blue-600 to-blue-700',
                textColor: 'text-blue-100',
              },
              {
                icon: Github,
                title: 'GitHub',
                content: (
                  <a href="https://github.com/Rishabhjain-92" target="_blank" rel="noopener noreferrer" className="underline">
                    Check out our repositories
                  </a>
                ),
                description: 'Explore our open-source projects and contributions.',
                gradient: 'from-gray-700 to-gray-800',
                textColor: 'text-gray-100',
              },
            ].map((contact) => {
              const Icon = contact.icon;
              return (
                <div
                  key={contact.title}
                  className={`bg-gradient-to-br ${contact.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-110 hover:-rotate-2 transition-all duration-700 animate-fadeInUp cursor-pointer`}
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
          <div className="text-center mb-12 animate-fadeInUp">
            <h2 className="text-3xl font-black mb-4 hover:scale-105 transition-transform duration-300">Send us a message</h2>
            <p className={`text-lg ${themeClasses.muted}`}>
              Have a specific question? Fill out the form below and we'll get back to you soon.
            </p>
          </div>
          <div className={`${themeClasses.card} backdrop-blur-xl rounded-3xl p-8 border relative overflow-hidden group hover:scale-105 transition-all duration-500 animate-fadeInUp`}>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-yellow-500/5"></div>
            </div>
            <div className="relative z-10">
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
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
                  <div>
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
                <div>
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
                <div>
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
                  type="submit"
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
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer isDark={isDark} themeClasses={themeClasses} />
    </div>
  );
};

export default ContactPage;
