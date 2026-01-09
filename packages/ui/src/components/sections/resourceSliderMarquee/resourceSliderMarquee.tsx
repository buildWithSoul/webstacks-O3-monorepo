'use client';
import Slider from 'react-slick';

import { useRef, useState, useId, type FC, type KeyboardEvent } from 'react';

import 'slick-carousel/slick/slick.css';
import { SanityBlogPost } from '../../../types/sanity';
import SliderItem from './components/SlideItem';
import SliderControls from '../../molecules/sliderControls';

export interface ResourceSliderMarqueeProps  {
  items?: SanityBlogPost[];
  theme?: 'light' | 'dark';
};

export const ResourceSliderMarquee: FC<ResourceSliderMarqueeProps> = ({ items, theme = 'dark' }) => {
  const sliderRef = useRef<Slider>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const regionId = useId();
  
  const sliderSettings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    arrows: false,
    centerMode: true,
    variableWidth: true,
    centerPadding: '24px',
    onInit: () => setIsInitialized(true),
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
        className={`relative w-full h-[451px] z-0 overflow-hidden transition-opacity duration-300 ${isInitialized ? 'opacity-100' : 'opacity-0'}`}
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
            z-index: 0;
          }
          .slick-list {
            position: relative;
            display: block;
            overflow: visible !important;
            margin: 0;
            padding: 0;
            z-index: 0;
          }
          .slick-track {
            position: relative;
            top: 0;
            left: 0;
            display: block;
            margin-left: auto;
            margin-right: auto;
            z-index: 0;
          }
          .slick-slide {
            display: none;
            float: left;
            height: 100%;
            min-height: 1px;
            opacity: 0.4;
            transition: opacity 0.3s ease;
          }
          .slick-slide.slick-active {
            display: block;
          }
          .slick-slide.slick-center {
            opacity: 1;
          }
          .slick-initialized .slick-slide {
            display: block;
          }
        `}</style>
        <Slider ref={sliderRef} {...sliderSettings}>
          {items.map((item, index) => (
            <SliderItem key={`${item._id}-${index}-slider`} item={item} priority={index === 0} theme={theme} />
          ))}
        </Slider>
      </div>
      
      <div className={`relative z-10 w-full transition-opacity duration-300 ${isInitialized ? 'opacity-100' : 'opacity-0'}`}>
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
    </div>
  );
};
