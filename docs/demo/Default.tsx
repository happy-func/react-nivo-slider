import React from 'react';
import { Swiper, SwiperSlide } from 'react-nivo-slider';
import 'react-nivo-slider/es/style';
import 'react-nivo-slider/es/style/default';
export default function Default() {
  return (
    <Swiper>
      <SwiperSlide>
        <img
          src="//dev-ucmanage.oss-cn-hangzhou.aliyuncs.com/a2408feedafe48d1b7df84db9d7a4970?Expires=1970122323&OSSAccessKeyId=LTAIgmm4yvRpX4Ht&Signature=wNZERRfO0mEnTJSu1WcYhuROM%2Fo%3D"
          alt="图片1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="//dev-ucmanage.oss-cn-hangzhou.aliyuncs.com/2618ab455c604c1680bcb067e8392ad8?Expires=1970121555&OSSAccessKeyId=LTAIgmm4yvRpX4Ht&Signature=TVttQFxdXQyt9xa%2FT7hX4QFANiE%3D"
          alt="图片2"
        />
      </SwiperSlide>
    </Swiper>
  );
}
