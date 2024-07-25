import { CURRENCY_FORMATTER, NUMBER_FORMATTER } from '@/shared/lib/constants';

export const formatCurrency = (amount: number) => {
  return CURRENCY_FORMATTER.format(amount);
};

export const formatNumber = (number: number) => {
  return NUMBER_FORMATTER.format(number);
};
