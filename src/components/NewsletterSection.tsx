import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiBook, FiMail, FiCheck } from 'react-icons/fi';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      
      // Alert can be added here
      // showAlert('You have successfully subscribed to our newsletter!', 'success');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 5000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-20 w-64 h-64 bg-purple-200 dark:bg-purple-900/30 rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute -right-20 bottom-10 w-80 h-80 bg-blue-200 dark:bg-blue-900/30 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute left-[40%] top-[60%] w-20 h-20 bg-pink-300 dark:bg-pink-600/20 rounded-full filter blur-2xl opacity-40"></div>
        
        {/* Floating book icons */}
        <motion.div
          className="absolute left-[15%] top-[30%]"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          <FiBook className="text-purple-400 dark:text-purple-600 opacity-30 text-4xl" />
        </motion.div>
        <motion.div
          className="absolute right-[20%] top-[40%]"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 1
          }}
        >
          <FiMail className="text-blue-400 dark:text-blue-600 opacity-30 text-3xl" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-5">
            {/* Left column - Text content */}
            <motion.div 
              className="md:col-span-3 p-8 md:p-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Stay Updated
                </h2>
                <h3 className="text-xl md:text-2xl font-medium mb-6 dark:text-white">
                  Join our newsletter for book lovers
                </h3>
              </motion.div>
              
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mb-8"
                variants={itemVariants}
              >
                Subscribe to get exclusive updates on new arrivals, special offers, 
                reading recommendations, and more literary insights delivered right to your inbox.
              </motion.p>
              
              <motion.div 
                className="space-y-4 mb-8"
                variants={itemVariants}
              >
                <h4 className="text-lg font-medium dark:text-white">You'll receive:</h4>
                <ul className="space-y-3">
                  {[
                    'Weekly curated book recommendations',
                    'Early access to new releases and special editions',
                    'Exclusive discounts on selected titles',
                    'Reading lists from our literary experts'
                  ].map((benefit, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (index * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mt-1">
                        <FiCheck className="text-white text-xs" />
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-5 py-4 pr-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        required
                      />
                      <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-4 px-6 rounded-lg font-medium transition-all shadow-md flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        <>
                          Subscribe Now <FiSend className="ml-2" />
                        </>
                      )}
                    </motion.button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    className="rounded-lg bg-green-50 dark:bg-green-900/20 p-6 text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <motion.div 
                      className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.5, times: [0, 0.6, 1] }}
                    >
                      <FiCheck className="text-green-600 dark:text-green-300 text-3xl" />
                    </motion.div>
                    <h4 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">Thank You!</h4>
                    <p className="text-green-700 dark:text-green-400">
                      You've successfully subscribed to our newsletter.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Right column - Decorative elements */}
            <div className="md:col-span-2 bg-gradient-to-br from-purple-600 to-blue-600 relative hidden md:block">
              <div className="absolute inset-0 overflow-hidden">
                <svg className="absolute -right-20 -top-20 text-blue-500/20" width="400" height="400" viewBox="0 0 200 200">
                  <path fill="currentColor" d="M41.4,-69.8C53.5,-62.7,63.3,-51.8,71.2,-39.3C79.1,-26.7,85.1,-12.3,84.3,1.4C83.5,15.2,76,30.1,66.9,43.4C57.9,56.8,47.3,68.6,34.6,76.1C22,83.6,7.3,86.8,-5.9,83.9C-19.2,81,-31,72.1,-41.8,63.1C-52.7,54.1,-62.5,45,-69.9,33.7C-77.3,22.3,-82.3,8.6,-80.6,-4.1C-79,-16.8,-70.8,-28.4,-61.3,-37.8C-51.8,-47.2,-41.1,-54.4,-30,-61.5C-18.9,-68.6,-7.2,-75.7,3.8,-76.3C14.9,-76.9,29.3,-76.9,41.4,-69.8Z" transform="translate(100 100)" />
                </svg>
                <svg className="absolute -left-20 -bottom-20 text-purple-500/20" width="400" height="400" viewBox="0 0 200 200">
                  <path fill="currentColor" d="M30.5,-53.5C38.9,-45.7,44.7,-35.3,53.8,-24.7C63,-14.2,75.5,-3.7,78.2,8.8C80.9,21.2,73.8,35.6,64.2,47.6C54.6,59.7,42.5,69.3,28.7,74.6C14.9,80,-0.7,81,-14.6,76.7C-28.5,72.4,-40.8,62.9,-49.3,51.2C-57.8,39.5,-62.5,25.7,-67,11.1C-71.4,-3.4,-75.6,-18.7,-71.4,-31.1C-67.1,-43.5,-54.4,-53.1,-41.2,-58.8C-27.9,-64.5,-14,-66.3,-1.5,-63.9C11,-61.6,22.1,-61.2,30.5,-53.5Z" transform="translate(100 100)" />
                </svg>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <motion.div 
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 relative overflow-hidden w-full max-w-xs"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="mb-6 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0] 
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  >
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <FiMail className="text-white text-4xl" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="h-3 bg-white/20 rounded-full"
                        initial={{ width: '60%', x: -50, opacity: 0 }}
                        whileInView={{ width: ['60%', '100%', '80%'], x: 0, opacity: 1 }}
                        transition={{ 
                          delay: 0.7 + (i * 0.2), 
                          duration: 0.5,
                          times: [0, 0.7, 1]
                        }}
                        viewport={{ once: true }}
                      />
                    ))}
                    
                    <motion.div 
                      className="mt-6 h-8 bg-white/20 rounded-md"
                      initial={{ width: '100%', x: -50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      viewport={{ once: true }}
                    />
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-white/5 to-white/20 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection; 