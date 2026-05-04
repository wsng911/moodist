import { BiMoney, BiUserCircle, BiLogoGithub } from 'react-icons/bi/index';
import { BsSoundwave, BsStars } from 'react-icons/bs/index';
import { RxMixerHorizontal } from 'react-icons/rx/index';

import { Balancer } from 'react-wrap-balancer';

import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './features.module.css';

export function Features() {
  const count = soundCount();

  const features = [
    {
      Icon: BiMoney,
      body: 'Immerse yourself in sound without spending a dime.',
      id: 'free-access',
      label: 'Free Access',
    },
    {
      Icon: BiUserCircle,
      body: 'Dive right in, no sign-up hoops to jump through.',
      id: 'no-registration',
      label: 'No Registration',
    },
    {
      Icon: BsSoundwave,
      body: `Explore ${count} unique soundscapes, from rainforests to cityscapes.`,
      id: 'diverse-sounds',
      label: 'Diverse 音效',
    },
    {
      Icon: RxMixerHorizontal,
      body: 'Craft your perfect soundscape by blending and adjusting sounds.',
      id: 'customizable-mixes',
      label: '自定义izable Mixes',
    },
    {
      Icon: BiLogoGithub,
      body: 'Contribute and collaborate, making the best even better.',
      id: 'open-source',
      label: 'Open-Source',
      link: {
        label: 'Source Code',
        url: 'https://github.com/remvze/moodist',
      },
    },
    {
      Icon: BsStars,
      body: 'Uninterrupted immersion, focus on the sounds, not the tech.',
      id: 'seamless-experience',
      label: 'Seamless Experience',
    },
    {
      Icon: BsStars,
      body: 'Spread the calm, easily share your customized sound blends.',
      id: 'share-selections',
      label: 'Share Selections',
    },
    {
      Icon: BsStars,
      body: 'Lock in your favorite mixes for instant return to your sonic haven.',
      id: 'save-presets',
      label: '保存 预设',
      soon: true,
    },
  ];

  return (
    <section class名称={styles.featuresSection}>
      <Container>
        <div class名称={styles.iconContainer}>
          <div class名称={styles.tail} />
          <div class名称={styles.icon}>
            <BsStars />
          </div>
        </div>

        <h2 class名称={styles.title}>Features</h2>

        <div class名称={styles.features}>
          {features.map(feature => (
            <div class名称={styles.reason} key={feature.id}>
              <div class名称={styles.icon}>
                <feature.Icon />
              </div>
              <h3 class名称={styles.label}>{feature.label}</h3>
              <p class名称={styles.body}>
                <Balancer>{feature.body}</Balancer>
              </p>

              {feature.link && (
                <a class名称={styles.link} href={feature.link.url}>
                  {feature.link.label}
                </a>
              )}

              {feature.soon && <div class名称={styles.soon}>Coming Soon</div>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
