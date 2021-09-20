import { getItem } from './storage.js';

const listElem = document.querySelector('.list');

const compareTasks = (a, b) => {
  if (a.done - b.done !== 0) {
    return a.done - b.done;
  }
  if (a.done) {
    return new Date(b.finishDate) - new Date(a.finishDate);
  }
  return new Date(b.createData) - new Date(a.createData);
};

const createCheckbox = ({ done, id }) => {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.dataset.id = id;
  checkbox.checked = done;
  checkbox.classList.add('list-item__checkbox');

  return checkbox;
};

const createListItem = ({ text, done, id }) => {
  const listItemElem = document.createElement('li');
  listItemElem.classList.add('list-item', 'list__item');
  const checkbox = createCheckbox({ done, id });
  if (done) {
    listItemElem.classList.add('list-item_done');
  }

  const textElem = document.createElement('span');
  textElem.classList.add('list-item__text');
  textElem.textContent = text;

  const deleteBtnElem = document.createElement('button');
  deleteBtnElem.classList.add('list-item__delete-btn');
  deleteBtnElem.dataset.id = id;
  listItemElem.append(checkbox, textElem, deleteBtnElem);

  return listItemElem;
};

export const renderTasks = () => {
  const tasksList = getItem('tasksList') || [];
  
  listElem.innerHTML = '';
  const tasksElems = tasksList.sort(compareTasks).map(createListItem);

  listElem.append(...tasksElems);
};
