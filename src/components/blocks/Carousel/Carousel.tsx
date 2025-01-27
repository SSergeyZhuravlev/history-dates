import React, { useEffect, useRef, useState } from 'react';
import { ICarouselProps } from '../../../components/shared/types/types';
import { CarouselPoint } from '../../shared/ui/CarouselPoint/CarouselPoint';
import { CarouselDates } from '../../shared/ui/CarouselDates/CarouselDates';
import { ContentSlider } from '../ContentSlider/ContentSlider';
import { Button } from '../../shared/ui/Button/Button';
import { NextArrow, PrevArrow } from '../../shared/ui/Arrows/Arrows';
import './Carousel.scss';

const Carousel: React.FC<ICarouselProps> = ({ content }) => {
  const ref = useRef<HTMLUListElement>(null);
  const [activePoint, setActivePoint] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);

  const dates = content.map((item) => item.period);
  const contentList = content.map((item) => item.content);

  const [start, setStart] = useState(dates[activePoint]?.dateStart || 0);
  const [end, setEnd] = useState(dates[activePoint]?.dateEnd || 0);

  const [isPrevDisable, setIsPrevDisable] = useState(true);
  const [isNextDisable, setIsNextDisable] = useState(false);

  const [carouselSize, setCarouselSize] = useState({ width: 530, height: 530 });
  const radius = Math.min(carouselSize.width, carouselSize.height) / 2;

  const handlePointClick = (i: number) => {
    if (i < 0 || i >= dates.length) return;
    setActivePoint(i);
  };

  const handleMouseEnter = (i: number) => setHover(i);
  const handleMouseLeave = () => setHover(null);

  useEffect(() => {
    if (ref.current) {
      setCarouselSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
    setIsPrevDisable(activePoint === 0);
    setIsNextDisable(activePoint === dates.length - 1);
  }, [activePoint, dates.length]);

  useEffect(() => {
    setStart(dates[activePoint]?.dateStart || 0);
    setEnd(dates[activePoint]?.dateEnd || 0);
  }, [activePoint, dates]);

  return (
    <section className="carousel-section">
      <h1 className="carousel-section__title">Исторические даты</h1>
      <CarouselDates dates={dates} start={start} end={end} />
      <div className="carousel-container">
        <ul
          ref={ref}
          className="carousel"
          style={{
            width: `${carouselSize.width}px`,
            height: `${carouselSize.height}px`,
          }}
        >
          <li className="circle" />
          {content.map((item, indx) => {
            const isActive = activePoint === indx;
            const isHovered = hover === indx;
            const scale = isActive || isHovered ? 1.7 : 0.2;
            const backgroundColor =
              isActive || isHovered ? '' : 'rgba(48, 62, 88)';

            const styles = {
              transform: `
                rotate(${((indx - activePoint) * 360) / content.length - 60}deg)
                translate(${radius}px)
                rotate(${-((indx - activePoint) * 360) / content.length}deg)
                rotate(59deg)
                scale(${scale})
              `,
              background: backgroundColor,
            };

            return (
              <CarouselPoint
                key={item.id}
                id={item.id.toString()}
                className={`point ${isActive ? 'active' : ''}`}
                style={styles}
                onClick={() => handlePointClick(indx)}
                onMouseEnter={() => handleMouseEnter(indx)}
                onMouseLeave={handleMouseLeave}
              >
                <span>{indx + 1}</span>
              </CarouselPoint>
            );
          })}
        </ul>
      </div>
      <div className="carousel__date__nav__wrapper">
        <div className="carousel__date__nav">
          {`0${activePoint + 1}/0${dates.length}`}
        </div>
        <div className="carousel__date__btn__wrapper">
          <Button
            className="carousel__date__btn carousel__date__btn--prev"
            onClick={() => handlePointClick(activePoint - 1)}
            disabled={isPrevDisable}
          >
            <PrevArrow />
          </Button>
          <Button
            className="carousel__date__btn carousel__date__btn--next"
            onClick={() => handlePointClick(activePoint + 1)}
            disabled={isNextDisable}
          >
            <NextArrow />
          </Button>
        </div>
      </div>
      <ContentSlider contentList={contentList[activePoint]} />
    </section>
  );
};

export default Carousel;
