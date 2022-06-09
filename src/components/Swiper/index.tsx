import React , { useEffect , useRef } from 'react';
import { getChildren } from '../../utils';

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
    children
  } = props;
  const variablesRef = useRef<VariablesRefProps>({
    currentSlide: 0,
    currentImage: '',
    totalSlides: 0,
    running: false,
    paused: false,
    stop: false,
    controlNavEl: false
  });
  useEffect(() => {
    const { slides } = getChildren(children);
    variablesRef.current.totalSlides = slides.length;
    if (randomStart) {
      variablesRef.current.currentSlide = Math.floor(Math.random() * variablesRef.current.totalSlides);
    }
    if (startSlide > 0) {
      if (startSlide >= slides.length) variablesRef.current.currentSlide = slides.length - 1;
    }
  }, []);
  return (
    <div className={`slider-wrapper theme-${theme}`}>
      <div className="nivoSlider">

      </div>
    </div>
  );
}

Swiper.displayName = `Swiper`;

export interface VariablesRefProps {
  currentSlide: number;
  currentImage: string;
  totalSlides: number;
  running: boolean;
  paused: boolean;
  stop: boolean;
  controlNavEl: boolean;
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
  children: React.ReactNode;
}

export default Swiper;
