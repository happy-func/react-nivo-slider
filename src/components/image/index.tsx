import React, { CSSProperties, useContext } from 'react';
import { useSwiper } from '../../hooks';
import { clsx } from '../../utils';
import { EffectType, SwiperContext } from '../swiper';

function Image(props: ImageProps) {
  const { src, alt, title, className, style, transition, thumb, ...rest } = props;
  const { width } = useSwiper();
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      style={{ ...(style || {}), width, visibility: 'hidden', display: 'inline' }}
      className={clsx(`nivo-slider-image`, className)}
      data-transition={transition}
      data-thumb={thumb}
      {...rest}
    />
  );
}

Image.displayName = `Image`;

interface ImageProps {
  [key: string]: any;
  style?: CSSProperties;
  className?: string;
  alt?: string;
  title?: string;
  transition?: EffectType;
  thumb?: string;
}

export default Image;
