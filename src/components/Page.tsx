import React, { HTMLAttributes } from 'react';

export const Page: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={`vstack full p-4 overflow-y-auto ${className}`} {...rest}>
      {children}
    </div>
  );
};
