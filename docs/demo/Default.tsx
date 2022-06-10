import React from 'react';
import { Swiper, Image, Link } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg } from './img';

export default function Default() {
  return (
    <Swiper>
      <Link href="//baidu.com">
        <Image src={NemoJpg} alt="图片1" />
      </Link>
      <Image src={ToyStoryJpg} alt="图片2" />
    </Swiper>
  );
}
