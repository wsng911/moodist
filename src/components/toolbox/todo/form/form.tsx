import { useState } from 'react';

import { useTodoStore } from '@/stores/todo';

import styles from './form.module.css';

export function Form() {
  const [value, setValue] = useState('');

  const addTodo = useTodoStore(state => state.addTodo);

  const handle提交 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim().length) return;

    addTodo(value);
    setValue('');
  };

  return (
    <form on提交={handle提交}>
      <div class名称={styles.wrapper}>
        <input
          placeholder="I have to ..."
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">添加</button>
      </div>
    </form>
  );
}
