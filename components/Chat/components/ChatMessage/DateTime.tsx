import React from 'react';

interface DateTimeProps {
  dateTime: string;
  className?: string;
}

const DateTime = ({ dateTime, className }: DateTimeProps): JSX.Element => {
  const date = new Date(dateTime);
  const timeString = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
  const dateString = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);

  return (
    <span className={`text-sm ${className}`}>
      {timeString} - {dateString}
    </span>
  );
};

export default DateTime;
