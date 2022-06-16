import React, { CSSProperties } from 'react';
import { clsx } from '../../utils';

function BackgroundImage(props: BackgroundProps) {
  const { src, alt, className, style } = props;
  return <img src={src} alt={alt} className={clsx('nivo-main-image', className)} style={style} />;
}

BackgroundImage.displayName = `BackgroundImage`;

interface BackgroundProps {
  style?: CSSProperties;
  src: string;
  alt?: string;
  className?: string;
  [key: string]: any;
}

export default BackgroundImage;
