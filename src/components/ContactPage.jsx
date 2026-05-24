import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Clock, MapPin, Instagram, Mail, Github, Linkedin, Phone, Send, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const { isDark, themeClasses } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
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
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success('Message sent successfully! We\'ll get back to you soon. 📬');
      }, 1500);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClasses.body}`} style={{ margin: 0, padding: 0, width: '100%', maxWidth: '100%', overflowX: 'hidden' }}>
      <Navbar />

      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`absolute w-1 h-1 rounded-full ${isDark ? 'bg-blue-400/30' : 'bg-indigo-400/40'} animate-pulse`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s`, animationDuration: `${3 + Math.random() * 4}s` }} />
        ))}
      </div>

      <div className="relative" style={{ width: '100%', paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        {/* Hero */}
        <section className="text-center mb-20 relative z-10">
          <h1 className="text-5xl lg:text-7xl font-black mb-6">
            <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent inline-block">Get In Touch</span>
          </h1>
          <p className={`text-xl ${themeClasses.muted} max-w-3xl mx-auto leading-relaxed`}>
            Connect with us through any of these platforms. We're always excited to discuss new opportunities.
          </p>
        </section>

        {/* Contact Cards */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Phone, title: 'Phone', content: '+91 9214805770', description: 'Available during business hours.', gradient: 'from-green-500 to-emerald-600' },
              { icon: MapPin, title: 'Location', content: 'Jaipur, Rajasthan, India', description: 'Based in the Pink City, open to remote collaborations.', gradient: 'from-red-500 to-rose-600' },
              { icon: Mail, title: 'Email', content: 'rishabhjain92148@gmail.com', description: 'We usually respond within 24 hours.', gradient: 'from-blue-500 to-blue-600' },
            ].map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.title} className={`bg-gradient-to-br ${contact.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-105 transition-all duration-500`}>
                  <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-all" />
                  <h3 className="text-2xl font-bold mb-3">{contact.title}</h3>
                  <p className="text-xl font-semibold mb-2">{contact.content}</p>
                  <p className="text-white/80">{contact.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Social Links */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { icon: Instagram, title: 'Instagram', href: 'https://www.instagram.com/rishabh_jain921', gradient: 'from-purple-500 to-pink-600' },
              { icon: Linkedin, title: 'LinkedIn', href: 'https://www.linkedin.com/in/rishabh-jain-296235291', gradient: 'from-blue-600 to-blue-700' },
              { icon: Github, title: 'GitHub', href: 'https://github.com/Rishabhjain-92', gradient: 'from-gray-700 to-gray-800' },
            ].map((social) => {
              const Icon = social.icon;
              return (
                <a key={social.title} href={social.href} target="_blank" rel="noopener noreferrer" className={`bg-gradient-to-br ${social.gradient} rounded-3xl p-8 text-white relative overflow-hidden group hover:scale-105 transition-all duration-500 block`}>
                  <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-all" />
                  <h3 className="text-2xl font-bold mb-3">{social.title}</h3>
                  <p className="text-white/80">Follow us on {social.title}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-4">Send us a message</h2>
            <p className={`text-lg ${themeClasses.muted}`}>Have a question? Fill out the form below.</p>
          </div>
          <div className={`${themeClasses.cardStatic} backdrop-blur-xl rounded-3xl p-8 border`}>
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50`} placeholder="Your name" />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50`} placeholder="your@email.com" />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50`} placeholder="What's this about?" />
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6} className={`w-full px-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 resize-none`} placeholder="Tell us more..." />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={isLoading} className="group w-full px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden disabled:opacity-50">
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>Sending...</>) : (<>Send Message<Send className="ml-2 w-5 h-5 transition-all duration-300 group-hover:translate-x-2" /></>)}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
