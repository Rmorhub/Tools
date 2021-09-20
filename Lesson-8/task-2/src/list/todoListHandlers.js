import { inputEvent, onTaskClick } from './tasksActions.js';

export const todoListHandlers = () => {
  const button = document.querySelector('.create-task-btn');
  button.addEventListener('click', inputEvent);

  const listElem = document.querySelector('.list');
  listElem.addEventListener('click', onTaskClick);

};