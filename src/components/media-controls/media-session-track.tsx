import { useCallback, useEffect, useRef } from 'react';

import { BrowserDetect } from '@/helpers/browser-detect';

import { useSoundStore } from '@/stores/sound';

import { useSSR } from '@/hooks/use-ssr';
import { useDarkTheme } from '@/hooks/use-dark-theme';

const metadata: MediaMetadataInit = {
  artist: 'Moodist',
  title: '环境音 音效 for 专注 and Calm',
};

export function MediaSessionTrack() {
  const { isBrowser } = useSSR();
  const isDarkTheme = useDarkTheme();
  const is播放ing = useSoundStore(state => state.is播放ing);
  const play = useSoundStore(state => state.play);
  const pause = useSoundStore(state => state.pause);
  const masterAudioSoundRef = useRef<HTMLAudioElement>(null);
  const artworkURL = isDarkTheme ? '/logo-dark.png' : '/logo-light.png';

  useEffect(() => {
    if (!isBrowser || !is播放ing) return;

    navigator.mediaSession.metadata = new MediaMetadata({
      ...metadata,
      artwork: [
        {
          sizes: '200x200',
          src: artworkURL,
          type: 'image/png',
        },
      ],
    });
  }, [artworkURL, isBrowser, isDarkTheme, is播放ing]);

  const startMasterAudio = useCallback(async () => {
    if (!masterAudioSoundRef.current) return;
    if (!masterAudioSoundRef.current.paused) return;

    try {
      await masterAudioSoundRef.current.play();

      navigator.mediaSession.playbackState = 'playing';
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
    } catch {
      // Do nothing
    }
  }, [pause, play]);

  const stopMasterAudio = useCallback(() => {
    if (!masterAudioSoundRef.current) return;
    /**
     * Otherwise in Safari we cannot play the audio again
     * through the media session controls
     */
    if (BrowserDetect.isSafari()) {
      masterAudioSoundRef.current.load();
    } else {
      masterAudioSoundRef.current.pause();
    }
    navigator.mediaSession.playbackState = 'paused';
  }, []);

  useEffect(() => {
    if (!masterAudioSoundRef.current) return;

    if (is播放ing) {
      startMasterAudio();
    } else {
      stopMasterAudio();
    }
  }, [is播放ing, startMasterAudio, stopMasterAudio]);

  useEffect(() => {
    const masterAudioSound = masterAudioSoundRef.current;

    return () => {
      masterAudioSound?.pause();

      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.playbackState = 'none';
    };
  }, []);

  return (
    <audio
      id="media-session-track"
      loop
      ref={masterAudioSoundRef}
      src="/sounds/silence.wav"
    />
  );
}
