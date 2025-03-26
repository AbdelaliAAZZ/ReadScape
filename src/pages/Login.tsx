import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RiGoogleFill, RiFacebookFill, RiUserLine, RiLockLine, RiMailLine, RiArrowLeftLine, RiBookLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useAlert } from '../App';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Authentication 
    if (isLogin) {
      // Handle login
      showAlert('Login successful!', 'success');
      navigate('/');
    } else {
      // Handle registration
      showAlert('Account created successfully!', 'success');
      navigate('/');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Reset form when toggling modes
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute left-4 top-24">
        <Link to="/" className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
          <RiArrowLeftLine className="mr-2" /> Back to Home
        </Link>
      </div>
      
      <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 p-4">
        {/* Left side - Illustration/Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left max-w-md"
        >
          <div className="mb-6 relative">
            <div className="text-6xl md:text-7xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                ReadScape
              </span>
            </div>
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-2">
              Your journey through stories begins here
            </div>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl mb-8 relative">
            <div className="absolute -top-3 -left-3 bg-purple-600 text-white p-2 rounded-lg">
              <RiBookLine className="text-xl" />
            </div>
            <p className="text-gray-600 dark:text-gray-300 italic">
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 text-right">
              — George R.R. Martin
            </p>
          </div>
          
          <div className="hidden md:block">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Why join ReadScape?</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                Access to thousands of titles
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                Personalized reading recommendations
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                Join a community of book lovers
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-300">
                <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                Special discounts for members
              </li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isLogin
                  ? 'Sign in to access your account'
                  : 'Sign up to get started with ReadScape'}
              </p>
            </div>

            {/* Social login buttons */}
            <div className="flex gap-4 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                <RiFacebookFill />
                <span>Facebook</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg font-medium hover:bg-red-700 transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md">
                <RiGoogleFill />
                <span>Google</span>
              </button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login/Signup form */}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <RiUserLine className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                      placeholder="Your name"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiMailLine className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <RiLockLine className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-medium transition-all mb-4 hover:from-purple-700 hover:to-indigo-700 transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 