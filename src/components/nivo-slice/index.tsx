import React, { CSSProperties } from 'react';
// @ts-ignore
import { animated, useSpring } from 'react-spring';

function NivoSlice(props: NivoSliceProps) {
  const { to, from, config, delay, style, src, imageStyle } = props;
  const animateStyle = useSpring({ to, from, config, delay });
  return (
    /* @ts-ignore */
    <animated.div style={{ ...style, ...animateStyle }} className="nivo-slice">
      <img src={src} alt="image" style={imageStyle} />
    </animated.div>
  );
}

export interface NivoSliceProps {
  from: any;
  to: any;
  config: any;
  delay: number;
  src: string;
  imageStyle?: CSSProperties;
  style?: CSSProperties;
  uid: string;
}

NivoSlice.displayName = `NivoSlice`;

export default NivoSlice;
