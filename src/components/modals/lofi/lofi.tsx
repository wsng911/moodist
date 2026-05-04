import { useState } from 'react';
import YouTube from 'react-youtube';

import { Modal } from '@/components/modal/modal';

import styles from './lofi.module.css';
import { padNumber } from '@/helpers/number';

interface LofiProps {
  on关闭: () => void;
  show: boolean;
}

const videos = [
  {
    channel: 'Lofi Girl',
    id: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio',
  },
  {
    channel: 'Lofi Girl',
    id: '4xDzrJKXOOY',
    title: 'synthwave radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'P6Segk8cr-c',
    title: 'sad lofi radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'S_MOd40zlYU',
    title: 'dark ambient radio',
  },
  {
    channel: 'Lofi Girl',
    id: 'TtkFsfOP9QI',
    title: 'peaceful piano radio',
  },
];

export function LofiModal({ on关闭, show }: LofiProps) {
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <Modal persist show={show} on关闭={on关闭}>
      <h1 class名称={styles.title}>Lofi Music 播放er</h1>

      {!isAccepted ? (
        <div class名称={styles.notice}>
          <p>
            This feature plays music using embedded YouTube videos. By
            continuing, you agree to connect to YouTube, which may collect data
            in accordance with their privacy policy. We do not control or track
            this data.
          </p>

          <div class名称={styles.buttons}>
            <button onClick={on关闭}>取消</button>
            <button
              class名称={styles.primary}
              onClick={() => setIsAccepted(true)}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div class名称={styles.videos}>
          {videos.map((video, index) => (
            <div class名称={styles.video} key={video.id}>
              <h2>
                <span class名称={styles.index}>{padNumber(index + 1, 2)}</span>{' '}
                <strong>{video.channel}</strong> <span>/</span> {video.title}
              </h2>
              <div class名称={styles.container}>
                <YouTube iframeClass名称={styles.iframe} videoId={video.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
