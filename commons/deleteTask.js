import React from "react";

function deleteTask(id, todos, setTodos) {
  setTodos(todos.filter((task) => task.id !== id));
}

export default deleteTask;
