import React, { FC } from 'react';
import { ICarouselPointProps } from '../../types/types';
import './CarouselPoint.scss';

export const CarouselPoint: FC<ICarouselPointProps> = React.memo(
  ({ id, className, style, onClick, onMouseEnter, onMouseLeave, children }) => {
    return (
      <li
        id={id}
        className={className}
        style={style}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span>{children}</span>
      </li>
    );
  },
);
