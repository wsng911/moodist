import { useEffect, useState, useRef, useCallback } from 'react';

import { Modal } from '@/components/modal';
import { Slider } from '@/components/slider';

import styles from './binaural.module.css';

interface BinauralProps {
  on关闭: () => void;
  show: boolean;
}

interface Preset {
  baseFrequency: number;
  beatFrequency: number;
  name: string;
}

const presets: Preset[] = [
  { baseFrequency: 100, beatFrequency: 2, name: 'Delta (Deep Sleep) 2 Hz' },
  { baseFrequency: 100, beatFrequency: 5, name: 'Theta (Meditation) 5 Hz' },
  { baseFrequency: 100, beatFrequency: 10, name: 'Alpha (Relaxation) 10 Hz' },
  { baseFrequency: 100, beatFrequency: 20, name: 'Beta (专注) 20 Hz' },
  { baseFrequency: 100, beatFrequency: 40, name: 'Gamma (Cognition) 40 Hz' },
  { baseFrequency: 440, beatFrequency: 10, name: '自定义' },
];

function computeBinauralBeatOscillatorFrequencies(
  baseFrequency: number,
  beatFrequency: number,
) {
  return {
    leftFrequency: baseFrequency - beatFrequency / 2,
    rightFrequency: baseFrequency + beatFrequency / 2,
  };
}

export function BinauralModal({ on关闭, show }: BinauralProps) {
  const [baseFrequency, setBaseFrequency] = useState<number>(440); // Default to A4 note
  const [beatFrequency, setBeatFrequency] = useState<number>(10); // Default to 10 Hz difference
  const [volume, set音量] = useState<number>(0.5); // Default volume at 50%
  const [is播放ing, setIs播放ing] = useState<boolean>(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('自定义');

  const audioContextRef = useRef<AudioContext | null>(null);
  const leftOscillatorRef = useRef<OscillatorNode | null>(null);
  const rightOscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const startSound = () => {
    if (is播放ing) return;

    // Initialize the AudioContext
    audioContextRef.current = new window.AudioContext();
    const audioContext = audioContextRef.current;

    if (!audioContext) return;

    // 创建 a gain node for volume control
    gainNodeRef.current = audioContext.createGain();
    gainNodeRef.current.gain.value = volume; // Set volume based on state

    // 创建 oscillators for left and right channels
    leftOscillatorRef.current = audioContext.createOscillator();
    rightOscillatorRef.current = audioContext.createOscillator();

    if (
      !leftOscillatorRef.current ||
      !rightOscillatorRef.current ||
      !gainNodeRef.current
    )
      return;

    const { leftFrequency, rightFrequency } =
      computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
    leftOscillatorRef.current.frequency.value = leftFrequency;
    rightOscillatorRef.current.frequency.value = rightFrequency;

    // Pan oscillators to left and right
    const leftPanner = audioContext.createStereoPanner();
    leftPanner.pan.value = -1;

    const rightPanner = audioContext.createStereoPanner();
    rightPanner.pan.value = 1;

    // Connect nodes
    leftOscillatorRef.current.connect(leftPanner).connect(gainNodeRef.current);
    rightOscillatorRef.current
      .connect(rightPanner)
      .connect(gainNodeRef.current);
    gainNodeRef.current.connect(audioContext.destination);

    // Start oscillators
    leftOscillatorRef.current.start();
    rightOscillatorRef.current.start();

    setIs播放ing(true);
  };

  const stopSound = useCallback(() => {
    if (!is播放ing) return;

    leftOscillatorRef.current?.stop();
    rightOscillatorRef.current?.stop();
    audioContextRef.current?.close();

    setIs播放ing(false);
  }, [is播放ing]);

  useEffect(() => {
    // Update gain node when volume changes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    // Update base frequency for both left and right oscillators when it changes
    if (leftOscillatorRef.current && rightOscillatorRef.current) {
      const { leftFrequency, rightFrequency } =
        computeBinauralBeatOscillatorFrequencies(baseFrequency, beatFrequency);
      leftOscillatorRef.current.frequency.value = leftFrequency;
      rightOscillatorRef.current.frequency.value = rightFrequency;
    }
  }, [baseFrequency, beatFrequency]);

  useEffect(() => {
    // Cleanup when component unmounts
    return () => {
      if (is播放ing) {
        stopSound();
      }
    };
  }, [is播放ing, stopSound]);

  useEffect(() => {
    // Update frequencies when a preset is selected
    if (selectedPreset !== '自定义') {
      const preset = presets.find(p => p.name === selectedPreset);
      if (preset) {
        setBaseFrequency(preset.baseFrequency);
        setBeatFrequency(preset.beatFrequency);
      }
    }
  }, [selectedPreset]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    setSelectedPreset(selected);

    if (selected === '自定义') {
      // Allow user to input custom frequencies
      return;
    }

    const preset = presets.find(p => p.name === selected);
    if (preset) {
      setBaseFrequency(preset.baseFrequency);
      setBeatFrequency(preset.beatFrequency);
    }
  };

  return (
    <Modal show={show} on关闭={on关闭}>
      <header class名称={styles.header}>
        <h2 class名称={styles.title}>Binaural Beat</h2>
        <p class名称={styles.desc}>Binaural beat generator.</p>
      </header>

      <div class名称={styles.fieldWrapper}>
        <label>
          预设:
          <select value={selectedPreset} onChange={handlePresetChange}>
            {presets.map(preset => (
              <option key={preset.name} value={preset.name}>
                {preset.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedPreset === '自定义' && (
        <>
          <div class名称={styles.fieldWrapper}>
            <label>
              Base Frequency (Hz):
              <input
                max="1500"
                min="20"
                step="0.1"
                type="number"
                value={baseFrequency}
                onChange={e =>
                  setBaseFrequency(parseFloat(e.target.value || '0'))
                }
              />
            </label>
          </div>
          <div class名称={styles.fieldWrapper}>
            <label>
              Beat Frequency (Hz):
              <input
                max="40"
                min="0.1"
                step="0.1"
                type="number"
                value={beatFrequency}
                onChange={e =>
                  setBeatFrequency(parseFloat(e.target.value || '0'))
                }
              />
            </label>
          </div>
        </>
      )}
      <div class名称={styles.fieldWrapper}>
        <label>
          音量:
          <Slider
            class名称={styles.volume}
            max={1}
            min={0}
            step={0.01}
            value={volume}
            onChange={value => set音量(value)}
          />
        </label>
      </div>
      <div class名称={styles.buttons}>
        <button
          class名称={styles.primary}
          disabled={is播放ing}
          onClick={startSound}
        >
          Start
        </button>
        <button disabled={!is播放ing} onClick={stopSound}>
          Stop
        </button>
      </div>
    </Modal>
  );
}
