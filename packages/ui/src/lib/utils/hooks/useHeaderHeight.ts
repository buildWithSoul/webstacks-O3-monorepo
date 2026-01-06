import { useWindowSize } from '@react-hookz/web';
import { useEffect, useState } from 'react';

const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useState(184);
  const { width } = useWindowSize();

  const calculateHeaderHeight = () => {
    const header = document.querySelector('header');

    if (header) {
      const rect = header.getBoundingClientRect();
      setHeaderHeight(rect.height);
    }
  };

  const effect = () => {
    window.addEventListener('scroll', () => calculateHeaderHeight());
    window.addEventListener('resize', () => calculateHeaderHeight());

    return () => {
      window.removeEventListener('scroll', () => calculateHeaderHeight());
      window.removeEventListener('resize', () => calculateHeaderHeight());
    };
  };

  useEffect(() => calculateHeaderHeight(), []);

  useEffect(effect, [width]);

  return headerHeight;
};

export default useHeaderHeight;
