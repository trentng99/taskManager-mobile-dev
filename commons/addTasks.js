import React from "react";

function addTasks(
  id,
  input,
  description,
  addTaskStartDate,
  addTaskEndDate,
  complete,
  todos,
  setTodos
) {
  const newTask = {
    id: id++,
    value: input,
    description: description,
    startDate: addTaskStartDate,
    endDate: addTaskEndDate,
    complete: complete,
  };

  const updatedTasks = [...todos, newTask];

  setTodos(updatedTasks);
}

export default addTasks;
