import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/bar';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

export default function Effect() {
  return (
    <Swiper theme="bar" effect="boxRandom">
      <Link href="https://baidu.com">
        <Image src={NemoJpg} alt="image1" />
      </Link>
      <Image src={ToyStoryJpg} alt="image2" title="image2" />
      <Image src={WalleJpg} alt="image3" />
      <Image src={UpJpg} alt="image4" />
    </Swiper>
  );
}
