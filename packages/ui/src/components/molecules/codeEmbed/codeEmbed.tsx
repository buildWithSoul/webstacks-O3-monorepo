'use client';

import { useEffect, useRef } from 'react';
import type { FC } from 'react';

export interface CodeEmbedProps {
  /**
   * The code to embed (HTML, CSS, JavaScript)
   */
  code: string;
}

/**
 * Code Embed component for rendering custom HTML, CSS, and JavaScript
 */
const CodeEmbed: FC<CodeEmbedProps> = ({ code }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    // Create a temporary container to parse the code
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = code;

    // Extract and handle different types of content
    const scripts = tempDiv.querySelectorAll('script');
    const styles = tempDiv.querySelectorAll('style');
    const htmlContent = tempDiv.innerHTML;

    // Clear the container
    containerRef.current.innerHTML = '';

    // Add styles to document head
    styles.forEach((style) => {
      const newStyle = document.createElement('style');
      newStyle.textContent = style.textContent;
      document.head.appendChild(newStyle);

      // Store reference for cleanup
      if (containerRef.current) {
        containerRef.current.setAttribute('data-style-id', newStyle.textContent?.slice(0, 20) || '');
      }
    });

    // Add HTML content
    if (htmlContent.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').trim()) {
      const htmlDiv = document.createElement('div');
      htmlDiv.innerHTML = htmlContent.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
      containerRef.current.appendChild(htmlDiv);
    }

    // Execute scripts safely
    scripts.forEach((script) => {
      const newScript = document.createElement('script');
      
      if (script.src) {
        // External script
        newScript.src = script.src;
        newScript.async = true;
      } else {
        // Inline script
        newScript.textContent = script.textContent;
      }

      // Add any other attributes
      Array.from(script.attributes).forEach((attr) => {
        if (attr.name !== 'src') {
          newScript.setAttribute(attr.name, attr.value);
        }
      });

      document.body.appendChild(newScript);
    });

    // Cleanup function
    return () => {
      // Remove added styles (basic cleanup)
      const addedStyles = document.querySelectorAll('style');
      const styleId = containerRef.current?.getAttribute('data-style-id');
      if (styleId) {
        addedStyles.forEach((style) => {
          if (style.textContent?.startsWith(styleId)) {
            style.remove();
          }
        });
      }
    };
  }, [code]);

  // Don't render anything if there's no code
  if (!code?.trim()) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="code-embed-container my-6"
    />
  );
};

export default CodeEmbed;
