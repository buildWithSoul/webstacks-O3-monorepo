'use client';
import Slider from 'react-slick';



import { useRef, useState, useEffect, useId, type FC, type KeyboardEvent } from 'react';

import 'slick-carousel/slick/slick.css';
import { SanityBlogPost } from '../../../types/sanity';
import SliderControls from '../../molecules/sliderControls';
import SliderItem from './components/SlideItem';

export interface ResourceSliderProps  {
  items?: SanityBlogPost[]
};

export const ResourceSlider: FC<ResourceSliderProps> = ({ items }) => {
  const sliderRef = useRef<Slider>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const regionId = useId();
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const sliderSettings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    centerPadding: '0px',
    beforeChange: (_current: number, next: number) => setCurrentSlide(next),
  };

  const handlePrevious = () => sliderRef?.current?.slickPrev();
  const handleNext = () => sliderRef?.current?.slickNext();
  const handleGoTo = (index: number) => sliderRef?.current?.slickGoTo(index);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Show loading state on server/before hydration to prevent FOUC
  if (!isClient) {
    return (
      <div className="flex w-full flex-col gap-12 items-center sm:gap-16">
        <div className="relative w-full h-[451px]">
          <style>{`
            .slider-skeleton {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 451px;
              overflow: hidden;
            }
            .skeleton-slide {
              width: 1248px;
              padding: 0 16px;
              flex-shrink: 0;
            }
            .skeleton-card {
              width: 100%;
              max-width: 1216px;
              height: 451px;
              margin: 0 auto;
              background: white;
              border: 1px solid #e5e7eb;
              border-radius: 16px;
              overflow: hidden;
              display: flex;
            }
            .skeleton-image {
              width: 800px;
              height: 100%;
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
              flex-shrink: 0;
            }
            .skeleton-content {
              flex: 1;
              padding: 32px;
              display: flex;
              flex-direction: column;
              gap: 16px;
            }
            .skeleton-badge {
              width: 80px;
              height: 24px;
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
              border-radius: 12px;
            }
            .skeleton-title {
              width: 80%;
              height: 32px;
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
              border-radius: 4px;
            }
            .skeleton-button {
              width: 120px;
              height: 20px;
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
              background-size: 200% 100%;
              animation: loading 1.5s infinite;
              border-radius: 4px;
            }
            @keyframes loading {
              0% { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
          <div className="slider-skeleton">
            <div className="skeleton-slide">
              <div className="skeleton-card">
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-badge"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-button"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured content"
      aria-describedby={`${regionId}-instructions`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex w-full flex-col gap-12 items-center sm:gap-16"
    >
      <p id={`${regionId}-instructions`} className="sr-only">
        Use left and right arrow keys to navigate slides. Slide {currentSlide + 1} of {items.length}.
      </p>

      <div 
        className="relative w-full h-[451px]"
        aria-live="polite"
        aria-atomic="true"
      >
        <style>{`
          .slick-slider {
            position: relative;
            display: block;
            box-sizing: border-box;
            user-select: none;
            touch-action: pan-y;
            -webkit-tap-highlight-color: transparent;
          }
          .slick-list {
            position: relative;
            display: block;
            overflow: hidden;
            margin: 0;
            padding: 0;
          }
          .slick-track {
            position: relative;
            top: 0;
            left: 0;
            display: block;
            margin-left: auto;
            margin-right: auto;
          }
          .slick-slide {
            display: none;
            float: left;
            height: 100%;
            min-height: 1px;
          }
          .slick-slide.slick-active {
            display: block;
          }
          .slick-initialized .slick-slide {
            display: block;
          }
        `}</style>
        <Slider ref={sliderRef} {...sliderSettings}>
          {items.map((item, index) => (
            <SliderItem key={`${item._id}-${index}-slider`} item={item} priority={index === 0} />
          ))}
        </Slider>
      </div>
      
      <SliderControls
        currentIndex={currentSlide}
        totalSlides={items.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onGoTo={handleGoTo}
        showDots={true}
        showArrows={true}
      />
    </div>
  );
};

