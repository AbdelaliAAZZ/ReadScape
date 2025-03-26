import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

// Import React Icons
import {
  RiHeartLine,
  RiEyeLine,
  RiStarFill,
  RiStarHalfFill,
  RiShoppingCartLine,
  RiArrowUpLine,
  RiShieldCheckLine,
  RiTruckLine,
  RiSecurePaymentLine,
  RiCheckLine,
} from 'react-icons/ri';

// Import data and custom hooks
import {
  Book,
  trendingBooks,
  Service,
  upcomingBooks,
} from '../data/books';
import { useAlert } from '../App';
import NewsletterSection from "../components/NewsletterSection";
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

// Example services array
const services: Service[] = [
  {
    icon: RiShieldCheckLine,
    title: 'Original Content',
    description: 'Only verified and quality books',
  },
  {
    icon: RiTruckLine,
    title: 'Fast Delivery',
    description: 'Instant access to digital content',
  },
  {
    icon: RiSecurePaymentLine,
    title: 'Secure Payments',
    description: 'Multiple secure payment options',
  },
  {
    icon: RiCheckLine,
    title: 'Money-back Guarantee',
    description: '30-day satisfaction guarantee',
  },
];

// Animation variants for staggering child elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Main Home component
 * Displays:
 * - Hero section with animated background
 * - Services
 * - Trending books
 * - Discount highlight
 * - Upcoming books
 * - Testimonials
 * - Newsletter signup
 * - Scroll-to-top floating button
 */
