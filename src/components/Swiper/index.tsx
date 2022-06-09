import React , { createContext , useEffect , useMemo , useRef , useState } from 'react';
import { getChildren } from '../../utils';
import BackgroundImage from '../Background';

export const SwiperContext = createContext({
  swiperWidth: 800,
});

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
    children,
  } = props;
  // Set first background
  const variablesRef = useRef<VariablesRefProps>({
    currentSlide: 0,
    currentImage: {
      src: '',
      alt: '',
      title: '',
    },
    totalSlides: 0,
    running: false,
    paused: false,
    stop: false,
    controlNavEl: false,
  });
  const swiperRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [swiperWidth, setSwiperWidth] = useState(800);
  const { slides } = getChildren(children);
  const backgroundMemo = useMemo(() => {
    return slides[variablesRef.current.currentSlide].props;
  }, [variablesRef.current.currentSlide]);
  // onresize
  function onResizeHandler() {
    const swiperWid = swiperRef.current.offsetWidth;
    setSwiperWidth(swiperWid);
    variablesRef.current.currentImage = backgroundMemo;
  }
  useEffect(() => {
    console.log(slides)
    const swiperWid = swiperRef.current.offsetWidth;
    setSwiperWidth(swiperWid);
    variablesRef.current.totalSlides = slides.length;
    if (randomStart) {
      variablesRef.current.currentSlide = Math.floor(
        Math.random() * variablesRef.current.totalSlides,
      );
    }
    if (startSlide > 0) {
      if (startSlide >= slides.length) variablesRef.current.currentSlide = slides.length - 1;
    }
    variablesRef.current.currentImage = backgroundMemo;
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);
  return (
    <SwiperContext.Provider value={{ swiperWidth }}>
      <div className={`slider-wrapper theme-${theme}`}>
        <div className="nivoSlider" ref={swiperRef}>
          {children}
          <BackgroundImage src={backgroundMemo.src} alt={backgroundMemo.alt} width={swiperWidth} />
        </div>
      </div>
    </SwiperContext.Provider>
  );
}

Swiper.displayName = `Swiper`;

interface SlideImageProps {
  src: string;
  alt?: string;
  title?: string;
}

export interface VariablesRefProps {
  currentSlide: number;
  currentImage?: SlideImageProps;
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
