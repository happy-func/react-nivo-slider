import React, { createContext, CSSProperties, useEffect, useRef, useState } from 'react';
import { clsx, getChildren, guid } from '../../utils';
import BackgroundImage from '../background';
import NivoSlice, { NivoSliceProps } from '../nivo-slice';

export const SwiperContext = createContext({
  swiperWidth: 800,
  sliderImage: {
    src: '',
    alt: '',
  },
  animSpeed: 500,
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
  const [nivoSlices, setNivoSlices] = useState<NivoSliceProps[]>([]);
  // nivo-boxes
  const [nivoBoxes, setNivoBoxes] = useState([]);
  const { slides } = getChildren(children);
  function processCaption() {
    // TODO processCaption
  }
  function createSlices(): NivoSliceProps[] {
    const sliceWidth = Math.round(swiperRef.current.offsetWidth / slices);
    let sliceHeight: number;
    const node = document.querySelector(
      `.slider-wrapper .nivoSlider .nivo-slider-image[src='${variablesRef.current.currentImage.src}']`,
    );
    if (node.parentElement.tagName.toLowerCase() === `a`) {
      sliceHeight = node.parentElement.offsetHeight;
    } else {
      sliceHeight = node.offsetHeight;
    }
    const slicesArr: NivoSliceProps[] = [];
    for (let i = 0; i < slices; i++) {
      if (i === slices - 1) {
        slicesArr.push({
          uid: guid(),
          config: {},
          delay: 0,
          from: {},
          src: variablesRef.current.currentImage.src,
          to: {},
          imageStyle: {
            position: 'absolute',
            width: swiperRef.current.offsetWidth,
            height: 'auto',
            display: 'block',
            top: 0,
            left: -(sliceWidth + i * sliceWidth - sliceWidth),
          },
          style: {
            left: sliceWidth * i,
            width: swiperRef.current.offsetWidth - sliceWidth * i,
            height: sliceHeight,
            opacity: 0,
            overflow: 'hidden',
          },
        });
      } else {
        slicesArr.push({
          uid: guid(),
          config: {},
          delay: 0,
          from: {},
          src: variablesRef.current.currentImage.src,
          to: {},
          imageStyle: {
            position: 'absolute',
            width: swiperRef.current.offsetWidth,
            height: 'auto',
            display: 'block',
            top: 0,
            left: -(sliceWidth + i * sliceWidth - sliceWidth),
          },
          style: {
            left: sliceWidth * i,
            width: sliceWidth,
            height: sliceHeight,
            opacity: 0,
            overflow: 'hidden',
          },
        });
      }
    }
    return slicesArr;
  }
  // Event when Animation finishes
  function NivoAnimFinished() {
    // TODO NivoAnimFinished
    console.log('NivoAnimFinished');
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
    setNivoSlices([]);

    // Remove any boxes from last transition
    setNivoBoxes([]);

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
      tempNivoSlices = [],
      firstSlice = '',
      totalBoxes = '',
      boxes = '';
    if (
      currentEffect === 'sliceDown' ||
      currentEffect === 'sliceDownRight' ||
      currentEffect === 'sliceDownLeft'
    ) {
      tempNivoSlices = createSlices();
      timeBuff = 0;
      i = 0;
      if (currentEffect === 'sliceDownLeft') {
        tempNivoSlices.reverse();
      }

      tempNivoSlices = tempNivoSlices.map(function (slice) {
        const sliceTemp = JSON.parse(JSON.stringify(slice));
        sliceTemp.style.top = 0;
        sliceTemp.from = {
          opacity: 0,
        };
        sliceTemp.to = {
          opacity: 1,
        };
        sliceTemp.config = {
          duration: animSpeed,
        };
        sliceTemp.delay = 100 + timeBuff;
        if (i === slices - 1) {
          sliceTemp.onRest = () => {
            NivoAnimFinished();
          }
        }
        timeBuff += 50;
        i++;
        return sliceTemp;
      });
      setNivoSlices(tempNivoSlices);
    } else if (currentEffect === `sliceUp` || currentEffect === `sliceUpRight` || currentEffect === `sliceUpLeft`) {
      tempNivoSlices = createSlices();
      timeBuff = 0;
      i = 0;
      let v = 0;
      if (currentEffect === `sliceUpLeft`) {
        tempNivoSlices.reverse();
      }
      tempNivoSlices = tempNivoSlices.map(item => {
        const sliceTemp = JSON.parse(JSON.stringify(item));
        if (i === 0) {
          sliceTemp.style.top = 0;
          i++;
        } else {
          sliceTemp.style.bottom = 0;
          i = 0;
        }
        sliceTemp.style.bottom = 0;
        sliceTemp.from = {
          opacity: 0,
        }
        sliceTemp.to = {
          opacity: 1,
        }
        sliceTemp.config = {
          duration: animSpeed,
        };
        sliceTemp.delay = 100 + timeBuff;
        if (v === slices - 1) {
          sliceTemp.onRest = () => {
            NivoAnimFinished();
          }
        }
        timeBuff += 50;
        v++;
        return sliceTemp;
      });
      setNivoSlices(tempNivoSlices);
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

    let timer: number | undefined;
    timer = setInterval(() => nivoRun(false), pauseTime);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);
  return (
    <SwiperContext.Provider value={{ swiperWidth, sliderImage, animSpeed }}>
      <div className={clsx('slider-wrapper', `theme-${theme}`, className)} style={style}>
        <div className="nivoSlider" ref={swiperRef}>
          {children}
          <BackgroundImage
            src={sliderImage.src}
            alt={sliderImage.alt}
            width={swiperWidth}
            height={sliderImage.height}
          />
          {nivoSlices.map((item) => (
            <NivoSlice
              key={item.uid}
              uid={item.uid}
              from={item.from}
              to={item.to}
              config={item.config}
              delay={item.delay}
              src={item.src}
              style={item.style}
              imageStyle={item.imageStyle}
              onRest={item.onRest}
              onChange={item.onChange}
              onDelayEnd={item.onDelayEnd}
            />
          ))}
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
