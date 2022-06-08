import React from 'react';

function Swiper(props: SwiperProps) {
  const {
    theme = `default`,
    effect = `random`,
    slices = 15,
    boxCols = 8,
    boxRows = 4,
    animSpeed = 500,
    pauseTime = 3000,
    startSlide = 0,
    directionNav = true,
    controlNav = true,
    controlNavThumbs = false,
    pauseOnHover = true,
    manualAdvance = false,
    prevText = `Prev`,
    nextText = `Next`,
    randomStart = false,
    beforeChange,
    afterChange,
    afterLoad,
    lastSlide,
  } = props;
  return (
    <div className={`slider-wrapper theme-${theme}`}>
      <div className="nivoSlider"></div>
    </div>
  );
}

export type EffectType =
  | 'random'
  | `fade`
  | `fold`
  | `sliceDown`
  | `sliceDownRight`
  | `sliceDownLeft`
  | `sliceUp`
  | `sliceUpRight`
  | `sliceUpLeft`
  | `sliceUpDown`
  | `sliceUpDownLeft`
  | `sliceUpDownRight`
  | `slideInRight`
  | `slideInLeft`
  | `boxRandom`
  | `boxRain`
  | `boxRainReverse`
  | `boxRainGrow`
  | `boxRainGrowReverse`;

export interface SwiperProps {
  theme?: `default` | `light` | `dark` | `bar`;
  effect?: EffectType;
  slices?: number;
  boxCols?: number;
  boxRows?: number;
  animSpeed?: number;
  pauseTime?: number;
  startSlide?: number;
  directionNav?: boolean;
  controlNav?: boolean;
  controlNavThumbs?: boolean;
  pauseOnHover?: boolean;
  manualAdvance?: boolean;
  prevText?: string;
  nextText?: string;
  randomStart?: boolean;
  beforeChange?: () => void;
  afterChange?: () => void;
  slideshowEnd?: () => void;
  lastSlide?: () => void;
  afterLoad?: () => void;
}

export default Swiper;
