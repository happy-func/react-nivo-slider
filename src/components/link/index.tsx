import React from 'react';

function Link(props: LinkProps) {
  const { href, title, children, style, active } = props;
  return (
    <a href={href} title={title} style={{ display: active ? `block` : 'none', ...style }}>
      {children}
    </a>
  );
}

interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  [key: string]: any;
  active?: boolean;
}

Link.displayName = `Link`;

export default Link;
