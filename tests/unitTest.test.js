import addTasks from "../commons/addTasks";
import deleteTask from "../commons/deleteTask";
// Mock the setTodos function
const mockSetTodos = jest.fn();

describe("addTasks Function", () => {
  it("should add a new task to the list of todos", () => {
    //  Set up initial data
    const id = 1;
    const input = "Sample Task";
    const description = "Sample Description";
    const addTaskStartDate = "2023-09-18";
    const addTaskEndDate = "2023-09-19";
    const complete = false;
    const todos = [];
    const expectedNewTask = {
      id: id,
      value: input,
      description: description,
      startDate: addTaskStartDate,
      endDate: addTaskEndDate,
      complete: complete,
    };

    // Call the addTasks function
    addTasks(
      id,
      input,
      description,
      addTaskStartDate,
      addTaskEndDate,
      complete,
      todos,
      mockSetTodos
    );

    // Check if setTodos was called with the expected new task
    expect(mockSetTodos).toHaveBeenCalledWith([expectedNewTask]);
  });
});

describe("deleteTask Function", () => {
  it("should remove a task from the list of todos", () => {
    // et up initial data
    const idToRemove = 1; // Specify the ID of the task to be removed
    const initialTodos = [
      {
        id: 1,
        value: "Sample Task 1",
        description: "Description 1",
        startDate: "2023-09-18",
        endDate: "2023-09-19",
        complete: false,
      },
      {
        id: 2,
        value: "Sample Task 2",
        description: "Description 2",
        startDate: "2023-09-20",
        endDate: "2023-09-21",
        complete: false,
      },
    ];

    // Call the deleteTask function
    deleteTask(idToRemove, initialTodos, mockSetTodos);

    // Check if setTodos was called with the updated todos (task removed)
    const expectedTodos = initialTodos.filter((task) => task.id !== idToRemove);
    expect(mockSetTodos).toHaveBeenCalledWith(expectedTodos);
  });
});
