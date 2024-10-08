import { useEffect, useState } from 'react';
import moment from 'moment';

export const Time = () => {
  const [time, setTime] = useState(() => moment());
  useEffect(() => {
    const int = setInterval(() => setTime(moment()), 1000);
    return () => {
      clearInterval(int);
    };
  }, [setTime]);

  let timeStr = time.format('llll');
  timeStr = timeStr[0].toUpperCase() + timeStr.slice(1);
  return <>{timeStr}</>;
};
