import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

export default function Default() {
  return (
    <Swiper controlNavThumbs>
      <Link href="https://baidu.com">
        <Image src={NemoJpg} alt="图片1" thumb={NemoJpg} />
      </Link>
      <Image src={ToyStoryJpg} alt="图片2" title="图片2" thumb={ToyStoryJpg} />
      <Image src={WalleJpg} alt="图片3" thumb={WalleJpg} />
      <Image src={UpJpg} alt="图片4" thumb={UpJpg} />
    </Swiper>
  );
}
