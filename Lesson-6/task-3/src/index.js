import { todoListHandlers } from './list/todoListHandlers.js';
import { renderTasks } from './list/renderer.js';
import { getTasksList } from './list/tasksGateway.js';
import { setItem } from './list/storage.js';
import './index.scss'

document.addEventListener('DOMContentLoaded', () => {
  getTasksList().then(tasksList => {
    console.log(tasksList);
    setItem('tasksList', tasksList );
    renderTasks();
  })
  todoListHandlers();
});

const onStorageChange = event => {
  if (event.key === 'tasksList') {
    renderTasks();
  }
};

window.addEventListener('storage', onStorageChange);

// 1. get data from server
// 2. save data to front-end storage