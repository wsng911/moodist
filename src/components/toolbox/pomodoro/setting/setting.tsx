import { useEffect, useState } from 'react';

import { Modal } from '@/components/modal';

import styles from './setting.module.css';

interface SettingProps {
  onChange: (newTimes: Record<string, number>) => void;
  on关闭: () => void;
  show: boolean;
  times: Record<string, number>;
}

export function Setting({ onChange, on关闭, show, times }: SettingProps) {
  const [values, setValues] = useState<Record<string, number | string>>(times);

  useEffect(() => {
    if (show) setValues(times);
  }, [times, show]);

  const handleChange = (id: string) => (value: number | string) => {
    setValues(prev => ({
      ...prev,
      [id]: typeof value === 'number' ? value * 60 : '',
    }));
  };

  const handle提交 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newValues: Record<string, number> = {};

    Object.keys(values).forEach(name => {
      newValues[name] =
        typeof values[name] === 'number' ? values[name] : times[name];
    });

    onChange(newValues);
  };

  const handle取消 = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    on关闭();
  };

  return (
    <Modal lockBody={false} show={show} on关闭={on关闭}>
      <h2 class名称={styles.title}>Change Times</h2>

      <form class名称={styles.form} on提交={handle提交}>
        <Field
          id="pomodoro"
          label="Pomodoro"
          value={values.pomodoro}
          onChange={handleChange('pomodoro')}
        />
        <Field
          id="short"
          label="Short Break"
          value={values.short}
          onChange={handleChange('short')}
        />
        <Field
          id="long"
          label="Long Break"
          value={values.long}
          onChange={handleChange('long')}
        />

        <div class名称={styles.buttons}>
          <button type="button" onClick={handle取消}>
            取消
          </button>
          <button class名称={styles.primary} type="submit">
            保存
          </button>
        </div>
      </form>
    </Modal>
  );
}

interface FieldProps {
  id: string;
  label: string;
  onChange: (value: number | string) => void;
  value: number | string;
}

function Field({ id, label, onChange, value }: FieldProps) {
  return (
    <div class名称={styles.field}>
      <label class名称={styles.label} htmlFor={id}>
        {label} <span>(minutes)</span>
      </label>
      <input
        class名称={styles.input}
        max={120}
        min={1}
        required
        type="number"
        value={typeof value === 'number' ? value / 60 : ''}
        onChange={e => {
          onChange(e.target.value === '' ? '' : Number(e.target.value));
        }}
      />
    </div>
  );
}
