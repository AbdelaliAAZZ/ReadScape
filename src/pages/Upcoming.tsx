import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiStarFill, RiStarHalfFill } from 'react-icons/ri';

const Upcoming = () => {
 
  const upcomingBooks = [
    {
      id: 1,
      title: 'The Fund',
      price: 19.99,
      discount: 15.99,
      image: 'assets/img/book-1.jpg',
      rating: 4.5,
    },
    {
      id: 2,
      title: 'Think Again',
      author: 'Adam Grant',
      price: 24.99,
      discount: 10.99,
      image: 'assets/img/book-2.jpg',
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Can\'t Hurt Me',
      author: 'David Goggins',
      price: 14.99,
      discount: 7.99,
      image: 'assets/img/book-3.jpg',
      rating: 4.5,
    },
    {
      id: 4,
      title: '1984',
      author: 'George Orwell',
      price: 12.99,
      discount: 6.99,
      image: 'assets/img/book-4.jpg',
      rating: 4.5,
    },
    {
      id: 5,
      title: 'Crime and Punishment',
      author: 'Fyodor Dostoevsky',
      price: 10.99,
      discount: 5.99,
      image: 'assets/img/book-5.jpg',
      rating: 4.5,
    },
    {
      id: 6,
      title: 'Rework',
      author: 'Jason Fried',
      price: 20.99,
      discount: 10.99,
      image: 'assets/img/book-6.jpg',
      rating: 4.5,
    },
  ];

  // Testimonials/reviews data
  const testimonials = [
    {
      id: 1,
      name: 'Sofia',
      comment: 'ReadScape has truly transformed my reading habits.',
      rating: 4.5,
      image: 'assets/img/testimonial-perfil-1.jpg',
    },
    {
      id: 2,
      name: 'Ali Richard',
      comment: 'I\'ve been using ReadScape for a while now, and it never disappoints. The website is well-organized.',
      rating: 4.5,
      image: 'assets/img/testimonial-perfil-2.jpg',
    },
    {
      id: 3,
      name: 'Emma',
      comment: 'ReadScape is my go-to e-book website for its incredible selection and user-friendly interface.',
      rating: 5,
      image: 'assets/img/testimonial-perfil-3.jpg',
    },
    {
      id: 4,
      name: 'Ahmed',
      comment: 'The collection is vast, catering to all tastes, and the responsive customer support adds an extra layer.',
      rating: 4.5,
      image: 'assets/img/testimonial-perfil-4.jpg',
    },
  ];

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
      {/* Upcoming Books Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <h2 className="text-3xl font-bold text-center">🎈 Upcoming Books 🎈</h2>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {upcomingBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="flex p-4">
                  <div className="w-1/3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  </div>
                  <div className="w-2/3 pl-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">Upcoming Book</h3>
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex text-purple-500">
                          <RiStarFill />
                          <RiStarFill />
                          <RiStarFill />
                          <RiStarFill />
                          <RiStarHalfFill />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-accent font-semibold">${book.discount}</span>
                        <span className="text-gray-500 line-through ml-2">${book.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Discount Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative transform -rotate-6">
                <img
                  src="assets/img/discount-book-1.jpg"
                  alt="The Little Prince"
                  className="w-48 h-64 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="assets/img/discount-book-2.jpg"
                  alt="The Big Short"
                  className="absolute top-12 left-24 w-48 h-64 object-cover rounded-lg shadow-lg transform rotate-12"
                />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Up To 60% Discount</h2>
              <p className="text-gray-600 mb-8">
                Take advantage of the discount days we have for you, buy books
                from your favorite writers, the more you buy, the more
                discounts we have for you.
              </p>
              <Link
                to="/books"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <h2 className="text-3xl font-bold text-center">📝 Customer Reviews 📝</h2>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md overflow-hidden p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <div className="flex text-yellow-400">
                      {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                        <RiStarFill key={i} />
                      ))}
                      {testimonial.rating % 1 !== 0 && (
                        <RiStarHalfFill />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.comment}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Upcoming; 