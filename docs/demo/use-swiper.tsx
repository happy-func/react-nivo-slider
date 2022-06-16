import React from 'react';
import { Image, Link, Swiper, useSwiper } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
import { NemoJpg, ToyStoryJpg, UpJpg, WalleJpg } from './img';

function CustomControl() {
  const swiper = useSwiper();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: `translateX(-50%)`,
        display: 'flex',
        zIndex: 10,
      }}
    >
      {swiper.slides.map((_, index) => (
        <div
          key={index}
          style={{
            width: 50,
            height: 10,
            borderRadius: 5,
            backgroundColor: swiper.activeIndex === index ? `#fff` : '#999',
            border: `1px solid ${swiper.activeIndex === index ? `#999` : `#fff`}`,
            margin: `0 10px`,
            cursor: 'pointer',
          }}
          onClick={() => swiper.slideTo(index)}
        />
      ))}
    </div>
  );
}

export default function RefDemo() {
  return (
    <div style={{ position: 'relative' }}>
      <Swiper controlNav={false} directionNav={false}>
        <Link href="https://baidu.com">
          <Image src={NemoJpg} alt="图片1" />
        </Link>
        <Image src={ToyStoryJpg} alt="图片2" title="图片2" />
        <Image src={WalleJpg} alt="图片3" />
        <Image src={UpJpg} alt="图片4" />
        <CustomControl />
      </Swiper>
    </div>
  );
}
