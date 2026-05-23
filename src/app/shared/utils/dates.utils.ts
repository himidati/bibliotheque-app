import { format, isAfter, isDate, isValid } from 'date-fns';

export const formatDatewithSlash: (date: Date) => string = (date: Date): string => {
  return format(date, 'yyyy/MM/dd');
};

export const subDays: (date: Date, days: number) => Date = (date: Date, days: number): Date => {
  return subDays(date, days);
};

export const isDateValid: any = (date: unknown): boolean => isDate(date);

export const isAfterDate = (date: Date, dateToCompare: Date): boolean => {
  return isAfter(date, dateToCompare);
};
