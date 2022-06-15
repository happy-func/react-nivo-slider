import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/bar';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

export default function CustomEffect() {
  return (
    <Swiper theme="bar" effect="boxRain">
      <Link href="https://baidu.com">
        <Image src={NemoJpg} alt="图片1" transition="fold" />
      </Link>
      <Image src={ToyStoryJpg} alt="图片2" title="图片2" />
      <Image src={WalleJpg} alt="图片3" transition="fade" />
      <Image src={UpJpg} alt="图片4" />
    </Swiper>
  );
}
