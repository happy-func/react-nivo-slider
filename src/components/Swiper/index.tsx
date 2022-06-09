import React, { useEffect, useRef, useState } from 'react';
import { getChildren, getSlideImageAttr, updateSwiperImagesHeight } from '../../utils';

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
  const sliderImgRef = useRef<HTMLImageElement>(document.createElement('img'));
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
  // onresize
  function onResizeHandler() {
    const swiperWid = swiperRef.current.offsetWidth;
    setSwiperWidth(swiperWid);
    const currentImage = getSlideImageAttr(slides[variablesRef.current.currentSlide]);
    sliderImgRef.current.setAttribute(`src`, currentImage?.src as string);
    sliderImgRef.current.setAttribute(`alt`, currentImage?.alt as string);
    sliderImgRef.current.setAttribute(`height`, `auto`);
  }
  useEffect(() => {
    const swiperWid = swiperRef.current.offsetWidth;
    setSwiperWidth(swiperWid);
    updateSwiperImagesHeight(swiperRef.current.children, swiperWidth);
    variablesRef.current.totalSlides = slides.length;
    if (randomStart) {
      variablesRef.current.currentSlide = Math.floor(
        Math.random() * variablesRef.current.totalSlides,
      );
    }
    if (startSlide > 0) {
      if (startSlide >= slides.length) variablesRef.current.currentSlide = slides.length - 1;
    }
    const currentImage = getSlideImageAttr(slides[variablesRef.current.currentSlide]);
    sliderImgRef.current.setAttribute(`src`, currentImage?.src as string);
    sliderImgRef.current.setAttribute(`alt`, currentImage?.alt as string);
    variablesRef.current.currentImage = currentImage;
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);
  return (
    <div className={`slider-wrapper theme-${theme}`}>
      <div className="nivoSlider" ref={swiperRef}>
        {children}
        <img className="nivo-main-image" ref={sliderImgRef} alt="first background" />
      </div>
    </div>
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
