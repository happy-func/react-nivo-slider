import React from 'react';

export interface SwiperContextProps {
  slideTo: (index: number) => void;
  slideNext: () => void;
  slidePrev: () => void;
  activeIndex: number;
  slides: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
  width: number;
}

export { default as useSwiper } from './useSwiper';
