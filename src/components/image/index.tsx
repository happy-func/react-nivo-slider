import React, { useContext } from 'react';
import { clsx } from '../../utils';
import { EffectType, SwiperContext } from '../swiper';

function Image(props: ImageProps) {
  const { src, alt, title, className } = props;
  const { swiperWidth: width } = useContext(SwiperContext);
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      style={{ width, visibility: 'hidden', display: 'inline' }}
      className={clsx(`nivo-slider-image`, className)}
    />
  );
}

Image.displayName = `Image`;

interface ImageProps extends HTMLImageElement {
  [key: string]: any;
  transition?: EffectType;
}

export default Image;
