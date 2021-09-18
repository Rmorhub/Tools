"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.todoListHandlers = void 0;

var _tasksActions = require("./tasksActions.js");

var todoListHandlers = function todoListHandlers() {
  var button = document.querySelector('.create-task-btn');
  button.addEventListener('click', _tasksActions.inputEvent);
  var listElem = document.querySelector('.list');
  listElem.addEventListener('click', _tasksActions.onTaskClick);
};

exports.todoListHandlers = todoListHandlers;