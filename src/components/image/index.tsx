import React, { CSSProperties, useContext } from 'react';
import { clsx } from '../../utils';
import { EffectType, SwiperContext } from '../swiper';

function Image(props: ImageProps) {
  const { src, alt, title, className, style, transition, ...rest } = props;
  const { swiperWidth: width } = useContext(SwiperContext);
  return (
    <img
      src={src}
      alt={alt}
      title={title}
      style={{ ...(style || {}), width, visibility: 'hidden', display: 'inline' }}
      className={clsx(`nivo-slider-image`, className)}
      data-transition={transition}
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
}

export default Image;
