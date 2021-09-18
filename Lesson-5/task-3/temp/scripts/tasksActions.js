"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onTaskClick = exports.inputEvent = void 0;

var _storage = require("./storage.js");

var _renderer = require("./renderer.js");

var _tasksGateway = require("./tasksGateway.js");

var inputEvent = function inputEvent() {
  var input = document.querySelector('.task-input');
  var text = input.value;

  if (!text) {
    return;
  }

  input.value = '';
  var newTask = {
    text: text,
    done: false,
    createDate: new Date().toISOString()
  };
  (0, _tasksGateway.createTask)(newTask).then(function () {
    return (0, _tasksGateway.getTasksList)();
  }).then(function (newTasksList) {
    console.log(newTasksList);
    (0, _storage.setItem)('tasksList', newTasksList);
    (0, _renderer.renderTasks)();
  });
}; // 1. prepare data
// 2. write data to database
// 3. read new data from server
// 4. save new data to front-end storage
// 5. update UI based on new data


exports.inputEvent = inputEvent;

var onTaskClick = function onTaskClick(event) {
  var tasksList = (0, _storage.getItem)('tasksList');
  var isCheckbox = event.target.classList.contains('list-item__checkbox');
  var taskId = event.target.dataset.id;

  if (isCheckbox) {
    console.log(taskId);

    var _tasksList$find = tasksList.find(function (task) {
      return task.id === taskId;
    }),
        text = _tasksList$find.text,
        createDate = _tasksList$find.createDate;

    var done = event.target.checked;
    var updatedTask = {
      text: text,
      createDate: createDate,
      done: done,
      finishDate: done ? new Date().toISOString() : null
    };
    (0, _tasksGateway.updateTask)(taskId, updatedTask).then(function () {
      return (0, _tasksGateway.getTasksList)();
    }).then(function (newTasksList) {
      (0, _storage.setItem)('tasksList', newTasksList);
      (0, _renderer.renderTasks)();
    });
  }

  var isdeleteBtn = event.target.classList.contains('list-item__delete-btn');

  if (isdeleteBtn) {
    (0, _tasksGateway.deleteTask)(taskId).then(function () {
      return (0, _tasksGateway.getTasksList)();
    }).then(function (newTasksList) {
      (0, _storage.setItem)('tasksList', newTasksList);
      (0, _renderer.renderTasks)();
    });
  }
}; // 1. prepare data
// 2. update data in database
// 3. read new data from server
// 4. save new data to front-end storage
// 5. update UI based on new data


exports.onTaskClick = onTaskClick;