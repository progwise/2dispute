import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { de } from 'date-fns/locale';

const getDistance = (dateTime: string): string => {
  const date = new Date(dateTime);
  return formatDistanceToNow(date, { locale: de });
};

const getFullDate = (dateTime: string): string => {
  const date = new Date(dateTime);
  return format(date, 'PPPp', { locale: de });
};

interface DateTimeDistanceProps {
  dateTime: string;
  className?: string;
}

const DateTimeDistance = ({
  dateTime,
  className,
}: DateTimeDistanceProps): JSX.Element => {
  const [distance, setDistance] = useState(getDistance(dateTime));
  const updateDistance = (): void => setDistance(getDistance(dateTime));

  const fullDate = getFullDate(dateTime);

  useEffect(() => {
    updateDistance();
    const interval = setInterval(updateDistance, 60 * 1000);
    return (): void => clearInterval(interval);
  }, [setDistance, dateTime]);

  return (
    <span className={className} title={fullDate}>
      {distance}
    </span>
  );
};

export default DateTimeDistance;
