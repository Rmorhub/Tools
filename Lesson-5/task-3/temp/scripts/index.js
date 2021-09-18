"use strict";

var _todoListHandlers = require("./todoListHandlers.js");

var _renderer = require("./renderer.js");

var _tasksGateway = require("./tasksGateway.js");

var _storage = require("./storage.js");

document.addEventListener('DOMContentLoaded', function () {
  (0, _tasksGateway.getTasksList)().then(function (tasksList) {
    console.log(tasksList);
    (0, _storage.setItem)('tasksList', tasksList);
    (0, _renderer.renderTasks)();
  });
  (0, _todoListHandlers.todoListHandlers)();
});

var onStorageChange = function onStorageChange(event) {
  if (event.key === 'tasksList') {
    (0, _renderer.renderTasks)();
  }
};

window.addEventListener('storage', onStorageChange); // 1. get data from server
// 2. save data to front-end storage