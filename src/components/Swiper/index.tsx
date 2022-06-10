import React, { createContext, CSSProperties, useEffect, useRef, useState } from 'react';
import { clsx, getChildren } from '../../utils';
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
    slideshowEnd,
    children,
    className,
    style,
  } = props;
  // Set first background
  const [sliderImage, setSliderImage] = useState({ src: '', alt: '', height: 'auto' });
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
  // nivo-slice
  const [nivoSlices, setNivoSlices] = useState([]);
  // nivo-boxes
  const [nivoBoxes, setNivoBoxes] = useState([]);
  const { slides } = getChildren(children);
  function processCaption() {
    // TODO processCaption
  }
  function createSlices() {
    // TODO createSlices
  }
  // Private run method
  function nivoRun(nudge: string | boolean) {
    // Trigger the lastSlide callback
    if (variablesRef.current.currentSlide === variablesRef.current.totalSlides - 1) {
      lastSlide && lastSlide();
    }
    // Stop
    if (variablesRef.current.stop && !nudge) {
      return false;
    }
    // Trigger the beforeChange callback
    beforeChange && beforeChange();
    // Set current background before change
    if (!nudge) {
      setSliderImage((prevState) => ({ ...prevState, src: variablesRef.current.currentImage.src }));
    } else {
      if (nudge === 'prev') {
        setSliderImage((prevState) => ({
          ...prevState,
          src: variablesRef.current.currentImage.src,
        }));
      }
      if (nudge === 'next') {
        setSliderImage((prevState) => ({
          ...prevState,
          src: variablesRef.current.currentImage.src,
        }));
      }
    }
    variablesRef.current.currentSlide++;
    // Trigger the slideshowEnd callback
    if (variablesRef.current.currentSlide === variablesRef.current.totalSlides) {
      variablesRef.current.currentSlide = 0;
      slideshowEnd && slideshowEnd();
    }

    if (variablesRef.current.currentSlide < 0) {
      variablesRef.current.currentSlide = variablesRef.current.totalSlides - 1;
    }

    // Set vars.currentImage
    variablesRef.current.currentImage = slides[variablesRef.current.currentSlide].props;

    // Set active links
    if (controlNav) {
      // TODO controlNav
    }

    // Process caption
    processCaption();

    // Remove any slices from last transition
    // TODO slices control

    // Remove any boxes from last transition
    // TODO boxes control

    let currentEffect = effect;
    let anims: EffectType[] = [];

    // Generate random effect
    if (effect === `random`) {
      anims = [
        'sliceDownRight',
        'sliceDownLeft',
        'sliceUpRight',
        'sliceUpLeft',
        'sliceUpDown',
        'sliceUpDownLeft',
        'fold',
        'fade',
        'boxRandom',
        'boxRain',
        'boxRainReverse',
        'boxRainGrow',
        'boxRainGrowReverse',
      ];
      currentEffect = anims[Math.floor(Math.random() * (anims.length + 1))] as EffectType;
      if (currentEffect === undefined) {
        currentEffect = 'fade';
      }
    }

    // Run random effect from specified set (eg: effect:'fold,fade')
    if (effect.indexOf(',') !== -1) {
      anims = effect.split(',') as EffectType[];
      currentEffect = anims[Math.floor(Math.random() * anims.length)] as EffectType;
      if (currentEffect === undefined) {
        currentEffect = 'fade';
      }
    }

    // Custom transition as defined by "data-transition" attribute
    if (variablesRef.current.currentImage.transition) {
      currentEffect = variablesRef.current.currentImage.transition;
    }

    // Run effects
    variablesRef.current.running = true;
    let timeBuff = 0,
      i = 0,
      tempSlices = '',
      firstSlice = '',
      totalBoxes = '',
      boxes = '';
    if (
      currentEffect === 'sliceDown' ||
      currentEffect === 'sliceDownRight' ||
      currentEffect === 'sliceDownLeft'
    ) {
      createSlices();
      timeBuff = 0;
      i = 0;
      if (currentEffect === 'sliceDownLeft') {
        setNivoSlices((prevState) => [...prevState].reverse());
      }

      tempSlices.each(function () {
        var slice = $(this);
        slice.css({ top: '0px' });
        if (i === slices - 1) {
          setTimeout(function () {
            slice.animate({ opacity: '1.0' }, settings.animSpeed, '', function () {
              slider.trigger('nivo:animFinished');
            });
          }, 100 + timeBuff);
        } else {
          setTimeout(function () {
            slice.animate({ opacity: '1.0' }, settings.animSpeed);
          }, 100 + timeBuff);
        }
        timeBuff += 50;
        i++;
      });
    }
  }
  // onresize
  function onResizeHandler() {
    const swiperWid = swiperRef.current.offsetWidth;
    setSwiperWidth(swiperWid);
    const currentImage = slides[variablesRef.current.currentSlide].props;
    variablesRef.current.currentImage = currentImage;
    setSliderImage({ ...currentImage, height: 'auto' });
  }
  useEffect(() => {
    console.log(slides);
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
    const currentImage = slides[variablesRef.current.currentSlide].props;
    variablesRef.current.currentImage = currentImage;
    setSliderImage(currentImage);
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);
  return (
    <SwiperContext.Provider value={{ swiperWidth }}>
      <div className={clsx('slider-wrapper', `theme-${theme}`, className)} style={style}>
        <div className="nivoSlider" ref={swiperRef}>
          {children}
          <BackgroundImage
            src={sliderImage.src}
            alt={sliderImage.alt}
            width={swiperWidth}
            height={sliderImage.height}
          />
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
  transition?: EffectType;
}

export interface VariablesRefProps {
  currentSlide: number;
  currentImage: SlideImageProps;
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
  className?: string;
  style?: CSSProperties;
}

export default Swiper;
