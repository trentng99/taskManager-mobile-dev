import { StatusBar } from 'expo-status-bar';
import {React, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
  let id = 0
export default function App() {
  const [input, setInput] = useState('')
  const [todos, setTodos] = useState([])

  const handleSubmit = () => {
    setTodos([...todos, {id: id++, value: input}])
    setInput('')
  }

  const handleDelete = (index) => {
    console.log(index)
    setTodos(todos.filter(task => task.id !== index))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add your task" value={input} onChange={(e) => setInput(e.target.value)} />
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
      <ul>
        {todos.map(({id, value}) => {
          return (
            <p key={id}>{value} <button onClick={() => handleDelete(id)}>Delete</button></p>
          )
        })}
      </ul>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
