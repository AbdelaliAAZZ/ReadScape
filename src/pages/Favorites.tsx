import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiStarFill, 
  RiStarHalfFill, 
  RiHeartFill, 
  RiEyeLine,
  RiShoppingCartLine
} from 'react-icons/ri';
import { Book } from '../data/books';

const Favorites = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    setLoading(false);
  }, []);

  // Remove from favorites
  const removeFavorite = (id: number) => {
    const updatedFavorites = favorites.filter(book => book.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Animation variants
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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Books you've added to your favorites collection
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : favorites.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {favorites.map(book => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full aspect-[2/3] object-contain"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button 
                      onClick={() => removeFavorite(book.id)}
                      className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                      aria-label="Remove from favorites"
                    >
                      <RiHeartFill className="text-lg" />
                    </button>
                    <Link 
                      to={`/details/${book.id}`}
                      className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition-colors"
                      aria-label="View details"
                    >
                      <RiEyeLine className="text-lg" />
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{book.author}</p>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(Math.floor(book.rating))].map((_, i) => (
                        <RiStarFill key={i} />
                      ))}
                      {book.rating % 1 !== 0 && (
                        <RiStarHalfFill />
                      )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">({book.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-purple-600 font-semibold">${book.discount}</span>
                      <span className="text-gray-500 line-through ml-2 text-sm">${book.price}</span>
                    </div>
                    <button className="btn bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded-lg transition-colors flex items-center gap-1">
                      <RiShoppingCartLine className="text-sm" /> Add
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <div className="flex flex-col items-center max-w-md mx-auto">
              <RiHeartFill className="text-6xl text-gray-300 dark:text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your favorites list is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven't added any books to your favorites yet. Browse our collection and click the heart icon to add books you love.
              </p>
              <Link
                to="/books"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-md inline-block"
              >
                Browse Books
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 