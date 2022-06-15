import React, { createContext, CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { clsx, getChildren, guid } from '../../utils';
import BackgroundImage from '../background';
import NivoBox, { NivoBoxProps } from '../nivo-box';
import NivoSlice, { NivoSliceProps } from '../nivo-slice';

export const SwiperContext = createContext<{
  swiperWidth: number;
  sliderImage: {
    src: string;
    alt?: string;
  };
  animSpeed: number;
}>({
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
  const [sliderImage, setSliderImage] = useState<{
    src: string;
    alt: string | undefined;
    height: number | string | undefined;
  }>({ src: '', alt: '', height: 'auto' });
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
  const timer = useRef(0);
  // nivo-slice
  const [nivoSlices, setNivoSlices] = useState<NivoSliceProps[]>([]);
  // nivo-boxes
  const [nivoBoxes, setNivoBoxes] = useState<NivoBoxProps[]>([]);
  // caption title
  const [captionTitle, setCaptionTitle] = useState('');
  // caption spring
  const [captionSpring, captionAnimate] = useSpring(() => ({
    opacity: 0,
    config: { duration: animSpeed },
  }));
  const currentImage = useMemo(() => {
    return { ...variablesRef.current.currentImage };
  }, [variablesRef.current.currentImage.src, variablesRef.current.currentImage.alt]);
  const { slides } = getChildren(children);
  function processCaption() {
    if (
      variablesRef.current.currentImage.title !== '' &&
      variablesRef.current.currentImage.title !== undefined
    ) {
      let title = variablesRef.current.currentImage.title;
      if (title.substring(0, 1) == '#') {
        title = document.querySelector(title)?.innerHTML || '';
      }
      if (captionSpring.opacity.get() === 1) {
        setTimeout(() => {
          setCaptionTitle(title);
        }, animSpeed);
      } else {
        setCaptionTitle(title);
        captionAnimate.stop();
        captionAnimate.start({ opacity: 1 });
      }
    } else {
      captionAnimate.stop();
      captionAnimate.start({ opacity: 0 });
    }
  }
  function createSlices(): NivoSliceProps[] {
    const sliceWidth = Math.round(swiperRef.current.offsetWidth / slices);
    let sliceHeight = swiperRef.current.offsetHeight;
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
  function createBoxes() {
    const boxWidth = Math.round(swiperRef.current.offsetWidth / boxCols);
    let boxHeight = swiperRef.current.offsetHeight / boxRows;
    const boxArr: NivoBoxProps[] = [];
    for (let rows = 0; rows < boxRows; rows++) {
      for (let cols = 0; cols < boxCols; cols++) {
        if (cols === boxCols - 1) {
          boxArr.push({
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
              top: -boxHeight * rows,
              left: -(boxWidth * cols),
            },
            style: {
              opacity: 0,
              left: boxWidth * cols,
              top: boxHeight * rows,
              width: swiperRef.current.offsetWidth - boxWidth * cols,
              height: swiperRef.current.offsetHeight,
            },
          });
        } else {
          boxArr.push({
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
              top: -(boxHeight * rows),
              left: -(boxWidth * cols),
            },
            style: {
              opacity: 0,
              left: boxWidth * cols,
              top: boxHeight * rows,
              width: boxWidth,
              height: swiperRef.current.offsetHeight,
            },
          });
        }
      }
    }
    setSliderImage((prevState) => ({
      ...prevState,
      height: swiperRef.current.offsetHeight,
    }));
    return boxArr;
  }
  // onMouseEnter
  function onMouseEnter() {
    if (pauseOnHover) {
      variablesRef.current.paused = true;
      clearInterval(timer.current);
      timer.current = 0;
    }
  }
  // onMouseLeave
  function onMouseLeave() {
    if (pauseOnHover) {
      variablesRef.current.paused = false;
      if (!timer.current) {
        timer.current = setInterval(() => nivoRun(false), pauseTime);
      }
    }
  }
  // Event when Animation finishes
  function NivoAnimFinished() {
    setSliderImage({
      height: 'auto',
      src: variablesRef.current.currentImage.src,
      alt: variablesRef.current.currentImage.alt || '',
    });
    variablesRef.current.running = false;
    // Restart the timer
    if (!timer.current && !variablesRef.current.paused && !manualAdvance) {
      timer.current = setInterval(() => {
        nivoRun(false);
      }, pauseTime);
    }
    // Trigger the afterChange callback
    afterChange && afterChange();
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
    setSliderImage({
      height: 'auto',
      src: variablesRef.current.currentImage.src,
      alt: variablesRef.current.currentImage.alt || '',
    });
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
      firstSlice: NivoSliceProps = {
        config: undefined,
        delay: 0,
        from: undefined,
        src: '',
        to: undefined,
        uid: '',
        style: {},
      },
      totalBoxes = 0,
      boxes: NivoBoxProps[] = [];
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
          };
        }
        timeBuff += 50;
        i++;
        return sliceTemp;
      });
      setNivoSlices(tempNivoSlices);
    } else if (
      currentEffect === `sliceUp` ||
      currentEffect === `sliceUpRight` ||
      currentEffect === `sliceUpLeft`
    ) {
      tempNivoSlices = createSlices();
      timeBuff = 0;
      i = 0;
      let v = 0;
      if (currentEffect === `sliceUpLeft`) {
        tempNivoSlices.reverse();
      }
      tempNivoSlices = tempNivoSlices.map((item) => {
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
        };
        sliceTemp.to = {
          opacity: 1,
        };
        sliceTemp.config = {
          duration: animSpeed,
        };
        sliceTemp.delay = 100 + timeBuff;
        if (v === slices - 1) {
          sliceTemp.onRest = () => {
            NivoAnimFinished();
          };
        }
        timeBuff += 50;
        v++;
        return sliceTemp;
      });
      setNivoSlices(tempNivoSlices);
    } else if (
      currentEffect === `sliceUpDown` ||
      currentEffect === `sliceUpDownRight` ||
      currentEffect === `sliceUpDownLeft`
    ) {
      tempNivoSlices = createSlices();
      timeBuff = 0;
      i = 0;
      let v = 0;
      if (currentEffect === `sliceUpDownLeft`) {
        tempNivoSlices.reverse();
      }
      tempNivoSlices = tempNivoSlices.map((slice) => {
        const sliceTemp = JSON.parse(JSON.stringify(slice));
        if (i === 0) {
          sliceTemp.style.top = 0;
          i++;
        } else {
          sliceTemp.style.bottom = 0;
          i = 0;
        }
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
        if (v === slices - 1) {
          sliceTemp.onRest = () => {
            NivoAnimFinished();
          };
        }
        timeBuff += 50;
        v++;
        return sliceTemp;
      });
      setNivoSlices(tempNivoSlices);
    } else if (currentEffect === `fold`) {
      tempNivoSlices = createSlices();
      timeBuff = 0;
      i = 0;
      tempNivoSlices = tempNivoSlices.map((slice) => {
        const sliceTemp = JSON.parse(JSON.stringify(slice));
        sliceTemp.style.top = 0;
        sliceTemp.from = {
          width: 0,
          opacity: 0,
        };
        sliceTemp.to = {
          width: swiperRef.current.offsetWidth,
          opacity: 1,
        };
        sliceTemp.config = {
          duration: animSpeed,
        };
        sliceTemp.delay = 100 + timeBuff;
        if (i === slices - 1) {
          sliceTemp.onRest = () => {
            NivoAnimFinished();
          };
        }
        timeBuff += 50;
        i++;
        return sliceTemp;
      });
      setNivoSlices(tempNivoSlices);
    } else if (currentEffect === `fade`) {
      tempNivoSlices = createSlices();
      firstSlice = tempNivoSlices[0];
      firstSlice.style.width = swiperRef.current.offsetWidth;
      firstSlice.from = {
        opacity: 0,
      };
      firstSlice.to = {
        opacity: 1,
      };
      firstSlice.config.duration = animSpeed * 2;
      firstSlice.onRest = () => {
        NivoAnimFinished();
      };
      setNivoSlices(tempNivoSlices);
    } else if (currentEffect === `slideInRight`) {
      tempNivoSlices = createSlices();
      firstSlice = tempNivoSlices[0];
      firstSlice.style.opacity = 1;
      firstSlice.from = {
        width: 0,
      };
      firstSlice.to = {
        width: swiperRef.current.offsetWidth,
      };
      firstSlice.config.duration = animSpeed * 2;
      firstSlice.onRest = () => {
        NivoAnimFinished();
      };
      setNivoSlices(tempNivoSlices);
    } else if (currentEffect === `slideInLeft`) {
      tempNivoSlices = createSlices();
      firstSlice = tempNivoSlices[0];
      firstSlice.style.opacity = 1;
      firstSlice.style.right = 0;
      firstSlice.style.left = undefined;
      firstSlice.from = {
        width: 0,
      };
      firstSlice.to = {
        width: swiperRef.current.offsetWidth,
      };
      firstSlice.config.duration = animSpeed * 2;
      firstSlice.onRest = () => {
        setNivoSlices((prevState) => {
          return prevState.splice(0, 1, {
            ...prevState[0],
            style: { opacity: 1, left: 0, right: undefined },
          });
        });
        NivoAnimFinished();
      };
      setNivoSlices(tempNivoSlices);
    } else if (currentEffect === `boxRandom`) {
      boxes = createBoxes();
      totalBoxes = boxRows * boxCols;
      i = 0;
      timeBuff = 0;
      boxes.forEach((boxItem) => {
        boxItem.from = {
          opacity: 0,
        };
        boxItem.to = {
          opacity: 1,
        };
        boxItem.config.duration = animSpeed;
        boxItem.delay = 100 + timeBuff;
        if (i === totalBoxes - 1) {
          boxItem.onRest = () => {
            NivoAnimFinished();
          };
        }
        timeBuff += 20;
        i++;
      });
      setNivoBoxes(boxes);
    } else if (
      currentEffect === `boxRain` ||
      currentEffect === `boxRainReverse` ||
      currentEffect === `boxRainGrow` ||
      currentEffect === `boxRainGrowReverse`
    ) {
      boxes = createBoxes();
      totalBoxes = boxRows * boxCols;
      i = 0;
      timeBuff = 0;
      let rowIndex = 0;
      let colIndex = 0;
      const box2Darr: NivoBoxProps[][] = [];
      box2Darr[rowIndex] = [];
      if (currentEffect === `boxRainReverse` || currentEffect === `boxRainGrowReverse`) {
        boxes.reverse();
      }
      boxes.forEach((boxItem) => {
        box2Darr[rowIndex][colIndex] = boxItem;
        colIndex++;
        if (colIndex === boxCols) {
          rowIndex++;
          colIndex = 0;
          box2Darr[rowIndex] = [];
        }
      });

      // Run animation
      for (let cols = 0; cols < boxCols * 2; cols++) {
        let prevCol = cols;
        for (let rows = 0; rows < boxRows; rows++) {
          if (prevCol >= 0 && prevCol < boxCols) {
            /* Due to some weird JS bug with loop vars
            being used in setTimeout, this is wrapped
            with an anonymous function call */
            (function (row, col, time, i, totalBoxes) {
              const box = box2Darr[row][col];
              const w = swiperRef.current.offsetWidth;
              const h = swiperRef.current.offsetHeight;
              if (currentEffect === 'boxRainGrow' || currentEffect === 'boxRainGrowReverse') {
                box.style.width = 0;
                box.style.height = 0;
              }
              box.from = {
                opacity: 0,
                width: 0,
                height: 0,
              };
              box.to = {
                opacity: 1,
                width: w,
                height: h,
              };
              box.config.duration = animSpeed / 1.3;
              box.delay = time + 100;
              if (i === totalBoxes - 1) {
                box.onRest = () => {
                  NivoAnimFinished();
                };
              }
            })(rows, prevCol, timeBuff, i, totalBoxes);
            i++;
          }
          prevCol--;
        }
        timeBuff += 100;
      }
      setNivoBoxes(boxes);
    }
  }
  // prev click
  function onPrevClick() {
    if (variablesRef.current.running) return false;
    clearInterval(timer.current);
    timer.current = 0;
    variablesRef.current.currentSlide -= 2;
    nivoRun('prev');
  }
  // nextClick
  function onNextClick() {
    if (variablesRef.current.running) return false;
    clearInterval(timer.current);
    timer.current = 0;
    nivoRun('next');
  }
  // controlEl Click
  function onControlElClick(e: any) {
    e.persist();
    if (variablesRef.current.running) return false;
    if (e.target.dataset.src === currentImage.src) return false;
    clearInterval(timer.current);
    timer.current = 0;
    variablesRef.current.currentSlide = e.target.dataset.rel - 1;
    nivoRun('control');
  }
  // onresize
  function onResizeHandler() {
    const swiperWid = swiperRef.current.offsetWidth;
    setSwiperWidth(swiperWid);
    const currentImage = slides[variablesRef.current.currentSlide].props;
    variablesRef.current.currentImage = currentImage;
    setSliderImage({ ...currentImage, height: 'auto' });
    setNivoSlices([]);
    setNivoBoxes([]);
  }
  useEffect(() => {
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

    //Process initial  caption
    processCaption();

    timer.current = setInterval(() => nivoRun(false), pauseTime);
    afterLoad && afterLoad();
    return () => clearInterval(timer.current);
  }, []);
  useEffect(() => {
    window.addEventListener('resize', onResizeHandler);
    return () => window.removeEventListener('resize', onResizeHandler);
  }, []);
  return (
    <SwiperContext.Provider value={{ swiperWidth, sliderImage, animSpeed }}>
      <div className={clsx('slider-wrapper', `theme-${theme}`, className)} style={style}>
        <div
          className="nivoSlider"
          ref={swiperRef}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
          <BackgroundImage
            src={sliderImage.src}
            alt={sliderImage.alt}
            width={swiperWidth}
            height={sliderImage.height}
          />
          <animated.div className="nivo-caption" style={{ ...captionSpring, display: 'block' }}>
            {captionTitle}
          </animated.div>
          {directionNav && (
            <div className="nivo-directionNav">
              <a className="nivo-prevNav" onClick={onPrevClick}>
                {prevText}
              </a>
              <a className="nivo-nextNav" onClick={onNextClick}>
                {nextText}
              </a>
            </div>
          )}
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
          {nivoBoxes.map((item) => (
            <NivoBox
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
        {controlNav && (
          <div className={clsx('nivo-controlNav', controlNavThumbs && 'nivo-thumbs-enabled')}>
            {slides.map((item, index) => {
              if (controlNavThumbs) {
                return (
                  <a
                    className={clsx('nivo-control', item.props.src === sliderImage.src && 'active')}
                    data-rel={index}
                    key={index.toString()}
                    data-src={item.props.src}
                    onClick={onControlElClick}
                  >
                    <img src={item.props['thumb']} alt="thumb" />
                  </a>
                );
              }
              return (
                <a
                  className={clsx('nivo-control', item.props.src === currentImage.src && 'active')}
                  data-rel={index}
                  key={index.toString()}
                  data-src={item.props.src}
                  onClick={onControlElClick}
                >
                  {index + 1}
                </a>
              );
            })}
          </div>
        )}
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
