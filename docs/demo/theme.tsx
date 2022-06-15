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
        <Image src={NemoJpg} alt="图片1" />
      </Link>
      <Image src={ToyStoryJpg} alt="图片2" title="图片2" />
      <Image src={WalleJpg} alt="图片3" />
      <Image src={UpJpg} alt="图片4" />
    </Swiper>
  );
}
