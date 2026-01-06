"use client";

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { Icon } from '../../atoms';

interface InlineIconProps {
  value: { icon: string };
  index?: number;
  scrollYProgress?: any;
  totalChars?: number;
}

export const InlineIcon = ({ value, index = 0, scrollYProgress, totalChars = 1 }: InlineIconProps) => {
  if (!value?.icon) return null;

  // If no scroll animation props are provided, render static icon
  if (!scrollYProgress) {
    return (
      <span className="inline-block align-baseline relative mx-1" style={{ transform: 'translateY(-0.05em)' }}>
        <Icon icon={value.icon} size={56} />
      </span>
    );
  }

  // Calculate staggered animation based on icon position
  const staggerOffset = index / totalChars * 0.3; // Match balanced text reveal timing
  
  // Transform scroll progress to create reveal effect
  const revealProgress = useTransform(
    scrollYProgress, 
    [0, 0.225 + staggerOffset, 0.275 + staggerOffset, 1], // Match delayed text reveal timing
    [0, 0, 1, 1]
  );
  
  // Create opacity transition
  const opacity = useTransform(revealProgress, (value) => {
    return value > 0.5 ? 1 : 0.5;
  });

  // Special rocket animation - realistic launch trajectory
  const isRocket = value.icon.includes('rocket') || value.icon.includes('rocketship');
  
  // Calculate when this rocket should launch (immediately when it becomes visible)
  const rocketLaunchStart = 0.275 + staggerOffset; // Launch exactly when rocket becomes visible (delayed timing)
  const rocketLaunchEnd = rocketLaunchStart + 0.15; // Longer animation duration for more dramatic effect
  
  // Rocket flies off at 45-degree angle with much greater distance
  const rocketX = useTransform(
    scrollYProgress,
    [rocketLaunchStart, rocketLaunchEnd],
    [0, isRocket ? 400 : 0] // Double horizontal movement for more dramatic effect
  );
  
  const rocketY = useTransform(
    scrollYProgress,
    [rocketLaunchStart, rocketLaunchEnd], 
    [0, isRocket ? -500 : 0] // Much more vertical movement - rocket zooms way up!
  );
  
  // Rocket gets smaller as it goes into the distance - but stays larger longer
  const rocketScale = useTransform(
    scrollYProgress,
    [rocketLaunchStart, rocketLaunchStart + 0.08, rocketLaunchStart + 0.12, rocketLaunchEnd],
    [1, isRocket ? 1.2 : 1, isRocket ? 0.6 : 1, isRocket ? 0.05 : 1] // Grows first, then shrinks more gradually
  );
  
  // Rocket blurs as it gets farther away - more gradual blur
  const rocketBlur = useTransform(
    scrollYProgress,
    [rocketLaunchStart, rocketLaunchStart + 0.08, rocketLaunchEnd],
    [0, isRocket ? 1 : 0, isRocket ? 12 : 0] // More dramatic blur effect
  );
  
  // Rocket fades out as it disappears - stays visible longer
  const rocketOpacity = useTransform(
    scrollYProgress,
    [rocketLaunchStart, rocketLaunchEnd - 0.04, rocketLaunchEnd],
    [1, isRocket ? 0.8 : 1, isRocket ? 0 : 1] // Stays more visible longer before fading
  );
  
  // Subtle rotation for non-rocket icons only
  const rotation = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isRocket ? 0 : 8] // No rotation for rockets, slight wiggle for others
  );
  
  // Scale animation that triggers when icon is revealed - more pronounced and fun!
  const scale = useTransform(
    revealProgress,
    [0, 0.5, 1],
    [1, 1.3, 1.05] // Dramatic scale up when revealed, then settle slightly larger
  );

  // Special playful hover effects for first two icons
  const isFirstTwoIcons = index <= 1;
  const getHoverEffect = () => {
    if (isRocket) {
      return {}; // No hover effect for rockets - they have their launch animation
    }
    if (isFirstTwoIcons) {
      return {
        scale: 1.2,
        rotate: index === 0 ? -8 : 8, // First icon tilts left, second tilts right
        y: -4, // Slight bounce up
        transition: { 
          type: "spring" as const, 
          stiffness: 500, 
          damping: 12
        }
      };
    }
    return {
      scale: 1.1,
      rotate: 3,
      transition: { type: "spring" as const, stiffness: 400, damping: 15 }
    };
  };

  return (
    <motion.span
      className="inline-block align-baseline relative mx-1"
      style={{
        // opacity: isRocket ? rocketOpacity : opacity,
        // transform: `translateY(-0.05em)`,
        scale: isRocket ? rocketScale : scale,
        rotate: rotation,
        x: rocketX,
        y: rocketY,
        // filter: isRocket ? `blur(${rocketBlur}px)` : 'none'
      }}
      initial={{ 
        opacity: 0.5,
        scale: 0.6 // Start much smaller for dramatic entrance
      }}
      animate={{
        scale: 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, // Bouncier spring
        damping: 20, // Less damping for more bounce
        delay: staggerOffset * 0.05
      }}
      whileHover={getHoverEffect()}
    >
      <Icon icon={value.icon} size={56} />
    </motion.span>
  );
};

// Static version for use in regular rich text (non-animated contexts)
export const StaticInlineIcon = ({ value }: { value: { icon: string } }) => {
  if (!value?.icon) return null;

  const isRocket = value.icon.includes('rocket') || value.icon.includes('rocketship');

  return (
    <motion.span 
      className="inline-block align-baseline relative mx-1" 
      style={{ y: '0.15em' }}
      initial={{ scale: 0.95, opacity: 0.8 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 20,
        duration: 0.4
      }}
      whileHover={{
        scale: 1.1,
        rotate: isRocket ? 10 : 3,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
    >
      <Icon icon={value.icon} size={56} />
    </motion.span>
  );
};
