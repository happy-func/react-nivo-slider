import React from 'react';

export function clsx(list: (string | undefined)[]): string {
  return list.filter((item) => !!item).join(` `);
}

export function getChildren(c: React.ReactNode): {
  slides: (React.ReactChild | React.ReactFragment | React.ReactPortal)[];
} {
  const slides: React.ReactElement<any>[] = [];
  React.Children.toArray(c).forEach((child) => {
    if (child.type && child.type.displayName === 'SwiperSlide') {
      slides.push(child);
    }
  });
  return { slides };
}

export function getSlideImageAttr(
  c: React.ReactChild | React.ReactFragment | React.ReactPortal,
): { src: string; alt?: string; title?: string } | undefined {
  const nodes = !c.props.children
    ? []
    : Array.isArray(c.props.children)
    ? c.props.children
    : [c.props.children];
  const target = nodes.find((item: { type: string }) => item.type === `img`);
  if (!target) console.error('Swiper Slide Must Include Image Child');
  return target?.props;
}

export function updateSwiperImagesHeight(nodes: HTMLCollection, height) {
  function getImages(deepNodes: HTMLCollection): HTMLImageElement[] {
    return ([...deepNodes] as []).reduce((pre, cur) => {
      if (cur.tagName === `IMG`) {
        return [...pre, cur];
      }
      return [...pre, ...getImages(cur.children)];
    }, []);
  }
  const images = getImages(nodes);
  images.forEach((item) => {
    item.style.height = height;
    console.log(item);
  });
}
