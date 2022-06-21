import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/bar';
import 'react-nivo-slider/es/style/dark';
import 'react-nivo-slider/es/style/default';
import 'react-nivo-slider/es/style/light';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

export default function Theme() {
  return (
    <Swiper theme="bar">
      <Link href="https://baidu.com">
        <Image src={NemoJpg} alt="image1" />
      </Link>
      <Image src={ToyStoryJpg} alt="image2" title="image2" />
      <Image src={WalleJpg} alt="image3" />
      <Image src={UpJpg} alt="image4" />
    </Swiper>
  );
}
