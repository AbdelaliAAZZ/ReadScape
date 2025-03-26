// Book type definition
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  discount: number;
  image: string;
  rating: number;
  category?: string;
  description?: string;
  reviews?: Review[];
  quantity?: number; // For cart functionality
  format?: string; // Book format (Paperback, Hardcover, etc.)
}

export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

// Service type definition
export interface Service {
  icon: React.ComponentType;
  title: string;
  description: string;
}

// Featured books array
export const trendingBooks: Book[] = [
  {
    id: 1,
    title: 'The Fund',
    author: 'Rob Copeland',
    price: 19.99,
    discount: 15.99,
    image: '/assets/img/book-1.jpg',
    rating: 4.5,
    description: 'A riveting inside look at the hidden world of hedge funds and the fascinating story of Ray Dalio, founder of Bridgewater Associates.',
  },
  {
    id: 2,
    title: 'Think Again',
    author: 'Adam Grant',
    price: 24.99,
    discount: 10.99,
    image: '/assets/img/book-2.jpg',
    rating: 4.5,
    description: 'The power of knowing what you don\'t know and learning to rethink your opinions and open other people\'s minds.',
  },
  {
    id: 3,
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    price: 14.99,
    discount: 7.99,
    image: '/assets/img/book-3.jpg',
    rating: 4.5,
    description: 'Master Your Mind and Defy the Odds. The inspiring life story of an ex-Navy SEAL who transformed his life through mental toughness.',
  },
  {
    id: 4,
    title: '1984',
    author: 'George Orwell',
    price: 12.99,
    discount: 6.99,
    image: '/assets/img/book-4.jpg',
    rating: 4.5,
    description: 'The classic dystopian novel that continues to captivate readers with its chilling vision of a totalitarian future.',
  },
  {
    id: 5,
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    price: 10.99,
    discount: 5.99,
    image: '/assets/img/book-5.jpg',
    rating: 4.5,
    description: 'A psychological thriller that examines the mental anguish and moral dilemmas of Raskolnikov, a poor ex-student in Saint Petersburg.',
  },
  {
    id: 6,
    title: 'The 5AM Club',
    author: 'Robin Sharma',
    price: 20.99,
    discount: 10.99,
    image: '/assets/img/book-6.jpg',
    rating: 4.5,
    description: 'Own Your Morning. Elevate Your Life. A guide to maximizing productivity, improving health, and achieving success.',
  }
];

// Upcoming books data
export const upcomingBooks: Book[] = [
  {
    id: 7,
    title: 'The Snowball',
    author: 'Warren Buffett',
    price: 19.99,
    discount: 15.99,
    image: '/assets/img/book-7.jpg',
    rating: 4.5,
    description: 'The personally revealing and complete biography of the man known everywhere as "The Oracle of Omaha"—for fans of the HBO documentary Becoming Warren Buffett. Here is the book recounting the life and times of one of the most respected men in the world, Warren Buffett. The legendary Omaha investor has never written a memoir, but now he has allowed one writer, Alice Schroeder, unprecedented access to explore directly with him and with those closest to him his work, opinions, struggles, triumphs, follies, and wisdom.',
    reviews: [
      {
        id: 1,
        user: 'John Doe',
        rating: 5,
        comment: 'This book changed my approach to investing entirely. Buffett\'s wisdom is timeless and the biography is exceptionally well written.',
        date: '2023-05-15'
      },
      {
        id: 2,
        user: 'Jane Smith',
        rating: 4,
        comment: 'A comprehensive look at one of the greatest investors of all time. The only reason I didn\'t give 5 stars is because it\'s quite long.',
        date: '2023-04-22'
      },
      {
        id: 3,
        user: 'Robert Johnson',
        rating: 5,
        comment: 'Essential reading for anyone interested in finance, business, or remarkable life stories.',
        date: '2023-03-10'
      }
    ]
  },
  {
    id: 8,
    title: 'The Art of War',
    author: 'Sun Tzu',
    price: 24.99,
    discount: 10.99,
    image: '/assets/img/book-8.jpg',
    rating: 4.5,
    description: 'An ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters. Each one is devoted to an aspect of warfare and how it applies to military strategy and tactics.',
  },
  {
    id: 9,
    title: 'Power',
    author: 'Robert Greene',
    price: 14.99,
    discount: 7.99,
    image: '/assets/img/book-9.jpg',
    rating: 4.5,
    description: 'The 48 Laws of Power by Robert Greene is a self-help book offering advice on how to gain and maintain power, using lessons drawn from parables and the experiences of historical figures.',
  }
];

// Get a book by ID from all books
export const getBookById = (id: number): Book | undefined => {
  const allBooks = [...trendingBooks, ...upcomingBooks];
  return allBooks.find(book => book.id === id);
};

// Testimonials data
export interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  comment: string;
  company: string; // Adding company field for testimonials
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sofia Thompson',
    comment: 'ReadScape has truly transformed my reading habits. I\'ve discovered so many new authors and genres I wouldn\'t have found otherwise.',
    rating: 4.5,
    image: '/assets/img/testimonial-perfil-1.jpg',
    company: 'WordPress'
  },
  {
    id: 2,
    name: 'Ali Richard',
    comment: 'I\'ve been using ReadScape for a while now, and it never disappoints. The website is well-organized, making it easy to find exactly what I\'m looking for.',
    rating: 4.5,
    image: '/assets/img/testimonial-perfil-2.jpg',
    company: 'Stack'
  },
  {
    id: 3,
    name: 'Emma Watson',
    comment: 'ReadScape is my go-to e-book website for its incredible selection and user-friendly interface. The personalized recommendations are spot on!',
    rating: 5,
    image: '/assets/img/testimonial-perfil-3.jpg',
    company: 'Microsoft'
  },
  {
    id: 4,
    name: 'Ahmed Khan',
    comment: 'The collection is vast, catering to all tastes, and the responsive customer support adds an extra layer of excellence to the experience.',
    rating: 4.5,
    image: '/assets/img/testimonial-perfil-4.jpg',
    company: 'Vercel'
  }
];

// Add function to return all books
export const getAllBooks = (): Book[] => {
  return [...trendingBooks, ...upcomingBooks];
};

// Export combined books array for direct import
export const books = [...trendingBooks, ...upcomingBooks]; 