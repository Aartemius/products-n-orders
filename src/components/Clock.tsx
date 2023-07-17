import { FC, useEffect, useState } from 'react';

const Clock: FC = () => {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date
      .getHours()
      .toString()
      .padStart(2, '0');
    const minutes = date
      .getMinutes()
      .toString()
      .padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const [time, setTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <span>{time}</span>;
};

export default Clock;
