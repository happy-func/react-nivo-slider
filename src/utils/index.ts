import React from 'react';

export function clsx(...list: (string | undefined | boolean)[]): string {
  return list.filter((item) => !!item).join(` `);
}

export function getChildren(c: React.ReactNode) {
  const slides: React.ReactElement<any>[] = [];
  React.Children.toArray(c).forEach((child: any) => {
    if (child.type?.displayName === 'Image') {
      slides.push({ ...child, props: { ...child.props, parentDisplayName: 'Swiper' } });
    } else if (
      child.type?.displayName === `Link` &&
      child.props.children?.type?.displayName === `Image`
    ) {
      slides.push({ ...child.props.children, props: {...child.props.children.props, parentDisplayName: 'Link'} });
    }
  });
  return { slides };
}

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }

  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
}
