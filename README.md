# react-nivo-slider

![version](https://img.shields.io/github/package-json/v/happy-func/react-nivo-slider/main) ![typescript](https://img.shields.io/npm/types/react-nivo-slider) ![esm](https://img.shields.io/static/v1?label=build&message=esm&color=blue) ![npm bundle size (version)](https://img.shields.io/bundlephobia/min/react-nivo-slider/1.0.0) ![GitHub Repo stars](https://img.shields.io/github/stars/happy-func/react-swim-button?style=social)

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

export default function Default() {
  return (
    <Swiper>
      <Link href="//baidu.com">
        <Image src={NemoJpg} alt="图片1" />
      </Link>
      <Image src={ToyStoryJpg} alt="图片2" title="图片2" />
      <Image src={WalleJpg} alt="图片3" />
      <Image src={UpJpg} alt="图片4" />
    </Swiper>
  );
}
```

## API

### Swiper props

| props | description | type | default |
| :-- | :-- | :-- | :-- | --- |
| className | - | string | - |
| style | - | CSSProperties | - |
| theme | theme | `default` \| `light` \  | `dark` \| `bar` | default |
| effect | transition effect | [EffectType](./#effecttype) | random |
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

### Image

| props | description | type | default |
| :-- | :-- | :-- | :-- |
| className | - | string | - |
| style | - | CSSProperties | - |
| alt | - | string | - |
| title | caption inner text or node | string \| node | - |
| transition | - | [EffectType](./#effecttype) | - |
| thumb | thumb image src when controlNavThumbs it's true | string | - |

### Link

same as a tag

### EffectType

```tsx
type EffectType =
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
```

## Support By

[Nivo-Slider-jQuery](https://github.com/Codeinwp/Nivo-Slider-jQuery)
