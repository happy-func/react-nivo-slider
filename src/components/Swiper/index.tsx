import React from 'react';

function Swiper(props:SwiperProps) {
  const { theme = `default` } = props;
  return (
    <div className={`slider-wrapper theme-${theme}`}>
      <div className="nivoSlider">

      </div>
    </div>
  )
}

export interface SwiperProps {
  theme: `default` | `light` | `dark` | `bar`;
}

export default Swiper;
