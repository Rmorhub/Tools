import { todoListHandlers } from './todoListHandlers.js';
import { renderTasks } from './renderer.js';
import { getTasksList } from './tasksGateway.js';
import { setItem } from './storage.js';

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