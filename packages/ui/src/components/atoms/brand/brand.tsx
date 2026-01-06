'use client';

import React from 'react';
import Image from 'next/image';
import { StoryblokSiteSettings } from '../../../types/storyblok-site-settings';

export interface BrandProps {
  /**
   * The siteSettings data containing logotype information
   */
  siteSettings?: StoryblokSiteSettings | null;
  
  /**
   * Which variant of the logotype to display
   */
  variant?: 'light' | 'dark';
  
  /**
   * Optional custom width for the logotype
   */
  width?: number;
  
  /**
   * Optional custom height for the logotype
   */
  height?: number;
  
  /**
   * Additional CSS classes to apply
   */
  className?: string;
  
  /**
   * Whether to prioritize loading this image
   */
  priority?: boolean;
}

/**
 * Brand component that renders the site logotype
 * Can render either the light or dark variant based on props
 */
export function Brand({
  siteSettings,
  variant = 'light',
  width,
  height,
  className = '',
  priority = false
}: BrandProps) {
  // Debug: Log the received siteSettings
  console.log('Brand component received siteSettings:', siteSettings);
  
  // Determine which logotype to use based on variant
  // Fallback to light logo if dark logo is not available
  const logotype = variant === 'light' 
    ? siteSettings?.logotypeOnLight 
    : (siteSettings?.logotypeOnDark || siteSettings?.logotypeOnLight);
  
  // Debug: Log the selected logotype
  console.log('Brand component selected logotype:', logotype);
  
  // Use site name from Storyblok or fallback
  const title = siteSettings?.siteName;
  
  // If no logotype is available, render a text fallback
  if (!logotype?.filename) {
    console.log('Brand component: No logotype filename found, rendering text fallback');
    return (
      <div className={`text-indigo-600 font-bold text-xl ${className}`}>
        {title}
      </div>
    );
  }
  
  // Default dimensions if not provided
  const imageWidth = width || 149;
  const imageHeight = height || 20;

  // Use Storyblok asset URL directly
  const imageUrl = logotype.filename;

  // Debug: Log the image URL
  console.log('Brand component using image URL:', imageUrl);

  // If the URL is invalid, fall back to text
  if (!imageUrl || 
      imageUrl === 'undefined' || 
      imageUrl.includes('undefined') ||
      !imageUrl.startsWith('http')) {
    console.log('Brand component: Invalid image URL, rendering text fallback');
    return (
      <div className={`text-indigo-600 font-bold text-xl ${className}`}>
        {title}
      </div>
    );
  }

  // Render the logotype image
  console.log('Brand component: Rendering image');
  return (
    <Image 
      src={imageUrl}
      alt={title || 'Brand logo'}
      width={imageWidth}
      height={imageHeight}
      className={className}
      priority={priority}
    />
  );
}
