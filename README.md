# react-nivo-slider

![version](https://img.shields.io/github/package-json/v/happy-func/react-nivo-slider/main) ![typescript](https://img.shields.io/npm/types/react-nivo-slider) ![esm](https://img.shields.io/static/v1?label=build&message=esm&color=blue) ![npm bundle size (version)](https://img.shields.io/bundlephobia/min/react-nivo-slider/1.1.1) ![GitHub Repo stars](https://img.shields.io/github/stars/happy-func/react-swim-button?style=social)

## Getting Started

Install dependencies,

```bash
$ npm i react-nivo-slider
```

## Docs & Demo

[Github Pages](https://happy-func.github.io/react-nivo-slider/)

## Usage

```tsx
import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

const logger = (msg: string) => () => console.log(msg);

export default function DefaultDemo() {
  return (
    <Swiper>
      <Link href="https://www.surpath.net.cn">
        <Image src={NemoJpg} alt="image1" onClick={logger('bad event handler')} />
      </Link>
      <Image
        src={ToyStoryJpg}
        alt="image2"
        title="image2"
        onClick={logger('image2 Clicked')}
      />
      <Image src={WalleJpg} alt="image3" onClick={logger('image3 Clicked')} />
      <Image src={UpJpg} alt="image4" onClick={logger('image4 Clicked')} />
    </Swiper>
  );
}
```

## API

### Swiper props

| props | description | type | default |
| :-- | :-- | :-- | :-- |
| className | - | string | - |
| style | - | CSSProperties | - |
| theme | theme | `default` \| `light` \| `dark` \| `bar` | default |
| effect | transition effect | [EffectType](https://github.com/happy-func/react-nivo-slider/#effecttype) | random |
| slices | swiper slice | number | 15 |
| boxCols | box col num | number | 8 |
| boxRows | - | number | 4 |
| animSpeed | animation duration(ms) | number | 500 |
| pauseTime | - | number | 3000 |
| startSlide | - | number | 0 |
| directionNav | show directionNav | boolean | true |
| controlNav | show controlNav | boolean | true |
| controlNavThumbs | show controlNavThumbs | boolean | false |
| pauseOnHover | - | boolean | true |
| manualAdvance | - | boolean | false |
| prevText | prev button text | string | Prev |
| nextText | next button text | string | nextText |
| randomStart | - | boolean | false |
| beforeChange | before slide change | function | - |
| afterChange | after slide change | function | - |
| afterLoad | after swiper init | function | - |
| lastSlide | before last slide start animation | function | - |
| slideshowEnd | on last slide show | function | - |

### useSwiper

| props | description | type | default |
| :-- | :-- | :-- | :-- |
| width | swiper width | number | - |
| activeIndex | - | number | - |
| slides | swiper slides | React.ReactElement<any, string \| React.JSXElementConstructor<any>>[] | [] |
| slideTo | slide to target slide | (index: number) => void | - |
| slideNext | slide to next slide | () => void | - |
| slidePrev | slide to prev slide | () => void | - |

### Image

| props | description | type | default |
| :-- | :-- | :-- | :-- |
| className | - | string | - |
| style | - | CSSProperties | - |
| alt | - | string | - |
| title | caption inner text or node | string \| node | - |
| transition | - | [EffectType](https://github.com/happy-func/react-nivo-slider/#effecttype) | - |
| thumb | thumb image src when controlNavThumbs it's true | string | - |
| onClick | - | () => void | - |

### Link

same as a tag

### EffectType

```tsx
type EffectType =
  | `random`
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
```

## Support By

[Nivo-Slider-jQuery](https://github.com/Codeinwp/Nivo-Slider-jQuery)
