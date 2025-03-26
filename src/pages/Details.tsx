import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiStarFill,
  RiStarHalfFill,
  RiShoppingCartLine,
  RiArrowLeftLine,
  RiAddLine,
  RiSubtractLine,
  RiHeartLine,
  RiHeartFill
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Book, getBookById, getAllBooks, books, trendingBooks } from '../data/books';
import { useAlert } from '../App';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const { showAlert } = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [similarBooks, setSimilarBooks] = useState<Book[]>([]);
  const [book, setBook] = useState<Book | null>(null);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Get book data from the centralized data file
  useEffect(() => {
    if (id) {
      const fetchedBook = getBookById(parseInt(id));
      setBook(fetchedBook);
      
      // Find similar books (same author or category)
      if (fetchedBook) {
        const similar = [...books, ...trendingBooks].filter(
          (b) => 
            b.id !== fetchedBook.id && 
            (b.author === fetchedBook.author || 
             b.category === fetchedBook.category)
        ).slice(0, 4);
        setSimilarBooks(similar);
      }

      // Check if book is in favorites
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const isLiked = favorites.some((favBook: any) => favBook.id === parseInt(id));
      setLiked(isLiked);
      
      setLoading(false);
    }
  }, [id]);

  // Function to increment quantity
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  // Function to decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Function to add to cart
  const addToCart = () => {
    if (!book) return;
    
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: any) => item.id === book.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...book, quantity });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    showAlert(`${book.title} added to cart`, "success");
  };
  
  // Add to favorites function
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (liked) {
      const updatedFavorites = favorites.filter((favBook: any) => favBook.id !== book.id);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      showAlert("Removed from favorites", "success");
    } else {
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      showAlert("Added to favorites", "success");
    }
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center pt-16">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <Link to="/books" className="text-purple-600 hover:underline">
          Return to Books
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-white dark:bg-gray-900 min-h-screen">
      {/* Book Details Section */}
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/books"
          className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 mb-6 transition-colors"
        >
          <RiArrowLeftLine className="mr-2" /> Back to Books
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {/* Book Image */}
            <div className="p-8 flex justify-center items-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-96 object-contain rounded-lg shadow-lg"
                />
                <div className="absolute -top-3 -right-3">
                  <button
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full shadow-lg ${
                      liked
                        ? "bg-red-500 text-white"
                        : "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                    } transition-colors`}
                    aria-label={liked ? "Remove from favorites" : "Add to favorites"}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={liked ? "filled" : "outline"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {liked ? <RiHeartFill className="text-xl" /> : <RiHeartLine className="text-xl" />}
                      </motion.div>
                    </AnimatePresence>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Book Info */}
            <div className="p-8 md:col-span-2 lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 text-xs font-medium rounded-full">
                    {book.category}
                  </span>
                  {book.bestSeller && (
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 text-xs font-medium rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-2 dark:text-white">{book.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">by {book.author}</p>

                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(Math.floor(book.rating))].map((_, i) => (
                      <RiStarFill key={i} />
                    ))}
                    {book.rating % 1 !== 0 && <RiStarHalfFill />}
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    {book.rating} ({book.reviewCount} reviews)
                  </span>
                </div>

                <div className="prose prose-lg dark:prose-invert mb-6 max-w-none">
                  <p>{book.description || 'A captivating book that takes readers on an unforgettable journey through imaginative worlds and compelling characters. Perfect for readers who enjoy thoughtful narratives and engaging storytelling.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Book Details</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li className="flex">
                        <span className="font-medium w-32">Format:</span>
                        <span>{book.format || 'Hardcover'}</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32">Pages:</span>
                        <span>{book.pages || '314'}</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32">Language:</span>
                        <span>{book.language || 'English'}</span>
                      </li>
                      <li className="flex">
                        <span className="font-medium w-32">ISBN:</span>
                        <span>{book.isbn || '978-1234567890'}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">What You'll Learn</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      {book.highlights ? (
                        book.highlights.map((highlight: string, index: number) => (
                          <li key={index} className="flex">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="flex">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>Gain insights into compelling characters</span>
                          </li>
                          <li className="flex">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>Discover rich and detailed worlds</span>
                          </li>
                          <li className="flex">
                            <span className="text-purple-600 mr-2">•</span>
                            <span>Experience emotional storytelling</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">${book.discount}</span>
                    {book.price > book.discount && (
                      <span className="ml-2 text-gray-400 line-through">${book.price}</span>
                    )}
                    {book.price > book.discount && (
                      <span className="ml-2 bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-xs font-semibold px-2 py-1 rounded">
                        Save {Math.round(((book.price - book.discount) / book.price) * 100)}%
                      </span>
                    )}
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={decrementQuantity}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <RiSubtractLine />
                      </button>
                      <span className="px-4 py-2 font-medium">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <RiAddLine />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={addToCart}
                    className="flex-grow sm:flex-grow-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center"
                  >
                    <RiShoppingCartLine className="mr-2" /> Add to Cart
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section with images */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Customer Reviews</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {book.reviews ? (
              book.reviews.map((review: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start">
                    <img
                      src={review.image || `/assets/img/avatar-${(index % 6) + 1}.jpg`}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold dark:text-white">{review.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {review.date || new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <RiStarFill key={i} />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Default reviews if none provided
              [1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-start">
                    <img
                      src={`/assets/img/avatar-${index}.jpg`}
                      alt="Reviewer"
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=User+${index}&background=random`;
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold dark:text-white">Reader {index}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <RiStarFill key={i} />
                        ))}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {[
                          "This book exceeded all my expectations. The character development is fantastic and the storyline kept me engaged from beginning to end.",
                          "One of the best books I've read this year. The author's writing style is captivating and the plot is full of unexpected twists.",
                          "I couldn't put this book down! The narrative is compelling and the themes explored are both thought-provoking and relevant.",
                          "A truly immersive reading experience. The author has created a rich world with complex characters that stay with you long after you finish reading."
                        ][index - 1]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Similar Books Section */}
      <div className="py-12 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Similar Books You May Like</h2>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            className="pb-12"
          >
            {similarBooks.length > 0 ? (
              similarBooks.map((similar) => (
                <SwiperSlide key={similar.id}>
                  <motion.div
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    className="h-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
                  >
                    <Link to={`/details/${similar.id}`} className="block">
                      <div className="relative aspect-[2/3] overflow-hidden">
                        <img
                          src={similar.image}
                          alt={similar.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-1 line-clamp-1 dark:text-white">{similar.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{similar.author}</p>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(Math.floor(similar.rating))].map((_, i) => (
                              <RiStarFill key={i} className="text-sm" />
                            ))}
                            {similar.rating % 1 !== 0 && <RiStarHalfFill className="text-sm" />}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({similar.rating})</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-purple-600 dark:text-purple-400 font-semibold">${similar.discount}</span>
                          {similar.price > similar.discount && (
                            <span className="text-gray-400 line-through ml-2 text-sm">${similar.price}</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </SwiperSlide>
              ))
            ) : (
              // Fallback if no similar books
              [...Array(4)].map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="h-full bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse">
                    <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Details; 