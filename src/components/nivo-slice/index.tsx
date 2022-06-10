import React, { CSSProperties } from 'react';
import { animated, useSpring } from 'react-spring';

function NivoSlice(props: NivoSliceProps) {
  const { to, from, config, delay, style, src, imageStyle } = props;
  const animateStyle = useSpring({ to, from, config, delay });
  return (
    /* @ts-ignore */
    <animated.div style={{ ...style, ...animateStyle }}>
      <img src={src} alt="image" style={imageStyle} />
    </animated.div>
  );
}

export interface NivoSliceProps extends HTMLDivElement {
  from: any;
  to: any;
  config: any;
  delay: number;
  src: string;
  imageStyle: CSSProperties;
}

NivoSlice.displayName = `NivoSlice`;

export default NivoSlice;
