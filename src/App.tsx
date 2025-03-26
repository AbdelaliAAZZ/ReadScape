import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useContext, useState } from 'react';
import Home from './pages/Home';
import Books from './pages/Books';
import Details from './pages/Details';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import CustomAlert from './components/CustomAlert';


// Alert context for showing notifications across the app
interface AlertContextType {
  showAlert: (message: string, type?: string) => void;
}

export const AlertContext = createContext<AlertContextType>({
  showAlert: () => {},
});

export const useAlert = () => useContext(AlertContext);

function App() {
  const [alert, setAlert] = useState<{ message: string; type: string; show: boolean }>({
    message: '',
    type: 'success',
    show: false,
  });

  // Function to show alert notification
  const showAlert = (message: string, type = 'success') => {
    setAlert({ message, type, show: true });
    setTimeout(() => {
      setAlert(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      <Router>
        <div className="min-h-screen flex flex-col dark:bg-gray-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<Books />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
             
            </Routes>
          </main>
          {alert.show && <CustomAlert message={alert.message} type={alert.type} />}
        </div>
      </Router>
    </AlertContext.Provider>
  );
}

export default App;