const Home = () => {
  const { showAlert } = useAlert();

  // Add style tag for keyframes animations
  const keyframesStyle = `
    @keyframes scroll {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(-800px, -800px);
      }
    }
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `;

  // Button to scroll back up
  const [showScrollTop, setShowScrollTop] = useState(false);
  // Local tracking of which books have been "liked"
  const [likedBooks, setLikedBooks] = useState<Record<number, boolean>>({});

  // When the user scrolls beyond a threshold (500px), show the scroll-up button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Scroll smoothly to a specific section by ID
   * This is triggered by an <a> or <button> "onClick" event.
   */
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /**
   * Scroll smoothly to the top of the page.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  /**
   * Add or remove book from "favorites" (liked list).
   */
  const addToFavorites = (book: Book) => {
    setLikedBooks((prev) => ({
      ...prev,
      [book.id]: !prev[book.id],
    }));
    const action = likedBooks[book.id] ? 'removed from' : 'added to';
    showAlert(`${book.title} ${action} favorites!`, 'success');
  };

  /**
   * Add selected book to cart in localStorage.
   * - If the book is already in cart, increase its quantity.
   * - Otherwise, add it with quantity = 1
   */
  const addToCart = (book: Book) => {
    const storedCart = localStorage.getItem('cartItems');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];

    const existingItemIndex = cartItems.findIndex(
      (item: Book) => item.id === book.id
    );

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      const existingItem = updatedCartItems[existingItemIndex];
      updatedCartItems[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 1) + 1,
      };
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    } else {
      const updatedCartItems = [...cartItems, { ...book, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }

    // Dispatch custom event to notify other components (e.g., a Cart badge)
    window.dispatchEvent(new Event('cartUpdated'));

    showAlert(`${book.title} added to cart!`, 'success');
  };

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      {/* Styles for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: keyframesStyle }} />
      
      {/* HERO SECTION with Tailwind animated background */}
      <div className="relative">
        {/* Animated background using Tailwind */}
        <div className="absolute inset-0 overflow-hidden z-10 opacity-20 dark:opacity-30">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-repeat"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(99, 102, 241, 0.8) 2px, transparent 0), 
                                radial-gradient(circle, rgba(139, 92, 246, 0.8) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px',
              animation: 'scroll 60s linear infinite'
            }}>
          </div>
        </div>
        
        <section
          id="home"
          className="min-h-[calc(100vh-4rem)] py-20 relative flex items-center overflow-hidden"
        >
          {/* Background image / overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90" />
            <img
              src="/assets/img/bg-books.jpg"
              alt="Book collection background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Hero content */}
          <div className="container mx-auto px-4 relative z-20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Left: Title and text */}
              <div className="md:w-1/2">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-gray-800 dark:text-white"
                >
                  Browse & <br /> Select E-Books
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl"
                >
                  Find the best e-books from your favorite writers, explore
                  hundreds of books with all possible categories, take advantage
                  of the 50% discount and much more.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="flex gap-4"
                >
                  <Link
                    to="/books"
                    className="button-gradient button-3d text-white px-8 py-3 rounded-lg font-medium shadow-md flex items-center justify-center"
                  >
                    Explore Now
                  </Link>
                  <a
                    href="#upcoming"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('upcoming');
                    }}
                    className="bg-transparent border-2 border-purple-600 text-purple-600 hover:bg-purple-600/10 px-8 py-3 rounded-lg font-medium transition-colors shadow-md button-pop flex items-center justify-center"
                  >
                    Upcoming Books
                  </a>
                </motion.div>
              </div>

              {/* Right: Floating "stacked" book images */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="md:w-1/2 flex justify-center relative"
              >
                <div className="grid grid-cols-3 gap-4">
                  <motion.img
                    whileHover={{
                      y: -10,
                      rotate: -3,
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    src="/assets/img/book-1.jpg"
                    alt="Book #1"
                    className="w-full object-contain rounded-lg shadow-xl aspect-[2/3] -rotate-6"
                    style={{ animation: 'float 3s ease-in-out infinite' }}
                  />
                  <motion.img
                    whileHover={{
                      y: -10,
                      rotate: 0,
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    src="/assets/img/book-2.jpg"
                    alt="Book #2"
                    className="w-full object-contain rounded-lg shadow-xl aspect-[2/3]"
                  />
                  <motion.img
                    whileHover={{
                      y: -10,
                      rotate: 3,
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                    src="/assets/img/book-3.jpg"
                    alt="Book #3"
                    className="w-full object-contain rounded-lg shadow-xl aspect-[2/3] rotate-6"
                    style={{ animation: 'float 3s ease-in-out infinite', animationDelay: '1.5s' }}
                  />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Curved SVG divider at the bottom of hero section */}
          <svg
            className="absolute bottom-0 left-0 w-full h-16 text-white dark:text-gray-900 fill-current"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            ></path>
          </svg>
        </section>
      </div>

      {/* 
        SERVICES SECTION
        Showcases your highlights or benefits using a 4-column grid.
      */}
      <section id="services" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Our Services
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience premium e-book services designed to enhance your
              reading journey.
            </p>
          </div>

          {/* Motion container for "staggering" child items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Map over services array */}
            {services.map((service, index) => {
              // Manually render the icons based on the service type
              let Icon;
              if (service.icon === RiShieldCheckLine) {
                Icon = <RiShieldCheckLine className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />;
              } else if (service.icon === RiTruckLine) {
                Icon = <RiTruckLine className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />;
              } else if (service.icon === RiSecurePaymentLine) {
                Icon = <RiSecurePaymentLine className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />;
              } else if (service.icon === RiCheckLine) {
                Icon = <RiCheckLine className="text-4xl text-purple-600 dark:text-purple-400 mb-4" />;
              }
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-2"
                >
                  <div className="flex justify-center">
                    {Icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 
        TRENDING BOOKS SECTION
        Uses a Swiper carousel with an effectCoverflow effect
      */}
      <section id="trending" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">
              Trending Books
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover the most popular books that readers are enjoying right
              now. Perfect for your next reading adventure.
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2,
                slideShadows: false,
              }}
              speed={800}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              className="pb-16"
            >
              {trendingBooks.map((book) => (
                <SwiperSlide key={book.id} className="py-8">
                  <motion.div
                    whileHover={{ y: -15, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    className="card h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative overflow-hidden group">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full aspect-[2/3] object-contain transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-2 right-2 flex gap-2">
                        {/* "Add to Favorites" */}
                        <AnimatePresence mode="wait">
                          <motion.button
                            key={`like-${book.id}-${
                              likedBooks[book.id] ? 'active' : 'inactive'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={() => addToFavorites(book)}
                            className={`p-2 rounded-full shadow-md z-10 ${
                              likedBooks[book.id]
                                ? 'bg-red-500 text-white'
                                : 'bg-white/90 hover:bg-purple-600 hover:text-white'
                            } transition-colors button-pop`}
                            aria-label="Add to favorites"
                          >
                            <RiHeartLine className="text-lg" />
                          </motion.button>
                        </AnimatePresence>

                        {/* "View Details" */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            to={`/details/${book.id}`}
                            className="p-2 bg-white/90 rounded-full shadow-md hover:bg-purple-600 hover:text-white transition-colors block z-10"
                            aria-label="View details"
                          >
                            <RiEyeLine className="text-lg" />
                          </Link>
                        </motion.div>
                      </div>
                      {/* "Add to Cart" button appears on hover at the bottom */}
                      <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      >
                        <button
                          onClick={() => addToCart(book)}
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
                        >
                          <RiShoppingCartLine className="mr-2" /> Add to Cart
                        </button>
                      </motion.div>
                    </div>

                    {/* Book info */}
                    <div className="p-5 flex-grow flex flex-col dark:text-white">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                        {book.author}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: Math.floor(book.rating) }).map(
                            (_, i) => (
                              <RiStarFill key={i} />
                            )
                          )}
                          {book.rating % 1 !== 0 && <RiStarHalfFill />}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          ({book.rating})
                        </span>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-purple-600 dark:text-purple-400 font-semibold">
                              ${book.discount}
                            </span>
                            <span className="text-gray-400 line-through ml-2 text-sm">
                              ${book.price}
                            </span>
                          </div>
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                            {Math.round(
                              ((book.price - book.discount) / book.price) * 100
                            )}
                            % OFF
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(book)}
                          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
                        >
                          <RiShoppingCartLine className="mr-2" /> Add to Cart
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* 
        DISCOUNT SECTION 
        Highlight discounted items
      */}
      <section id="discount" className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Floating images or single discount image */}
            <div className="flex justify-center">
              <div className="relative transform">
                <motion.div
                  initial={{ rotate: -6, x: 0 }}
                  whileInView={{ rotate: -6, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="mb-6"
                >
                  <img
                    src="/assets/img/book-1.jpg"
                    alt="Discounted Book #1"
                    className="w-48 h-auto object-contain rounded-lg shadow-xl aspect-[2/3]"
                  />
                </motion.div>

                <motion.div
                  initial={{ rotate: 6, x: 0, y: 0 }}
                  whileInView={{ rotate: 12, x: 30, y: 30 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="absolute top-0 left-0"
                >
                  <img
                    src="/assets/img/book-2.jpg"
                    alt="Discounted Book #2"
                    className="w-48 h-auto object-contain rounded-lg shadow-xl aspect-[2/3]"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right: Text & CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 dark:text-white">
                Up To 60% Discount
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-600 mb-6"></div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Take advantage of the discount days we have for you: buy books
                from your favorite writers, the more you buy, the more discounts
                we offer. Never miss a special offer on the books you love.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs mr-3">
                    ✓
                  </span>
                  <span className="dark:text-gray-300">
                    Access to exclusive promotional prices
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs mr-3">
                    ✓
                  </span>
                  <span className="dark:text-gray-300">
                    Monthly membership discounts available
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs mr-3">
                    ✓
                  </span>
                  <span className="dark:text-gray-300">
                    Special bundle offers for series and collections
                  </span>
                </li>
              </ul>
              <Link
                to="/books"
                className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 
        UPCOMING BOOKS SECTION
        A standard grid layout with small book previews and "coming soon" label
      */}
      <section id="upcoming" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
              Upcoming Books
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Be the first to know about our newest releases and upcoming titles.
              Pre-order now to secure your copy.
            </p>
          </div>

          {/* Motion container for the cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {upcomingBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.02,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex p-4">
                  <div className="w-1/3">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <div className="w-2/3 pl-4 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1 uppercase tracking-wider">
                        Coming Soon
                      </div>
                      <h3 className="text-lg font-semibold line-clamp-1 dark:text-white">
                        {book.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {book.author}
                      </p>
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: Math.floor(book.rating) }).map(
                            (_, i) => (
                              <RiStarFill key={i} />
                            )
                          )}
                          {book.rating % 1 !== 0 && <RiStarHalfFill />}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-purple-600 dark:text-purple-400 font-semibold">
                          ${book.discount}
                        </span>
                        <span className="text-gray-400 line-through ml-2">
                          ${book.price}
                        </span>
                        <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-0.5 rounded-full">
                          Save{' '}
                          {Math.round(
                            ((book.price - book.discount) / book.price) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToFavorites(book)}
                          className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full shadow-sm hover:bg-purple-600 hover:text-white transition-colors button-pop"
                          aria-label="Add to favorites"
                        >
                          <RiHeartLine className="text-lg" />
                        </motion.button>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Link
                            to={`/details/${book.id}`}
                            className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full shadow-sm hover:bg-purple-600 hover:text-white transition-colors block"
                            aria-label="View details"
                          >
                            <RiEyeLine className="text-lg" />
                          </Link>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              to="/books"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-lg"
            >
              View All Upcoming Books
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Scroll-to-top button floating at bottom-right */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-8 bottom-8 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <RiArrowUpLine size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default Home;
