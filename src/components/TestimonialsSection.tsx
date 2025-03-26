import { motion } from 'framer-motion';
import { RiStarFill } from 'react-icons/ri';
import { testimonials } from '../data/books';
// Import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 dark:from-purple-900/20 dark:to-blue-900/20"></div>
        <div className="absolute top-10 left-20 w-24 h-24 bg-purple-400/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block bg-purple-600/20 text-purple-600 dark:bg-purple-400/20 dark:text-purple-400 px-4 py-1 rounded-full text-sm font-medium mb-4"
          >
            Testimonial
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 dark:text-white"
          >
            What Our Clients Say About Services
          </motion.h2>
        </div>

        {/* Testimonials using Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="py-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.3)',
                }}
                className="p-6 rounded-xl h-full backdrop-blur-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 relative"
              >
                <div className="text-purple-600 dark:text-purple-400 text-5xl font-serif absolute -top-3 left-6">
                  "
                </div>
                <div className="mb-6 pt-6">
                  <h3 className="text-xl font-semibold mb-1 dark:text-white">
                    "I'm Totally Blown Away"
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
                    {testimonial.comment}
                  </p>
                </div>
                <div className="flex text-yellow-400 gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <RiStarFill 
                      key={i} 
                      className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                      size={20} 
                    />
                  ))}
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-purple-600/20 dark:ring-purple-400/20"
                  />
                  <div>
                    <h4 className="font-medium text-sm dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                      CEO at {testimonial.company || 'Company'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection; 