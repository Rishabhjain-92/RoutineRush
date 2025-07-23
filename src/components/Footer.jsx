import { Instagram, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer({ isDark, themeClasses }) {
  return (
    <footer
      className={`${isDark ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-xl border-t ${
        isDark ? 'border-slate-700' : 'border-indigo-200'
      }`}
      style={{ width: '100%', paddingTop: '80px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow overflow-hidden">
  {/* Replace 'company-logo.png' with your actual filename and alt text */}
  <img
    src="/Preview.png"
    alt="Your Company Logo"
    className="object-contain w-full h-full"
  />
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
              { icon: Instagram, href: 'https://www.instagram.com/rishabh_jain921', color: 'hover:text-pink-500', hoverBg: 'hover:bg-pink-500/10' },
              { icon: Github, href: 'https://github.com/Rishabhjain-92', color: isDark ? 'hover:text-gray-300' : 'hover:text-gray-800', hoverBg: 'hover:bg-gray-500/10' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/rishabh-jain-296235291', color: 'hover:text-blue-700', hoverBg: 'hover:bg-blue-500/10' },
              { icon: Mail, href: 'mailto:rishabhjain92148@gmail.com', color: 'hover:text-red-500', hoverBg: 'hover:bg-red-500/10' },
            ].map(({ icon: Icon, href, color, hoverBg }, i) => (
              <a
                key={i}
                href={href}
                className={`p-3 ${themeClasses.card} backdrop-blur-sm rounded-xl transition-all duration-500 hover:scale-125 hover:-translate-y-2 hover:rotate-6 border ${color} ${hoverBg} group`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: 'Quick Links', links: ['Home', 'Features', 'About', 'Contact'] },
          { title: 'Legal', links: ['Terms', 'Privacy', 'Cookies', 'Community'] },
        ].map(({ title, links }, i) => (
          <div key={i} className="space-y-4">
            <h4 className="text-lg font-bold">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className={`${themeClasses.muted} hover:${themeClasses.accent} transition-colors duration-300`}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <h4 className="text-lg font-bold">Stay Updated</h4>
          <p className={`${themeClasses.muted} text-sm`}>
            Get the latest productivity tips and features delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-gray-400' : 'bg-white border-indigo-200 text-slate-800 placeholder-slate-500'} border rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50`}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-rose-500/25 flex items-center justify-center group"
            >
              Subscribe
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>

      <div
        className={`mt-16 pt-8 border-t ${isDark ? 'border-slate-700' : 'border-indigo-200'} text-center`}
      >
        <p className={`${themeClasses.muted}`}>© 2025 RoutineRush. All rights reserved. Made with ❤️ for productivity</p>
      </div>
    </footer>
  );
}
