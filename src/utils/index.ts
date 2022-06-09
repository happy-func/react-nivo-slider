import React from 'react';

export function clsx(list: (string | undefined)[]): string {
  return list.filter((item) => !!item).join(` `);
}

export function getChildren(c: React.ReactNode): { slides: React.ReactElement<any>[] } {
  const slides: React.ReactElement<any>[] = [];
  React.Children.toArray(c).forEach((child) => {
    if (child.type && child.type.displayName === 'SwiperSlide') {
      slides.push(child);
    }
  })
  return { slides };
}
