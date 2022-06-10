import React from 'react';

export function clsx(...list: (string | undefined)[]): string {
  return list.filter((item) => !!item).join(` `);
}

export function getChildren(c: React.ReactNode) {
  const slides: React.ReactElement<any>[] = [];
  React.Children.toArray(c).forEach((child) => {
    if (child.type?.displayName === 'Image') {
      slides.push(child);
    } else if (
      child.type?.displayName === `Link` &&
      child.props.children?.type?.displayName === `Image`
    ) {
      slides.push(child.props.children);
    }
  });
  return { slides };
}

export function cloneDeep() {}
