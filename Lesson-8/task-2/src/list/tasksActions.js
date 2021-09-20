import { getItem, setItem } from './storage.js';
import { renderTasks } from './renderer.js';
import { createTask, getTasksList, updateTask, deleteTask } from './tasksGateway.js';

export const inputEvent = () => {
  const input = document.querySelector('.task-input');
  const text = input.value;
  if (!text) {
    return;
  }
  input.value = '';

  const newTask = {
    text,
    done: false,
    createDate: new Date().toISOString(),
  };
  createTask(newTask)
    .then(() => getTasksList())
    .then(newTasksList => {
      console.log(newTasksList);
      setItem('tasksList', newTasksList);
      renderTasks();
    });
};
// 1. prepare data
// 2. write data to database
// 3. read new data from server
// 4. save new data to front-end storage
// 5. update UI based on new data

export const onTaskClick = event => {
  const tasksList = getItem('tasksList');
  const isCheckbox = event.target.classList.contains('list-item__checkbox');
  const taskId = event.target.dataset.id;
  if (isCheckbox) {
    console.log(taskId);
    const { text, createDate } = tasksList.find(task => task.id === taskId);
    const done = event.target.checked;
    const updatedTask = {
      text,
      createDate,
      done,
      finishDate: done ? new Date().toISOString() : null,
    };
    updateTask(taskId, updatedTask)
      .then(() => getTasksList())
      .then(newTasksList => {
        setItem('tasksList', newTasksList);
        renderTasks();
      });
  }

  const isdeleteBtn = event.target.classList.contains('list-item__delete-btn');
  
  if (isdeleteBtn) {
    deleteTask(taskId)
      .then(() => getTasksList())
      .then(newTasksList => {
        setItem('tasksList', newTasksList);
        renderTasks();
      });
  }
};

// 1. prepare data
// 2. update data in database
// 3. read new data from server
// 4. save new data to front-end storage
// 5. update UI based on new data
