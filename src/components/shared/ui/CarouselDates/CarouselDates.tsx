import React, { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ICarouselDates } from '../../types/types';
import './CarouselDates.scss';

export const CarouselDates: FC<ICarouselDates> = React.memo(
  ({ dates, start, end }) => {
    const startEl = useRef<HTMLSpanElement>(null);
    const endEl = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (startEl.current && endEl.current) {
        gsap.to(startEl.current, {
          innerText: start,
          duration: 0.5,
          snap: 'innerText',
        });
        gsap.to(endEl.current, {
          innerText: end,
          duration: 0.5,
          snap: 'innerText',
        });
      }
    }, [start, end]);

    return (
      <div className="carousel__date__wrapper">
        <span className="carousel__date carousel__date--start" ref={startEl}>
          {dates[0].dateStart}
        </span>
        <span className="carousel__date carousel__date--end" ref={endEl}>
          {dates[0].dateEnd}
        </span>
      </div>
    );
  },
);
