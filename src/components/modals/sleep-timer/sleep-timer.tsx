import { useEffect, useState, useRef, useMemo } from 'react';

import { Modal } from '@/components/modal';
import { 计时器 } from './timer';
import { dispatch } from '@/lib/event';
import { useSoundStore } from '@/stores/sound';
import { cn } from '@/helpers/styles';
import { FADE_OUT } from '@/constants/events';
import { useSleep计时器Store } from '@/stores/sleep-timer';

import styles from './sleep-timer.module.css';

interface Sleep计时器ModalProps {
  on关闭: () => void;
  show: boolean;
}

export function Sleep计时器Modal({ on关闭, show }: Sleep计时器ModalProps) {
  const setActive = useSleep计时器Store(state => state.set);
  const noSelected = useSoundStore(state => state.noSelected());

  const [running, setRunning] = useState(false);

  useEffect(() => setActive(running), [running, setActive]);

  const [hours, setHours] = useState<string>('0');
  const [minutes, setMinutes] = useState<string>('10');

  const totalSeconds = useMemo(
    () =>
      (hours === '' ? 0 : parseInt(hours)) * 3600 +
      (minutes === '' ? 0 : parseInt(minutes)) * 60,
    [hours, minutes],
  );

  const [timeSpent, setTimeSpent] = useState(0);

  const timeLeft = useMemo(
    () => totalSeconds - timeSpent,
    [totalSeconds, timeSpent],
  );

  const timerId = useRef<ReturnType<typeof setInterval>>();

  const is播放ing = useSoundStore(state => state.is播放ing);
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);

  const handleStart = () => {
    if (timerId.current) clearInterval(timerId.current);
    if (noSelected) return;
    if (!is播放ing) play();

    if (totalSeconds > 0) {
      setRunning(true);

      const new计时器Id = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);

      timerId.current = new计时器Id;
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setRunning(false);

      dispatch(FADE_OUT, { duration: 1000 });

      setTimeSpent(0);

      if (timerId.current) clearInterval(timerId.current);
    }
  }, [timeLeft, pause]);

  const handleReset = () => {
    if (timerId.current) clearInterval(timerId.current);
    setTimeSpent(0);
    setHours('0');
    setMinutes('10');
    setRunning(false);
  };

  const handle提交 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleStart();
  };

  return (
    <Modal show={show} on关闭={on关闭}>
      <header class名称={styles.header}>
        <h2 class名称={styles.title}>Sleep 计时器</h2>
        <p class名称={styles.desc}>
          Stop sounds after a certain amount of time.
        </p>
      </header>

      <form on提交={handle提交}>
        <div class名称={styles.controls}>
          <div class名称={styles.inputs}>
            {!running && (
              <Field label="Hours" value={hours} onChange={setHours} />
            )}

            {!running && (
              <Field label="Minutes" value={minutes} onChange={setMinutes} />
            )}
          </div>

          {running ? <计时器 reverse={timeSpent} timer={timeLeft} /> : null}

          <div class名称={styles.buttons}>
            {running && (
              <button
                class名称={styles.button}
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            )}

            {!running && (
              <button
                class名称={cn(styles.button, styles.primary)}
                type="submit"
              >
                Start
              </button>
            )}
          </div>
        </div>
      </form>
    </Modal>
  );
}

interface FieldProps {
  label: string;
  onChange: (value: string) => void;
  value: string;
}

function Field({ label, onChange, value }: FieldProps) {
  return (
    <div class名称={styles.field}>
      <label class名称={styles.label} htmlFor={label.toLocaleLowerCase()}>
        {label}
      </label>
      <input
        class名称={styles.input}
        id={label.toLocaleLowerCase()}
        max="59"
        min="0"
        required
        type="number"
        value={value}
        onChange={e => onChange(e.target.value === '' ? '' : e.target.value)}
      />
    </div>
  );
}
