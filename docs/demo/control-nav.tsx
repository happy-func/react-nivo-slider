import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

export default function Default() {
  return (
    <Swiper controlNavThumbs>
      <Link href="https://baidu.com">
        <Image src={NemoJpg} alt="image1" thumb={NemoJpg} />
      </Link>
      <Image src={ToyStoryJpg} alt="image2" title="image2" thumb={ToyStoryJpg} />
      <Image src={WalleJpg} alt="image3" thumb={WalleJpg} />
      <Image src={UpJpg} alt="image4" thumb={UpJpg} />
    </Swiper>
  );
}
