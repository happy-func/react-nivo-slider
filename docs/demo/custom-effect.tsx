import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/bar';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

export default function CustomEffect() {
  return (
    <Swiper theme="bar" effect="boxRain">
      <Link href="https://baidu.com">
        <Image src={NemoJpg} alt="image1" transition="fold" />
      </Link>
      <Image src={ToyStoryJpg} alt="image2" title="image2" />
      <Image src={WalleJpg} alt="image3" transition="fade" />
      <Image src={UpJpg} alt="image4" />
    </Swiper>
  );
}
