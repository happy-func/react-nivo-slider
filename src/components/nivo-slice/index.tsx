import React, { CSSProperties } from 'react';
// @ts-ignore
import { animated, useSpring } from 'react-spring';

function NivoSlice(props: NivoSliceProps) {
  const { to, from, config, delay, style, src, imageStyle, onRest, onChange, onDelayEnd } = props;
  const animateStyle = useSpring({ to, from, config, delay, onRest, onChange, onDelayEnd });
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
  onRest?: any;
  onChange?: any;
  onDelayEnd?: any;
}

NivoSlice.displayName = `NivoSlice`;

export default NivoSlice;
