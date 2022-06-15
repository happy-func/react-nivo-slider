import React, { CSSProperties, useContext } from 'react';
import { clsx } from '../../utils';
import { SwiperContext } from '../swiper';

function Link(props: LinkProps) {
  const { href, title, children, style, className, target, ...rest } = props;
  const { sliderImage } = useContext(SwiperContext);
  const active = sliderImage.src === children?.props?.src;
  return (
    <a
      href={href}
      title={title}
      target={target}
      style={{ ...(style || {}), display: active ? `block` : 'none' }}
      className={clsx('nivo-imageLink', 'nivo-slider-link', className)}
      {...rest}
    >
      {children}
    </a>
  );
}

interface LinkProps {
  [key: string]: any;
  className?: string;
  style?: CSSProperties;
  target?: `_blink` | `_self` | `_parent` | `_top` | `framename`;
  href: string;
  title?: string;
}

Link.displayName = `Link`;

export default Link;
