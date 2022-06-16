import React, { useContext } from 'react';
import { SwiperContext } from '../components/swiper';
import { SwiperContextProps } from './index';

export default function useSwiper(): SwiperContextProps {
  return useContext(SwiperContext);
}
