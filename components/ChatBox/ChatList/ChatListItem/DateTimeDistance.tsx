import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { de, enUS } from 'date-fns/locale';
import i18nInstance from '../../../../utils/i18n';

const getDistance = (dateTime: string, locale: Locale): string => {
  const date = new Date(dateTime);
  return formatDistanceToNow(date, { locale });
};

const getFullDate = (dateTime: string, locale: Locale): string => {
  const date = new Date(dateTime);
  return format(date, 'PPPp', { locale });
};

interface DateTimeDistanceProps {
  dateTime: string;
  className?: string;
}

const DateTimeDistance = ({
  dateTime,
  className,
}: DateTimeDistanceProps): JSX.Element => {
  const { language } = i18nInstance.useTranslation().i18n;
  const locale = language === 'de' ? de : enUS;

  const [distance, setDistance] = useState(getDistance(dateTime, locale));
  const updateDistance = (): void => setDistance(getDistance(dateTime, locale));

  const fullDate = getFullDate(dateTime, locale);

  useEffect(() => {
    updateDistance();
    const interval = setInterval(updateDistance, 60 * 1000);
    return (): void => clearInterval(interval);
  }, [setDistance, dateTime, locale]);

  return (
    <span className={className} title={fullDate}>
      {distance}
    </span>
  );
};

export default DateTimeDistance;
