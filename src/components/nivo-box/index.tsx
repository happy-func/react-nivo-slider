import React, { CSSProperties } from 'react';
import { animated, useSpring } from 'react-spring';

function NivoBox(props: NivoBoxProps) {
  const { from, to, config, delay, style, src, imageStyle, onRest, onChange, onDelayEnd } = props;
  const animateStyle = useSpring({ to, from, config, delay, onRest, onChange, onDelayEnd });
  return (
    <animated.div style={{ ...style, ...animateStyle }} className="nivo-box">
      <img src={src} alt="image" style={imageStyle} />
    </animated.div>
  );
}

export interface NivoBoxProps {
  from: any;
  to: any;
  config: any;
  delay: number;
  src: string;
  imageStyle?: CSSProperties;
  style: CSSProperties;
  uid: string;
  onRest?: any;
  onChange?: any;
  onDelayEnd?: any;
}

NivoBox.displayName = `NivoBox`;

export default NivoBox;
