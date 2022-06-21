import React from 'react';
import { Image, Link, Swiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

const logger = (msg: string) => () => console.log(msg);

export default function DefaultDemo() {
  return (
    <Swiper>
      <Link href="https://www.surpath.net.cn">
        <Image src={NemoJpg} alt="image1" onClick={logger('bad event handler')} />
      </Link>
      <Image
        src={ToyStoryJpg}
        alt="image2"
        title="image2"
        onClick={logger('image2 Clicked')}
      />
      <Image src={WalleJpg} alt="image3" onClick={logger('image3 Clicked')} />
      <Image src={UpJpg} alt="image4" onClick={logger('image4 Clicked')} />
    </Swiper>
  );
}
