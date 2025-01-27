import React, { FC } from 'react';
import { IButtonProps } from '../../types/types';

export const Button: FC<IButtonProps> = ({
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
