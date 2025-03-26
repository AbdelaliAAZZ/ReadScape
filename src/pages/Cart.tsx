import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight, FiCreditCard } from 'react-icons/fi';
import { RiWhatsappLine } from 'react-icons/ri';
import { Book } from '../data/books';
import { useAlert } from '../App';
import Footer from '../components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState<Book[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'mastercard' | 'whatsapp'>('mastercard');
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Load cart items from localStorage
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.discount || item.price;
    const quantity = item.quantity || 1;
    return sum + (price * quantity);
  }, 0);
  
  const shipping = subtotal > 100 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Handle quantity changes
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Handle item removal
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));
    
    showAlert('Item removed from cart', 'success');
  };

  // Handle WhatsApp checkout
  const handleWhatsAppCheckout = () => {
    // Create order summary
    let orderSummary = "Hello, I would like to order the following books:\n\n";
    
    cartItems.forEach(item => {
      const quantity = item.quantity || 1;
      const itemPrice = item.discount || item.price;
      const itemTotal = itemPrice * quantity;
      
      orderSummary += `* ${item.title} by ${item.author}\n`;
      orderSummary += `  Quantity: ${quantity}\n`;
      orderSummary += `  Price: $${itemPrice.toFixed(2)} × ${quantity} = $${itemTotal.toFixed(2)}\n\n`;
    });
    
    orderSummary += `Subtotal: $${subtotal.toFixed(2)}\n`;
    orderSummary += `Shipping: ${shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}\n`;
    orderSummary += `Total Order Amount: $${total.toFixed(2)}\n\n`;
    orderSummary += "Please confirm this order. Thank you!";
    
    // Open WhatsApp with pre-filled message
    const encodedMessage = encodeURIComponent(orderSummary);
    window.open(`https://wa.me/2120673170737?text=${encodedMessage}`, '_blank');
    
    showAlert('Redirecting to WhatsApp to complete your order!', 'success');
  };

  // Handle MasterCard checkout
  const handleMasterCardCheckout = () => {
    navigate('/checkout');
    showAlert('Proceeding to checkout', 'success');
  };

  // Handle checkout based on selected payment method
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      showAlert('Your cart is empty!', 'error');
      return;
    }
    
    if (paymentMethod === 'whatsapp') {
      handleWhatsAppCheckout();
    } else {
      handleMasterCardCheckout();
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <div className="container mx-auto px-4 flex-grow">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6">Your cart is empty</h2>
            <Link 
              to="/books" 
              className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold dark:text-white">Items ({cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0)})</h2>
                </div>
                
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <motion.li 
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 flex flex-col sm:flex-row items-center"
                    >
                      <div className="flex-shrink-0 w-24 h-36 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-4 mb-4 sm:mb-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-contain" 
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium dark:text-white">{item.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{item.author}</p>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          Format: {item.format || 'Paperback'}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border rounded-md dark:border-gray-600">
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                              className="px-3 py-1 border-r dark:border-gray-600 dark:text-gray-300"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-1 dark:text-white">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                              className="px-3 py-1 border-l dark:border-gray-600 dark:text-gray-300"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center">
                            <span className="font-medium mr-4 dark:text-white">
                              ${((item.discount || item.price) * (item.quantity || 1)).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
                
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <Link 
                    to="/books" 
                    className="text-purple-600 dark:text-purple-400 hover:underline flex items-center"
                  >
                    <FiArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Order Summary */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-semibold dark:text-white">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 italic">
                      Free shipping on orders over $100
                    </div>
                  )}
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="flex justify-between font-semibold">
                      <span className="dark:text-white">Total</span>
                      <span className="dark:text-white">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Payment Method Selection */}
                <div className="px-6 pb-4">
                  <h3 className="font-medium mb-3 dark:text-white">Payment Method</h3>
                  <div className="flex gap-3 mb-6">
                    <div
                      className={`flex-1 border rounded-lg p-3 cursor-pointer transition-all ${
                        paymentMethod === 'mastercard' 
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('mastercard')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          paymentMethod === 'mastercard' ? 'border-purple-600' : 'border-gray-400'
                        }`}>
                          {paymentMethod === 'mastercard' && (
                            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <FiCreditCard className="mr-2 text-gray-700 dark:text-gray-300" />
                          <span className="font-medium dark:text-white">Credit Card</span>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      className={`flex-1 border rounded-lg p-3 cursor-pointer transition-all ${
                        paymentMethod === 'whatsapp' 
                          ? 'border-green-600 bg-green-50 dark:bg-green-900/20' 
                          : 'border-gray-200 dark:border-gray-700'
                      }`}
                      onClick={() => setPaymentMethod('whatsapp')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                          paymentMethod === 'whatsapp' ? 'border-green-600' : 'border-gray-400'
                        }`}>
                          {paymentMethod === 'whatsapp' && (
                            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <RiWhatsappLine className="mr-2 text-green-600" />
                          <span className="font-medium dark:text-white">WhatsApp</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 pt-0">
                  <button 
                    onClick={handleCheckout}
                    className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center font-medium ${
                      paymentMethod === 'mastercard'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {paymentMethod === 'mastercard' ? (
                      <>
                        <FiCreditCard className="mr-2" />
                        Proceed to Payment
                      </>
                    ) : (
                      <>
                        <RiWhatsappLine className="mr-2" />
                        Checkout via WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart; 