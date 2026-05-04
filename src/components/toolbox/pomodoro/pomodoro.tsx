import { useState, useEffect, useRef, useMemo } from 'react';
import { FaUndo, Fa播放, Fa暂停 } from 'react-icons/fa/index';
import { IoMd设置 } from 'react-icons/io/index';

import { Modal } from '@/components/modal';
import { Button } from '../generics/button';
import { 计时器 } from './timer';
import { Tabs } from './tabs';
import { Setting } from './setting';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { useSoundEffect } from '@/hooks/use-sound-effect';
import { usePomodoroStore } from '@/stores/pomodoro';
import { use设置Store } from '@/stores/settings';
import { use关闭Listener } from '@/hooks/use-close-listener';

import styles from './pomodoro.module.css';

interface PomodoroProps {
  on关闭: () => void;
  open: () => void;
  show: boolean;
}

export function Pomodoro({ on关闭, open, show }: PomodoroProps) {
  const [showSetting, setShowSetting] = useState(false);

  const [selectedTab, setSelectedTab] = useState('pomodoro');

  const running = usePomodoroStore(state => state.running);
  const setRunning = usePomodoroStore(state => state.setRunning);

  const [timer, set计时器] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const alarm音量 = use设置Store(state => state.alarm音量);

  const alarm = useSoundEffect('/sounds/alarm.mp3', alarm音量);

  const defaultTimes = useMemo(
    () => ({
      long: 15 * 60,
      pomodoro: 25 * 60,
      short: 5 * 60,
    }),
    [],
  );

  const [times, setTimes] = useLocalStorage<Record<string, number>>(
    'moodist-pomodoro-setting',
    defaultTimes,
  );

  const [completions, setCompletions] = useState<Record<string, number>>({
    long: 0,
    pomodoro: 0,
    short: 0,
  });

  const tabs = useMemo(
    () => [
      { id: 'pomodoro', label: 'Pomodoro' },
      { id: 'short', label: 'Break' },
      { id: 'long', label: 'Long Break' },
    ],
    [],
  );

  use关闭Listener(() => setShowSetting(false));

  useEffect(() => {
    if (running) {
      if (interval.current) clearInterval(interval.current);

      interval.current = setInterval(() => {
        set计时器(prev => prev - 1);
      }, 1000);
    } else {
      if (interval.current) clearInterval(interval.current);
    }
  }, [running]);

  useEffect(() => {
    if (timer <= 0 && running) {
      if (interval.current) clearInterval(interval.current);

      alarm.play();

      setRunning(false);
      setCompletions(prev => ({
        ...prev,
        [selectedTab]: prev[selectedTab] + 1,
      }));
    }
  }, [timer, selectedTab, running, setRunning, alarm]);

  useEffect(() => {
    const time = times[selectedTab] || 10;

    if (interval.current) clearInterval(interval.current);

    setRunning(false);
    set计时器(time);
  }, [selectedTab, times, setRunning]);

  const toggleRunning = () => {
    if (running) setRunning(false);
    else if (timer <= 0) {
      const time = times[selectedTab] || 10;

      set计时器(time);
      setRunning(true);
    } else setRunning(true);
  };

  const restart = () => {
    if (interval.current) clearInterval(interval.current);

    const time = times[selectedTab] || 10;

    setRunning(false);
    set计时器(time);
  };

  return (
    <>
      <Modal show={show} on关闭={on关闭}>
        <header class名称={styles.header}>
          <h2 class名称={styles.title}>Pomodoro 计时器</h2>

          <div class名称={styles.button}>
            <Button
              icon={<IoMd设置 />}
              tooltip="Change Times"
              onClick={() => {
                on关闭();
                setShowSetting(true);
              }}
            />
          </div>
        </header>

        <Tabs selectedTab={selectedTab} tabs={tabs} onSelect={setSelectedTab} />
        <计时器 timer={timer} />

        <div class名称={styles.control}>
          <p class名称={styles.completed}>
            {completions[selectedTab] || 0} completed
          </p>
          <div class名称={styles.buttons}>
            <Button
              icon={<FaUndo />}
              smallIcon
              tooltip="Restart"
              onClick={restart}
            />
            <Button
              icon={running ? <Fa暂停 /> : <Fa播放 />}
              smallIcon
              tooltip={running ? '暂停' : 'Start'}
              onClick={toggleRunning}
            />
          </div>
        </div>
      </Modal>

      <Setting
        show={showSetting}
        times={times}
        onChange={times => {
          setShowSetting(false);
          setTimes(times);
          open();
        }}
        on关闭={() => {
          setShowSetting(false);
          open();
        }}
      />
    </>
  );
}
