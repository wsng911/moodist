import { FaRegTrashAlt } from 'react-icons/fa/index';

import { Checkbox } from '@/components/checkbox';

import { useTodoStore } from '@/stores/todo';
import { cn } from '@/helpers/styles';

import styles from './todo.module.css';

interface TodoProps {
  done: boolean;
  id: string;
  todo: string;
}

export function Todo({ done, id, todo }: TodoProps) {
  const deleteTodo = useTodoStore(state => state.deleteTodo);
  const toggleTodo = useTodoStore(state => state.toggleTodo);
  const editTodo = useTodoStore(state => state.editTodo);

  const handleCheck = () => toggleTodo(id);
  const handle删除 = () => deleteTodo(id);

  return (
    <div class名称={styles.wrapper}>
      <div class名称={styles.checkbox}>
        <Checkbox checked={done} onChange={handleCheck} />
      </div>
      <input
        class名称={cn(styles.textbox, done && styles.done)}
        type="text"
        value={todo}
        onChange={e => editTodo(id, e.target.value)}
      />
      <button class名称={styles.delete} onClick={handle删除}>
        <FaRegTrashAlt />
      </button>
    </div>
  );
}
