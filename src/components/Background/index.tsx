import React from 'react';
import { clsx } from '../../utils';

function BackgroundImage(props: BackgroundProps) {
  const { src, alt, className, height, width } = props;
  return <img src={src} alt={alt} className={clsx('nivo-main-image', className)} style={{ height, width }} />;
}

BackgroundImage.displayName = `BackgroundImage`;

interface BackgroundProps extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  [key: string]: any;
}

export default BackgroundImage;
