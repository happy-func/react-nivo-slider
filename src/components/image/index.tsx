import React, { useContext } from 'react';
import { SwiperContext } from '../swiper';

function Image(props: ImageProps) {
  const { src, alt, title } = props;
  const { swiperWidth: width } = useContext(SwiperContext);
  return <img src={src} alt={alt} title={title} style={{ width }} />;
}

Image.displayName = `Image`;

interface ImageProps extends HTMLImageElement {
  [key: string]: any;
}

export default Image;
