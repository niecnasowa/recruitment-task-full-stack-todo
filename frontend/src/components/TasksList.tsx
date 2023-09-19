import { useEffect, useState } from 'react';
import axios from 'axios';
import { TaskItem } from './TaskItem';
import { AddTask } from './AddTask';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

type Task = {
  id: number;
  content: string;
  done: boolean;
};

export const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleFetchTasks = () => {
    axios
      .get(`${BACKEND_URL}/tasks`)
      .then((response) => setTasks(response.data))
      .catch(() =>
        alert(
          `Can't synchronize task list with server, please check your connection.`
        )
      );
  };

  // Load tasks on load
  useEffect(() => {
    handleFetchTasks();
  }, []);

  const handleAddTask = (content: string) => {
    if (content.length === 0) {
      alert('Please add task name.');
      return;
    }

    if (content.length >= 10) {
      alert('Maximum length of task name is 10 chars.');
      return;
    }

    axios
      .post(`${BACKEND_URL}/tasks`, { content })
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch(() => alert(`Can't add task, please check your connection.`))
      .finally(() => handleFetchTasks());
  };

  const handleDeleteTask = (id: number) => {
    axios
      .delete(`${BACKEND_URL}/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch(() => alert(`Can't delete task, please check your connection.`))
      .finally(() => handleFetchTasks());
  };

  const handleToggleTaskDone = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      axios
        .patch(`${BACKEND_URL}/tasks/${id}`, { done: !task.done })
        .then(() => {
          const updatedTasks = tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          );
          setTasks(updatedTasks);
        });
    }
  };

  return (
    <div>
      <AddTask onAdd={handleAddTask} />
      {tasks.map((task) => (
        <TaskItem
          {...task}
          key={task.id}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTaskDone}
        />
      ))}
    </div>
  );
};
