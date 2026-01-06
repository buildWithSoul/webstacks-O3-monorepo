'use client';

import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import type { FC } from 'react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  formComponent?: ReactNode;
  title?: string;
  // Legacy props for backward compatibility
  formId?: string;
}

export const FormModal: FC<FormModalProps> = ({ isOpen, onClose, children, formComponent, formId, title }) => {
  // Handle escape key press and body scroll lock
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Animations reused from VideoModal
  const backdropVariants: Variants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(8px)', transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, backdropFilter: 'blur(0px)', transition: { duration: 0.2, ease: 'easeIn' } },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.7, rotateX: -15, y: 100, z: -200 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      z: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300, mass: 0.8 },
    },
    exit: { opacity: 0, scale: 0.8, rotateX: 10, y: -50, z: -100, transition: { duration: 0.25, ease: 'easeIn' } },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
  };

  const modalContent = (
    <AnimatePresence mode="wait">
        <motion.div
          className={`fixed inset-0 z-100 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}
          style={{ perspective: '1000px', width: '100vw', height: '100vh', top: 0, left: 0, position: 'fixed' }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div className="fixed inset-0 w-full h-full bg-black/80" variants={backdropVariants} onClick={onClose} />

          <motion.div
            className="relative z-10 w-full max-w-2xl mx-4 bg-white dark:bg-zinc-900 rounded-2xl overflow-auto min-w-144"
            style={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)', maxHeight: '90vh' }}
            variants={modalVariants}
          >
            <motion.div className="relative p-6" variants={contentVariants}>
              {title && (
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
              )}
              {/* Generic form content */}
              {(children || formComponent) ? (
                formComponent || children
              ) : (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium">No form component provided</p>
                  <p className="text-xs text-gray-500 mt-1">Pass a form component via `formComponent` prop or `children`</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
};
