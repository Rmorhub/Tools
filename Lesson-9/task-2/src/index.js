import { todoListHandlers } from './list/todoListHandlers';
import { renderTasks } from './list/renderer';
import { getTasksList } from './list/tasksGateway';
import { setItem } from './list/storage';
import './index.scss';

document.addEventListener('DOMContentLoaded', () => {
  getTasksList().then((tasksList) => {
    setItem('tasksList', tasksList);
    renderTasks();
  });
  todoListHandlers();
});

const onStorageChange = (event) => {
  if (event.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);

// 1. get data from server
// 2. save data to front-end storage
