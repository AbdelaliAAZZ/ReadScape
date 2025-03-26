import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckboxCircleFill, RiErrorWarningFill, RiInformationFill, RiCloseLine } from 'react-icons/ri';

export type AlertType = 'success' | 'error' | 'info';

interface CustomAlertProps {
  message: string;
  type: string;
  isVisible?: boolean;
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  type,
  isVisible = true,
  onClose = () => {}
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, [isVisible, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <RiCheckboxCircleFill className="text-2xl" />;
      case 'error':
        return <RiErrorWarningFill className="text-2xl" />;
      case 'info':
      default:
        return <RiInformationFill className="text-2xl" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-500';
      case 'error':
        return 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-500';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'info':
      default:
        return 'text-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
          role="alert"
        >
          <div className={`${getBgColor()} ${getTextColor()} border-l-4 p-4 rounded-md shadow-lg flex items-center gap-3`}>
            {getIcon()}
            <div className="flex-1">{message}</div>
            <button 
              onClick={onClose} 
              className="p-1 hover:bg-gray-200 hover:bg-opacity-50 rounded-full transition-colors"
              aria-label="Close alert"
            >
              <RiCloseLine className="text-xl" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomAlert; 