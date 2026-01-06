'use client';

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

interface LottieFile {
  asset?: {
    url?: string;
  };
}

interface LottieProps {
  file: LottieFile;
  className?: string;
}

const LottieAnimation = ({ file, className }: LottieProps) => {
  const [animationData, setAnimationData] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, aspectRatio: 1 });

  useEffect(() => {
    if (file?.asset?.url) {
      fetch(file.asset.url)
        .then((response) => response.json())
        .then((data) => {
          setAnimationData(data);
          // Extract actual dimensions from Lottie data
          if (data && data.w && data.h) {
            const width = data.w;
            const height = data.h;
            const aspectRatio = width / height;
            setDimensions({ width, height, aspectRatio });
          }
        })
        .catch((error) => console.error('Error fetching Lottie animation:', error));
    }
  }, [file]);

  // Use actual animation dimensions for perfect fit
  const containerStyle = {
    width: '100%',
    aspectRatio: dimensions.aspectRatio > 0 ? dimensions.aspectRatio : '1186/677.42',
    maxWidth: dimensions.width > 0 ? `${dimensions.width}px` : '1186px',
  };

  return (
    <div 
      className={`${className || ''} w-full`}
      style={containerStyle}
    >
      {animationData ? (
        <Lottie 
          animationData={animationData}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      ) : (
        <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
      )}
    </div>
  );
};

export default LottieAnimation;
