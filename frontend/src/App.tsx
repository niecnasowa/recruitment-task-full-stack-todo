import { TasksList } from './components/TasksList';
import styles from './App.module.scss';

export const App = () => (
  <div className={styles.container}>
    <h1>To-Do List</h1>
    <TasksList />
  </div>
);
