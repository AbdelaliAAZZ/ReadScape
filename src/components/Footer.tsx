import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiHeartFill,
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramLine,
  RiMailLine,
  RiPhoneLine,
  RiMapPinLine,
  RiArrowUpLine
} from 'react-icons/ri';
import Logo from './Logo';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover a world of knowledge and adventure through our carefully curated collection of books from renowned authors and publishers.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                aria-label="Facebook"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white transition-colors button-pop"
              >
                <RiFacebookFill />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white transition-colors button-pop"
              >
                <RiTwitterFill />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-600 hover:text-white transition-colors button-pop"
              >
                <RiInstagramLine />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Browse Books</Link>
              </li>
              <li>
                <Link to="/#trending" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Trending Books</Link>
              </li>
              <li>
                <Link to="/#upcoming" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Upcoming Releases</Link>
              </li>
              <li>
                <Link to="/#testimonials" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books?category=fiction" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Fiction</Link>
              </li>
              <li>
                <Link to="/books?category=non-fiction" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Non-Fiction</Link>
              </li>
              <li>
                <Link to="/books?category=fantasy" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Fantasy</Link>
              </li>
              <li>
                <Link to="/books?category=science-fiction" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Science Fiction</Link>
              </li>
              <li>
                <Link to="/books?category=mystery" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Mystery & Thriller</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <RiMapPinLine className="mt-1 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">123 Book Street, Library City, RC 54321</span>
              </li>
              <li className="flex items-center">
                <RiPhoneLine className="text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">+212 0673 170 737</span>
              </li>
              <li className="flex items-center">
                <RiMailLine className="text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">info@readscape.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © {currentYear} ReadScape. All rights reserved. Made with <RiHeartFill className="inline text-red-500" /> for book lovers.
          </p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
              Terms of Service
            </Link>
            <button 
              onClick={scrollToTop} 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors button-3d"
              aria-label="Scroll to top"
            >
              <RiArrowUpLine className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 