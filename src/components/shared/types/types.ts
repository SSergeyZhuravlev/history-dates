import React from 'react';

export interface ICarouselPointProps {
  id: string
  className: string
  style: React.CSSProperties
  onClick: () => void
  onMouseEnter: (e: React.MouseEvent) => void
  onMouseLeave: () => void
  children: React.ReactNode
}

export type contentItem = {
  date: number
  description: string
}

export type contentListItem = {
  id: number
  period: { dateStart: number; dateEnd: number }
  content: contentItem[]
}

export interface ICarouselProps {
  content: contentListItem[]
}

export interface ICarouselDates {
  dates: contentListItem['period'][]
  start: number
  end: number
}

export interface IButtonProps {
  children: React.ReactNode
  className: string
  disabled: boolean
  onClick: () => void
}
