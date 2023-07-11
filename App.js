import { StatusBar } from "expo-status-bar";
import { React, useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CheckBox } from "react-native-web";
let id = 0;
export default function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [showEdit, setShowEdit] = useState(true)
  const [editInput, setEditInput] = useState({})

  const handleSubmit = () => {
    setTodos([...todos, { id: id++, value: input, complete: false }]);
    setInput("");
  };

  const handleDelete = (index) => {
    console.log(index);
    setTodos(todos.filter((task) => task.id !== index));
  };

  const handleShowEdit = (index) => {
    console.log('show edit')
    setShowEdit(false)
    setEditInput(todos[index])
  };

  const handleEdit = () => {
    console.log('editing')

    const todosArr = todos
    const index = editInput.id
    console.log(todosArr[index].value)
    console.log(editInput.value)
    todosArr[index].value = editInput.value
    setTodos(todosArr);
    setShowEdit(true)
    setEditInput({})
  }

  const handleComplete = (id, complete) => {
    //Find the index of the object with matching id
    const indexOfTodo = todos.findIndex(todo => todo.id === id)
    //Declare a new variable that is suppose to store the updated array of TodoList
    const updatedTodos = [...todos]
    //Changed the checked status
    updatedTodos[indexOfTodo].complete = complete
    setTodos(updatedTodos)
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <div hidden = {showEdit}>
        <input
          type="text"
          placeholder="Edit task"
          value={editInput.value}
          onChange={(e) => setEditInput({id: editInput.id, value:e.target.value, complete: editInput.complete})}
        />
        <div>
          <button onClick={handleEdit}>edit</button>
        </div>
      </div>
      <ul>
        {todos.map(({ id, value, complete }) => {
            return (
              <p key={id}>
                {value}
                <input value={complete} type="checkbox" onChange={(e) => handleComplete(id, e.target.checked)} />
                <button onClick={() => handleShowEdit(id)}>Edit</button>
                <button onClick={() => handleDelete(id)}>Delete</button>
              </p>
            );
        })}
      </ul>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
