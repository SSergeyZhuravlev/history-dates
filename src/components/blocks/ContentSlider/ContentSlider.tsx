import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import gsap from 'gsap';
import { NextArrow, PrevArrow } from '../../shared/ui/Arrows/Arrows';
import { contentItem } from '../../shared/types/types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './ContentSlider.scss';

export const ContentSlider = React.memo(
  ({ contentList }: { contentList: contentItem[] }) => {
    const swiperRef = useRef<SwiperRef | null>(null);
    const prevBtn = useRef<HTMLButtonElement>(null);
    const nextBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      if (swiperRef.current) {
        gsap.fromTo(
          swiperRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5 },
        );
      }
    }, [contentList]);

    return (
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination]}
        spaceBetween={80}
        slidesPerView={3}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.nextEl = nextBtn.current;
            swiper.params.navigation.prevEl = prevBtn.current;
          }
        }}
        navigation={{
          nextEl: nextBtn.current,
          prevEl: prevBtn.current,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          540: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 25,
          },
        }}
      >
        {contentList.map(({ date, description }) => (
          <SwiperSlide key={date}>
            <h2 className="content-slider__title">{date}</h2>
            <p className="content-slider__text">{description}</p>
          </SwiperSlide>
        ))}
        <div className="content-slider__navigation">
          <button
            className="content-slider__btn content-slider__prev-btn"
            ref={prevBtn}
          >
            <PrevArrow />
          </button>
          <button
            className="content-slider__btn content-slider__next-btn"
            ref={nextBtn}
          >
            <NextArrow />
          </button>
        </div>
      </Swiper>
    );
  },
);
