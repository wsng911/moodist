import * as RadixSlider from '@radix-ui/react-slider';
import styles from './slider.module.css';

type SliderProps = {
  class名称?: string;
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  step?: number;
  value?: number;
};

export function Slider({
  class名称,
  defaultValue = 50,
  disabled = false,
  max = 100,
  min = 0,
  onChange,
  step = 1,
  value,
}: SliderProps) {
  const handleValueChange = (values: number[]) => {
    if (onChange) onChange(values[0]);
  };

  return (
    <RadixSlider.Root
      class名称={`${styles.sliderRoot} ${class名称}`}
      defaultValue={[defaultValue]}
      disabled={disabled}
      max={max}
      min={min}
      step={step}
      tabIndex={0}
      value={value !== undefined ? [value] : undefined}
      onValueChange={handleValueChange}
    >
      <RadixSlider.Track class名称={styles.sliderTrack}>
        <RadixSlider.Range class名称={styles.sliderRange} />
      </RadixSlider.Track>
      <RadixSlider.Thumb class名称={styles.sliderThumb} />
    </RadixSlider.Root>
  );
}
