import { useState, useEffect, useCallback } from 'react';

import { Modal } from '@/components/modal';

import { useSoundEffect } from '@/hooks/use-sound-effect';
import { use设置Store } from '@/stores/settings';
import { cn } from '@/helpers/styles';
import { padNumber } from '@/helpers/number';

import styles from './countdown.module.css';

interface CountdownProps {
  on关闭: () => void;
  show: boolean;
}

export function Countdown({ on关闭, show }: CountdownProps) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const alarm音量 = use设置Store(state => state.alarm音量);

  const alarm = useSoundEffect('/sounds/alarm.mp3', alarm音量);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      alarm.play();
      setIsActive(false);
      setIsFormVisible(true);
    }

    return () => clearTimeout(timer);
  }, [isActive, timeLeft, alarm]);

  const handleStart = useCallback(() => {
    if (hours > 0 || minutes > 0 || seconds > 0) {
      const totalTime =
        (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);

      setTimeLeft(totalTime);
      setInitialTime(totalTime);
      setIsActive(true);
      setIsFormVisible(false);
    }
  }, [hours, minutes, seconds]);

  const handle返回 = useCallback(() => {
    setIsActive(false);
    setIsFormVisible(true);
    setTimeLeft(0);
  }, []);

  const toggle计时器 = useCallback(() => {
    setIsActive(prev => !prev);
  }, []);

  const formatTime = useCallback((time: number) => {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;

    return `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(secs)}`;
  }, []);

  const elapsedTime = initialTime - timeLeft;

  return (
    <Modal show={show} on关闭={on关闭}>
      <header class名称={styles.header}>
        <h2 class名称={styles.title}>Countdown 计时器</h2>
        <p class名称={styles.desc}>Super simple countdown timer.</p>
      </header>

      {isFormVisible ? (
        <div class名称={styles.formContainer}>
          <div class名称={styles.inputContainer}>
            <input
              class名称={styles.input}
              placeholder="HH"
              type="number"
              value={hours}
              onChange={e => setHours(Math.max(0, parseInt(e.target.value)))}
            />

            <span>:</span>

            <input
              class名称={styles.input}
              placeholder="MM"
              type="number"
              value={minutes}
              onChange={e =>
                setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value))))
              }
            />

            <span>:</span>

            <input
              class名称={styles.input}
              placeholder="SS"
              type="number"
              value={seconds}
              onChange={e =>
                setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value))))
              }
            />
          </div>

          <div class名称={styles.buttonContainer}>
            <button
              class名称={cn(styles.button, styles.primary)}
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      ) : (
        <div class名称={styles.timerContainer}>
          <div class名称={styles.displayTime}>
            <p class名称={styles.reverse}>- {formatTime(elapsedTime)}</p>
            <span>{formatTime(timeLeft)}</span>
          </div>

          <div class名称={styles.buttonContainer}>
            <button class名称={styles.button} onClick={handle返回}>
              返回
            </button>

            <button
              class名称={cn(styles.button, styles.primary)}
              onClick={toggle计时器}
            >
              {isActive ? '暂停' : 'Start'}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
