'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import type { FC } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  title?: string;
  videoType?: string;
}

export const VideoModal: FC<VideoModalProps> = ({ isOpen, onClose, videoId, title, videoType = 'youtube' }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Animation variants for the backdrop
  const backdropVariants: Variants = {
    hidden: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
    },
    visible: {
      opacity: 1,
      backdropFilter: 'blur(8px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  // Animation variants for the modal container
  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      rotateX: -15,
      y: 100,
      z: -200,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      y: 0,
      z: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateX: 10,
      y: -50,
      z: -100,
      transition: {
        duration: 0.25,
        ease: 'easeIn',
      },
    },
  };



  // Animation variants for the video container
  const videoVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Portal the modal to document.body to ensure proper viewport positioning
  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            perspective: '1000px',
            width: '100vw',
            height: '100vh',
            top: 0,
            left: 0,
            position: 'fixed',
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Animated Backdrop */}
          <motion.div 
            className="fixed inset-0 w-full h-full bg-black/80"
            style={{
              width: '100vw',
              height: '100vh',
            }}
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal Content with 3D Transform */}
          <motion.div 
            className="relative z-10 w-full max-w-6xl mx-4 bg-black rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              transformStyle: 'preserve-3d',
              maxHeight: '90vh',
            }}
            variants={modalVariants}
          >
            {/* Animated Video Container */}
            <motion.div 
              className="relative bg-black overflow-hidden w-full aspect-video mmd:w-auto md:min-h-[400px]"
              variants={videoVariants}
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 w-full h-full">
                {videoType === 'wistia' ? (
                  <iframe
                    src={`https://fast.wistia.net/embed/iframe/${videoId}?autoPlay=true&videoFoam=true`}
                    title={title || 'Wistia Video'}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{
                      border: 'none',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&controls=1&showinfo=0&fs=1&cc_load_policy=0&iv_load_policy=3&autohide=0`}
                    title={title || 'YouTube Video'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{
                      border: 'none',
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Only render portal on client side to avoid hydration issues
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(modalContent, document.body);
};
