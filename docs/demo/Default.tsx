import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg, WalleJpg } from './img';

export default function Default() {
  return (
    <Swiper>
      <Link href="//baidu.com">
        <Image src={NemoJpg} alt="图片1" transition="sliceDown" />
      </Link>
      <Image src={ToyStoryJpg} alt="图片2" transition="sliceDownRight" />
      <Image src={WalleJpg} alt="图片3" transition="sliceDownLeft" />
    </Swiper>
  );
}
