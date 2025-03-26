import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiFilterLine, 
  RiSortAsc, 
  RiSearchLine, 
  RiHeartLine, 
  RiEyeLine,
  RiStarFill,
  RiStarHalfFill,
  RiArrowRightSLine,
  RiArrowLeftSLine,
  RiShoppingCartLine,
  RiHeartFill,
  RiCheckLine
} from 'react-icons/ri';
import { Book, getAllBooks } from '../data/books';
import { useAlert } from '../App';

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<number[]>([]);
  
  // Animation keyframes
  const keyframesStyle = `
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0) rotate(0);
      }
      25% {
        transform: translateY(-30px) translateX(15px) rotate(5deg);
      }
      50% {
        transform: translateY(10px) translateX(-15px) rotate(-5deg);
      }
      75% {
        transform: translateY(20px) translateX(10px) rotate(3deg);
      }
    }
  `;
  
  const booksPerPage = 8;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);
  const { showAlert } = useAlert();

  // Load books and extract categories
  useEffect(() => {
    const allBooks = getAllBooks();
    setBooks(allBooks);
    
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(allBooks.map(book => book.category || 'Uncategorized'))
    );
    setCategories(uniqueCategories);
    
    // Load favorites and cart items from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favIds = JSON.parse(storedFavorites).map((fav: Book) => fav.id);
      setFavorites(favIds);
    }
    
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      const cartIds = JSON.parse(storedCartItems).map((item: Book) => item.id);
      setCartItems(cartIds);
    }
    
    setLoading(false);
  }, []);

  // Update favorites when localStorage changes
  useEffect(() => {
    const handleFavoritesChange = () => {
      const storedFavorites = localStorage.getItem('favorites');
      if (storedFavorites) {
        const favIds = JSON.parse(storedFavorites).map((fav: Book) => fav.id);
        setFavorites(favIds);
      }
    };
    
    window.addEventListener('favoritesUpdated', handleFavoritesChange);
    
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesChange);
    };
  }, []);

  // Update cart items when localStorage changes
  useEffect(() => {
    const handleCartChange = () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        const cartIds = JSON.parse(storedCartItems).map((item: Book) => item.id);
        setCartItems(cartIds);
      }
    };
    
    window.addEventListener('cartUpdated', handleCartChange);
    
    return () => {
      window.removeEventListener('cartUpdated', handleCartChange);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  // Function to check if a book is in favorites
  const isBookFavorite = (bookId: number) => {
    return favorites.includes(bookId);
  };

  // Function to check if a book is in cart
  const isBookInCart = (bookId: number) => {
    return cartItems.includes(bookId);
  };

  // Function to add to favorites
  const addToFavorites = (book: Book) => {
    // Get current favorites from localStorage
    const storedFavorites = localStorage.getItem('favorites');
    const currentFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    // Check if book is already in favorites
    const isAlreadyFavorite = currentFavorites.some((fav: Book) => fav.id === book.id);
    
    if (!isAlreadyFavorite) {
      // Add book to favorites
      const updatedFavorites = [...currentFavorites, book];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Update local state
      setFavorites(prev => [...prev, book.id]);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('favoritesUpdated'));
      
      showAlert(`${book.title} added to favorites!`, 'success');
    } else {
      // Remove book from favorites
      const updatedFavorites = currentFavorites.filter((fav: Book) => fav.id !== book.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Update local state
      setFavorites(prev => prev.filter(id => id !== book.id));
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('favoritesUpdated'));
      
      showAlert(`${book.title} removed from favorites!`, 'success');
    }
  };

  // Function to add to cart
  const addToCart = (book: Book) => {
    // Get current cart items from localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    const currentCartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
    
    // Check if book is already in cart
    const isAlreadyInCart = currentCartItems.some((item: Book) => item.id === book.id);
    
    if (!isAlreadyInCart) {
      // Add book to cart with quantity
      const bookWithQuantity = { ...book, quantity: 1 };
      const updatedCartItems = [...currentCartItems, bookWithQuantity];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      
      // Update local state
      setCartItems(prev => [...prev, book.id]);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('cartUpdated'));
      
      showAlert(`${book.title} added to cart!`, 'success');
    } else {
      showAlert('This book is already in your cart!', 'info');
    }
  };

  const filterBooks = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'all') {
      // Apply any existing search query and sort
      applyFilters(searchQuery, sortOption, 'all');
    } else {
      // Apply category filter along with any existing search query and sort
      applyFilters(searchQuery, sortOption, category);
    }
    
    setCurrentPage(1);
  };

  const sortBooks = (sortBy: string) => {
    setSortOption(sortBy);
    applyFilters(searchQuery, sortBy, selectedCategory);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, sortOption, selectedCategory);
    setCurrentPage(1);
  };

  // Apply all filters and sorting at once
  const applyFilters = (query: string, sortBy: string, category: string) => {
    let filteredBooks = getAllBooks();
    
    // Apply category filter
    if (category !== 'all') {
      filteredBooks = filteredBooks.filter(book => 
        book.category && book.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Apply search filter
    if (query.trim()) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredBooks = filteredBooks.filter(book => {
        const titleMatch = book.title.toLowerCase().includes(query.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(query.toLowerCase());
        const termMatch = searchTerms.some(term => 
          book.title.toLowerCase().includes(term) || 
          book.author.toLowerCase().includes(term)
        );
        
        return titleMatch || authorMatch || termMatch;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        filteredBooks.sort((a, b) => a.discount - b.discount);
        break;
      case 'price-high-low':
        filteredBooks.sort((a, b) => b.discount - a.discount);
        break;
      case 'rating':
        filteredBooks.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming newer books have higher IDs
        filteredBooks.sort((a, b) => b.id - a.id);
        break;
      case 'title-az':
        filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-za':
        filteredBooks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default sorting (featured or recommended)
        // No specific sorting
        break;
    }
    
    setBooks(filteredBooks);
  };

  // Render stars based on rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <RiStarFill key={`full-${i}`} className="w-4 h-4" />
        ))}
        {hasHalfStar && <RiStarHalfFill className="w-4 h-4" />}
      </div>
    );
  };

  // Generate pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxDisplayed = 5; // Max number of page buttons to show
    
    const startPage = Math.max(1, currentPage - Math.floor(maxDisplayed / 2));
    const endPage = Math.min(totalPages, startPage + maxDisplayed - 1);
    
    // Add first page
    if (startPage > 1) {
      items.push(
        <button
          key="first"
          onClick={() => setCurrentPage(1)}
          className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-600 dark:text-gray-300 rounded-md bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700"
          aria-label="Go to first page"
        >
          1
        </button>
      );
      
      // Add ellipsis if needed
      if (startPage > 2) {
        items.push(
          <span key="ellipsis-start" className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400">
            ...
          </span>
        );
      }
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`inline-flex items-center justify-center w-8 h-8 text-sm rounded-md ${
            currentPage === i
              ? 'bg-purple-600 text-white font-medium'
              : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700'
          }`}
          aria-label={`Go to page ${i}`}
          aria-current={currentPage === i ? 'page' : undefined}
        >
          {i}
        </button>
      );
    }
    
    // Add ellipsis if needed
    if (endPage < totalPages - 1) {
      items.push(
        <span key="ellipsis-end" className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-gray-400">
          ...
        </span>
      );
    }
    
    // Add last page
    if (endPage < totalPages) {
      items.push(
        <button
          key="last"
          onClick={() => setCurrentPage(totalPages)}
          className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-600 dark:text-gray-300 rounded-md bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700"
          aria-label="Go to last page"
        >
          {totalPages}
        </button>
      );
    }
    
    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 relative overflow-hidden">
      {/* Add keyframes styles */}
      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
      
      {/* Animated background with Tailwind and inline styles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Animated bubbles using absolute positioning */}
        <div 
          className="absolute rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 blur-3xl"
          style={{
            width: '300px',
            height: '300px',
            left: '-150px',
            top: '10%',
            animation: 'float 25s infinite ease-in-out'
          }}
        ></div>
        <div 
          className="absolute rounded-full bg-gradient-to-br from-purple-500/20 to-blue-600/20 blur-3xl"
          style={{
            width: '200px',
            height: '200px',
            right: '-100px',
            top: '20%',
            animation: 'float 25s infinite ease-in-out -5s'
          }}
        ></div>
        <div 
          className="absolute rounded-full bg-gradient-to-br from-indigo-600/20 to-blue-600/20 blur-3xl"
          style={{
            width: '180px',
            height: '180px',
            left: '15%',
            bottom: '10%',
            animation: 'float 25s infinite ease-in-out -10s'
          }}
        ></div>
        <div 
          className="absolute rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 blur-3xl"
          style={{
            width: '250px',
            height: '250px',
            right: '15%',
            bottom: '20%',
            animation: 'float 25s infinite ease-in-out -15s'
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-block mb-3 px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
            Explore Our Collection
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Discover Your Next Read
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the perfect book from our carefully curated selection of bestsellers, classics, and hidden gems
          </p>
        </motion.div>
        
        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 mb-10 shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search books by title or author..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-gray-700 border border-purple-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white transition-colors shadow-sm"
                  onChange={(e) => handleSearch(e.target.value)}
                  value={searchQuery}
                  aria-label="Search books"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-md text-purple-600 dark:text-purple-400">
                  <RiSearchLine className="text-xl" />
                </div>
              </div>
              
              <div className="relative sm:w-48">
                <select
                  className="w-full appearance-none bg-white dark:bg-gray-700 border border-purple-200 dark:border-gray-600 rounded-lg pl-12 pr-8 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white transition-colors shadow-sm"
                  onChange={(e) => filterBooks(e.target.value)}
                  value={selectedCategory}
                  aria-label="Filter by category"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase()}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-md text-purple-600 dark:text-purple-400">
                  <RiFilterLine className="text-xl" />
                </div>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="relative sm:w-48">
              <select
                className="w-full appearance-none bg-white dark:bg-gray-700 border border-purple-200 dark:border-gray-600 rounded-lg pl-12 pr-8 py-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent dark:text-white transition-colors shadow-sm"
                onChange={(e) => sortBooks(e.target.value)}
                value={sortOption}
                aria-label="Sort books"
              >
                <option value="default">Featured</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
                <option value="title-az">Title: A to Z</option>
                <option value="title-za">Title: Z to A</option>
              </select>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-purple-100 dark:bg-purple-900/50 p-1.5 rounded-md text-purple-600 dark:text-purple-400">
                <RiSortAsc className="text-xl" />
              </div>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No Books Found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">We couldn't find any books matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortOption('default');
                setBooks(getAllBooks());
              }}
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors button-3d"
            >
              <RiFilterLine className="mr-2" />
              Clear All Filters
            </button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group border border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <Link to={`/details/${book.id}`} className="block">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  
                  {/* Discount badge if applicable */}
                  {book.price > book.discount && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-md">
                      {Math.round(((book.price - book.discount) / book.price) * 100)}% OFF
                    </div>
                  )}
                  
                  {/* Quick actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => addToFavorites(book)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isBookFavorite(book.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white'
                      } button-pop`}
                      aria-label={isBookFavorite(book.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isBookFavorite(book.id) ? (
                        <RiHeartFill className="text-lg" />
                      ) : (
                        <RiHeartLine className="text-lg" />
                      )}
                    </button>
                    
                    <Link
                      to={`/details/${book.id}`}
                      className="w-9 h-9 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-purple-500 hover:text-white transition-colors button-pop"
                      aria-label="View details"
                    >
                      <RiEyeLine className="text-lg" />
                    </Link>
                  </div>
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        {book.category || 'Fiction'}
                      </span>
                      <h3 className="font-semibold text-gray-900 dark:text-white mt-1 line-clamp-1">
                        <Link to={`/details/${book.id}`} className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                          {book.title}
                        </Link>
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                    By {book.author}
                  </p>
                  
                  <div className="flex items-center mb-3">
                    {renderRating(book.rating)}
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      ({book.rating})
                    </span>
                  </div>
                  
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${book.discount}
                      </span>
                      {book.price > book.discount && (
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${book.price}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => addToCart(book)}
                      className={`p-2.5 rounded-lg transition-transform ${
                        isBookInCart(book.id)
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      } button-3d flex items-center justify-center`}
                      aria-label={isBookInCart(book.id) ? "Added to cart" : "Add to cart"}
                    >
                      {isBookInCart(book.id) ? (
                        <RiCheckLine className="text-lg mr-1" />
                      ) : (
                        <RiShoppingCartLine className="text-lg mr-1" />
                      )}
                      <span className="text-sm font-medium">
                        {isBookInCart(book.id) ? 'Added' : 'Add to Cart'}
                      </span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {/* Pagination */}
        {!loading && books.length > 0 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
              Showing <span className="font-medium">{indexOfFirstBook + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastBook, books.length)}
              </span>{' '}
              of <span className="font-medium">{books.length}</span> books
            </div>
            
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-md button-3d ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
                aria-label="Previous page"
              >
                <RiArrowLeftSLine className="w-5 h-5" />
              </button>
              
              <div className="hidden sm:flex items-center space-x-1">
                {renderPaginationItems()}
              </div>
              
              <div className="sm:hidden flex items-center space-x-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`inline-flex items-center justify-center w-10 h-10 rounded-md button-3d ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
                aria-label="Next page"
              >
                <RiArrowRightSLine className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Books; 