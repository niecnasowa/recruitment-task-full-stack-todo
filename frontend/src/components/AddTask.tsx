import { useState } from 'react';
import styles from './AddTask.module.scss';

type AddTaskProps = {
  onAdd: (content: string) => void;
};

export const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(inputValue);
    setInputValue('');
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChangeInput}
        placeholder="Task name..."
        className={styles.input}
      />
      <button type="submit">Add</button>
    </form>
  );
};
