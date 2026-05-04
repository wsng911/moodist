import { Reverse } from './reverse';

import { padNumber } from '@/helpers/number';

import styles from './timer.module.css';

interface 计时器Props {
  reverse: number;
  timer: number;
}

export function 计时器({ reverse, timer }: 计时器Props) {
  let hours = Math.floor(timer / 3600);
  let minutes = Math.floor((timer % 3600) / 60);
  let seconds = timer % 60;

  hours = isNaN(hours) ? 0 : hours;
  minutes = isNaN(minutes) ? 0 : minutes;
  seconds = isNaN(seconds) ? 0 : seconds;

  const formattedHours = padNumber(hours);
  const formattedMinutes = padNumber(minutes);
  const formattedSeconds = padNumber(seconds);

  return (
    <div class名称={styles.timer}>
      <Reverse time={reverse} />
      {formattedHours}:{formattedMinutes}:{formattedSeconds}
    </div>
  );
}
