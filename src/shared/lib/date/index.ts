import dayjs from 'dayjs';

export const isToday = (date: Date): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
};

export const isTomorrow = (date: Date): boolean => {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day');
};

export const isDayAfterTomorrow = (date: Date): boolean => {
  return dayjs(date).isSame(dayjs().add(2, 'day'), 'day');
};

export const formatDate = (date: Date | string): string => {
  return dayjs(date).format('DD.MM.YYYY');
};
