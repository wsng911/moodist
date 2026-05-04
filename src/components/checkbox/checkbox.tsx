import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { FaCheck } from 'react-icons/fa6/index';

import styles from './checkbox.module.css';

type CheckboxInputProps = {
  checked?: boolean;
  class名称?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export function Checkbox({
  checked,
  class名称,
  defaultChecked = false,
  disabled = false,
  onChange,
}: CheckboxInputProps) {
  const handleCheckedChange = (checked: boolean) => {
    if (onChange) onChange(checked);
  };

  return (
    <RadixCheckbox.Root
      checked={checked}
      class名称={`${styles.checkboxRoot} ${class名称}`}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
    >
      <RadixCheckbox.Indicator class名称={styles.checkboxIndicator}>
        <FaCheck />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
