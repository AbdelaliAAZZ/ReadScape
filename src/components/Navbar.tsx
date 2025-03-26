import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RiMenuLine, 
  RiCloseLine, 
  RiSearchLine, 
  RiMoonLine, 
  RiSunLine, 
  RiUser3Line,
  RiHeartLine,
  RiHeartFill,
  RiStarFill,
  RiShoppingCartLine,
  RiArrowRightLine,
  RiWhatsappLine,
  RiDeleteBinLine
} from 'react-icons/ri';
import { Book } from '../data/books';
import { useAlert } from '../App';
import Logo from './Logo';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const favoritesRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { showAlert } = useAlert();

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'Trending', path: '/#trending' },
    { name: 'Upcoming', path: '/#upcoming' },
    { name: 'Reviews', path: '/#testimonials' }
  ];

  // Load favorites from localStorage
  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    loadFavorites();

    // Listen for storage events to update favorites when changed from another component
    window.addEventListener('storage', loadFavorites);
    
    // Custom event listener for local updates
    const handleFavoritesChange = () => loadFavorites();
    window.addEventListener('favoritesUpdated', handleFavoritesChange);

    return () => {
      window.removeEventListener('storage', loadFavorites);
      window.removeEventListener('favoritesUpdated', handleFavoritesChange);
    };
  }, []);

  // Load cart items from localStorage
  useEffect(() => {
    const loadCartItems = () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    };

    loadCartItems();

    // Listen for storage events to update cart when changed from another component
    window.addEventListener('storage', loadCartItems);
    
    // Custom event listener for local updates
    const handleCartChange = () => loadCartItems();
    window.addEventListener('cartUpdated', handleCartChange);

    return () => {
      window.removeEventListener('storage', loadCartItems);
      window.removeEventListener('cartUpdated', handleCartChange);
    };
  }, []);

  // Also update favorites when favorites panel is opened
  useEffect(() => {
    if (favoritesOpen) {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, [favoritesOpen]);

  // Also update cart when cart panel is opened
  useEffect(() => {
    if (cartOpen) {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
    }
  }, [cartOpen]);

  // Check if dark mode is enabled in local storage
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Check scroll position with animation smooth effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Refresh favorites when scrolling to keep panel updated
      if (favoritesOpen) {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      }

      // Refresh cart when scrolling to keep panel updated
      if (cartOpen) {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [favoritesOpen, cartOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', (!darkMode).toString());
    document.documentElement.classList.toggle('dark');
  };

  // Handle navigation link click for smooth scrolling to sections
  const handleNavClick = (path: string) => {
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Remove favorite
  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter(book => book.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('favoritesUpdated'));
    
    showAlert('Book removed from favorites', 'success');
  };

  // Remove cart item
  const removeCartItem = (id: number) => {
    const updatedCartItems = cartItems.filter(book => book.id !== id);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    showAlert('Item removed from cart', 'success');
  };

  // Update cart item quantity
  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeCartItem(id);
      return;
    }

    const updatedCartItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Calculate cart total
  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discount || item.price;
      const quantity = item.quantity || 1;
      return total + (itemPrice * quantity);
    }, 0).toFixed(2);
  };

  // WhatsApp Checkout Function
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;
    
    // Format the message
    let message = "Hello! I would like to order the following books:\n\n";
    
    // Add each book to the message
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.title} by ${item.author} - $${item.discount}\n`;
    });
    
    // Add the total price
    const totalPrice = cartItems.reduce((total, item) => total + item.discount, 0).toFixed(2);
    message += `\nTotal: $${totalPrice}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/2120673170737?text=${encodedMessage}`, '_blank');
  };

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Get all books from localStorage or use a fallback
    const storedBooks = localStorage.getItem('allBooks');
    const allBooks: Book[] = storedBooks ? JSON.parse(storedBooks) : [];
    
    // Filter books based on search query
    const results = allBooks.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) || 
      book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results.slice(0, 3)); // Limit to first 3 matches
  };

  // Outside click handlers for dropdowns
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // For favorites panel
      if (favoritesRef.current && !favoritesRef.current.contains(event.target as Node)) {
        setFavoritesOpen(false);
      }
      
      // For cart panel
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => link.path.includes('#') && handleNavClick(link.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors relative group ${
                    location.pathname === link.path || (link.path.includes('#') && location.hash === link.path.substring(link.path.indexOf('#')))
                      ? 'text-purple-600 dark:text-purple-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  {link.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                      location.pathname === link.path || (link.path.includes('#') && location.hash === link.path.substring(link.path.indexOf('#')))
                        ? 'scale-x-100'
                        : ''
                    }`}
                  ></span>
                </Link>
              ))}
            </nav>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
                aria-label="Search"
              >
                <RiSearchLine className="text-xl" />
              </button>
              
              {/* Toggle Dark Mode */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <RiSunLine className="text-xl" /> : <RiMoonLine className="text-xl" />}
              </button>
              
              {/* Favorites Button with count badge */}
              <div className="relative">
                <button
                  onClick={() => {
                    setFavoritesOpen(!favoritesOpen);
                    setCartOpen(false);
                  }}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Favorites"
                >
                  <RiHeartLine className="text-xl" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {favorites.length}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Cart Button with count badge */}
              <div className="relative">
                <button
                  onClick={() => {
                    setCartOpen(!cartOpen);
                    setFavoritesOpen(false);
                  }}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Cart"
                >
                  <RiShoppingCartLine className="text-xl" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              </div>
              
              {/* Login Button (only on larger screens) */}
              <Link
                to="/login"
                className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-colors ml-1"
                aria-label="Login"
              >
                <RiUser3Line className="mr-1" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <RiCloseLine className="text-2xl" />
                ) : (
                  <RiMenuLine className="text-2xl" />
                )}
              </button>
            </div>
          </div>
          
          {/* Search Dropdown */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 right-0 bg-white dark:bg-gray-800 shadow-xl rounded-b-lg p-4 border-t border-gray-100 dark:border-gray-700"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search books by title or author..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white"
                    autoFocus
                  />
                  <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
                </div>
                
                {searchResults.length > 0 && (
                  <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-700">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/details/${result.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center py-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 -mx-2 transition-colors"
                      >
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-12 h-16 object-cover rounded mr-4"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {result.title}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {result.author}
                          </p>
                          <div className="flex items-center mt-1">
                            <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm">
                              ${result.discount}
                            </span>
                            {result.price > result.discount && (
                              <span className="text-gray-400 line-through ml-2 text-xs">
                                ${result.price}
                              </span>
                            )}
                          </div>
                        </div>
                        <RiArrowRightLine className="ml-2 text-gray-400 dark:text-gray-500" />
                      </Link>
                    ))}
                    
                    <div className="pt-3">
                      <Link
                        to="/books"
                        onClick={() => setSearchOpen(false)}
                        className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium flex items-center justify-center"
                      >
                        View all results
                        <RiArrowRightLine className="ml-1" />
                      </Link>
                    </div>
                  </div>
                )}
                
                {searchQuery && searchResults.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray-500 dark:text-gray-400">No results found for "{searchQuery}"</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-b-lg overflow-hidden z-40"
            >
              <div className="px-4 py-3 space-y-3">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={() => {
                      if (link.path.includes('#')) {
                        handleNavClick(link.path);
                      }
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Login button for mobile */}
                <Link 
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <RiUser3Line className="mr-2" />
                  Login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Favorites Sidebar */}
      <AnimatePresence>
        {favoritesOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setFavoritesOpen(false)}
            ></motion.div>
            
            {/* Sidebar */}
            <motion.div
              ref={favoritesRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <RiHeartFill className="text-purple-500 mr-2" />
                    My Favorites
                  </h2>
                  <button
                    onClick={() => setFavoritesOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close favorites panel"
                  >
                    <RiCloseLine className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                {favorites.length > 0 ? (
                  <div className="space-y-4">
                    {favorites.map((book) => (
                      <div key={book.id} className="flex bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-16 h-20 object-cover rounded mr-3"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                              {book.title}
                            </h3>
                            <button
                              onClick={() => removeFavorite(book.id)}
                              className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove from favorites"
                            >
                              <RiDeleteBinLine />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{book.author}</p>
                          <div className="flex items-center mb-2">
                            <div className="flex text-yellow-400 text-xs">
                              {[...Array(Math.floor(book.rating))].map((_, i) => (
                                <RiStarFill key={i} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({book.rating})</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">${book.discount}</span>
                              {book.price > book.discount && (
                                <span className="text-gray-400 line-through ml-2 text-xs">${book.price}</span>
                              )}
                            </div>
                            <Link
                              to={`/details/${book.id}`}
                              onClick={() => setFavoritesOpen(false)}
                              className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <RiHeartLine className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Your favorites list is empty</p>
                    <Link
                      to="/books"
                      onClick={() => setFavoritesOpen(false)}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Browse Books
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Cart Sidebar */}
      <AnimatePresence>
        {cartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setCartOpen(false)}
            ></motion.div>
            
            {/* Sidebar */}
            <motion.div
              ref={cartRef}
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-xl z-50 overflow-y-auto flex flex-col"
            >
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <RiShoppingCartLine className="text-purple-500 mr-2" />
                    My Cart
                  </h2>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close cart panel"
                  >
                    <RiCloseLine className="text-2xl" />
                  </button>
                </div>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto">
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      const quantity = item.quantity || 1;
                      
                      return (
                        <div key={item.id} className="flex bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow-sm">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-20 object-cover rounded mr-3"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                                {item.title}
                              </h3>
                              <button
                                onClick={() => removeCartItem(item.id)}
                                className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                                aria-label="Remove from cart"
                              >
                                <RiDeleteBinLine />
                              </button>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{item.author}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded">
                                <button
                                  onClick={() => updateCartItemQuantity(item.id, quantity - 1)}
                                  className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="px-2 py-1 text-gray-700 dark:text-gray-300 text-sm">
                                  {quantity}
                                </span>
                                <button
                                  onClick={() => updateCartItemQuantity(item.id, quantity + 1)}
                                  className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>
                              
                              <div>
                                <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                                  ${(item.discount * quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <RiShoppingCartLine className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-4">Your cart is empty</p>
                    <Link
                      to="/books"
                      onClick={() => setCartOpen(false)}
                      className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Browse Books
                    </Link>
                  </div>
                )}
              </div>
              
              {/* Cart footer with total and checkout */}
              {cartItems.length > 0 && (
                <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Total:</span>
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      ${calculateCartTotal()}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to="/checkout"
                      onClick={() => setCartOpen(false)}
                      className="block w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-center rounded-lg transition-colors"
                    >
                      Checkout
                    </Link>
                    
                    <button
                      onClick={handleWhatsAppCheckout}
                      className="block w-full py-3 bg-green-500 hover:bg-green-600 text-white text-center rounded-lg transition-colors flex items-center justify-center"
                    >
                      <RiWhatsappLine className="mr-2 text-xl" />
                      Checkout via WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 