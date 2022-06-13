import React, { useContext } from 'react';
import { clsx } from '../../utils';
import { SwiperContext } from '../swiper';

function Link(props: LinkProps) {
  const { href, title, children, style, className } = props;
  const { sliderImage } = useContext(SwiperContext);
  const active = sliderImage.src === children?.props?.src;
  return (
    <a
      href={href}
      title={title}
      style={{ display: active ? `block` : 'none', ...style }}
      className={clsx('nivo-imageLink', 'nivo-slider-link', className)}
    >
      {children}
    </a>
  );
}

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  [key: string]: any;
  active?: boolean;
}

Link.displayName = `Link`;

export default Link;
