import styles from './TaskItem.module.scss';

type TaskItemProps = {
  id: number;
  content: string;
  done: boolean;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({
  id,
  content,
  done,
  onDelete,
  onToggle,
}) => {
  return (
    <div className={styles.item}>
      <input type="checkbox" checked={done} onChange={() => onToggle(id)} />
      <span className={done ? styles.done : undefined}>{content}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
