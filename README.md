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

## Support By

[Nivo-Slider-jQuery](https://github.com/Codeinwp/Nivo-Slider-jQuery)
