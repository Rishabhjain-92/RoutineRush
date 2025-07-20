import { useState, useEffect } from 'react';
import { Sun, Moon, Eye, EyeOff, ArrowRight, User, Mail, Lock, CheckCircle2, X, Github } from 'lucide-react';

const SignupPage = () => {
  const [isDark, setIsDark] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({});

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

  // Password strength calculator
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Handle signup logic here
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${themeClasses.body}`} style={{ margin: 0, padding: 0, width: '100vw', maxWidth: '100vw', overflowX: 'hidden' }}>
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
          <a href="/" className="flex items-center space-x-3">
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
          </a>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${themeClasses.card} backdrop-blur-sm transition-all duration-500 hover:scale-110 hover:rotate-12`}
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
            </button>
            <a href="/" className={`px-4 py-2 ${isDark ? 'border-slate-600 text-slate-300 hover:border-blue-500' : 'border-indigo-300 text-indigo-600 hover:border-indigo-500'} border rounded-xl transition-all duration-300 hover:scale-105`}>
              Back to Home
            </a>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen" style={{ width: '100%', paddingTop: '128px', paddingBottom: '80px', paddingLeft: '16px', paddingRight: '16px', margin: 0 }}>
        <div className="w-full max-w-md mx-auto relative z-10">
          {/* Signup Card */}
          <div className={`${themeClasses.card} backdrop-blur-xl rounded-3xl border relative overflow-hidden group animate-fadeInUp w-full`} style={{ padding: '32px' }}>
            {/* Animated background glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-yellow-500/5"></div>
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black mb-3 bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className={`${themeClasses.muted} text-lg`}>
                  Start your productivity journey today
                </p>
              </div>

              {/* Form */}
              <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">First Name</label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.muted}`} />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 hover:scale-105`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && <p className="text-red-500 text-sm mt-1 flex items-center"><X className="w-4 h-4 mr-1" />{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Last Name</label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.muted}`} />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 hover:scale-105`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && <p className="text-red-500 text-sm mt-1 flex items-center"><X className="w-4 h-4 mr-1" />{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.muted}`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-4 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 hover:scale-105`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center"><X className="w-4 h-4 mr-1" />{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.muted}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 hover:scale-105`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.muted} hover:text-rose-500 transition-colors duration-300`}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={themeClasses.muted}>Password strength</span>
                        <span className={`font-semibold ${passwordStrength <= 1 ? 'text-red-500' : passwordStrength <= 3 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-red-500 text-sm mt-1 flex items-center"><X className="w-4 h-4 mr-1" />{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${themeClasses.muted}`} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`w-full pl-12 pr-12 py-3 ${themeClasses.input} border rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-500/50 hover:scale-105`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${themeClasses.muted} hover:text-rose-500 transition-colors duration-300`}
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-green-500 text-sm mt-1 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" />Passwords match
                    </p>
                  )}
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 flex items-center"><X className="w-4 h-4 mr-1" />{errors.confirmPassword}</p>}
                </div>

                {/* Terms and Conditions */}
                <div>
                  <label className="flex items-start space-x-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-rose-500 bg-transparent border-2 border-gray-300 rounded focus:ring-rose-500 focus:ring-2"
                    />
                    <span className={`text-sm ${themeClasses.muted} group-hover:text-rose-500 transition-colors duration-300`}>
                      I agree to the{' '}
                      <a href="#" className="text-rose-500 hover:underline font-semibold">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-rose-500 hover:underline font-semibold">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1 flex items-center"><X className="w-4 h-4 mr-1" />{errors.agreeToTerms}</p>}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="group w-full px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/25 relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    Create Account
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center mt-6">
                <p className={`${themeClasses.muted}`}>
                  Already have an account?{' '}
                  <a href="/login" className="text-rose-500 hover:underline font-semibold transition-colors duration-300">
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
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

        /* Responsive Design */
        @media (max-width: 768px) {
          .grid-cols-2 {
            grid-template-columns: 1fr;
          }
          
          .text-3xl {
            font-size: 2rem;
          }
          
          .px-8 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;