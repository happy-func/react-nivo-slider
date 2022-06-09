import React from 'react';

function SwiperSlide(props: SwiperSlideProps) {
  const { children } = props;
  return <div className="swiper-slide">{children}</div>;
}

export interface SwiperSlideProps {
  children: React.ReactNode;
}

SwiperSlide.displayName = `SwiperSlide`;

export default SwiperSlide;
