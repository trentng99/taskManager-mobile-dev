import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Checkbox,
  TextInput,
  FAB,
  Text,
  Portal,
  Dialog,
  Provider,
  PaperProvider,
  Button,
  List,
} from "react-native-paper";
import { Calendar } from "react-native-calendars";

let id = 1;

export default function Homepage({ todos, setTodos }) {
  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState({});
  const [dateVisible, setDateVisible] = React.useState(false);
  const [addTaskVisible, setAddTaskVisible] = React.useState(false);
  const [editTaskVisible, setEditTaskVisible] = React.useState(false);

  const showDialog = (type, id) => {
    if (type === "addTask") {
      setAddTaskVisible(!addTaskVisible);
    } else if (type === "calendar") {
      setDateVisible(!dateVisible);
    } else if (type === "editTask") {
      setEditTaskVisible(!editTaskVisible);
      const selectedTodo = todos.find((todo) => todo.id === id);
      if (selectedTodo) {
        setEditInput(selectedTodo);
      }
    }
  };

  const handleSubmit = () => {
    setTodos([...todos, { id: id++, value: input, complete: false }]);
    setInput("");
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editInput.id ? editInput : todo
    );
    setTodos(updatedTodos);
    setEditInput({});
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.heading}>
        Hey There!
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: "16px",
          marginVertical: "10px",
        }}
      >
        <Text>Task Lists For:</Text>
        <Button
          onPress={() => showDialog("calendar")}
          style={{ flex: 0 }}
          mode="contained"
          compact
        >
          {new Date().toDateString()}
        </Button>
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                style={styles.checkbox}
                status={item.complete ? "checked" : "unchecked"}
                onPress={(value) => handleComplete(item.id)}
              />
              <Text style={item.complete ? styles.completedText : {}}>
                {item.value}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                mode="text"
                onPress={() => showDialog("editTask", item.id)}
                icon="pencil"
              ></Button>
              <Button
                mode="text"
                onPress={() => handleDelete(item.id)}
                icon="trash-can-outline"
              ></Button>
            </View>
          </View>
        )}
      />
      <Portal>
        <Dialog
          visible={addTaskVisible}
          onDismiss={() => showDialog("addTask")}
        >
          <Dialog.Title>Add Task</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Add your task"
              value={input}
              onChangeText={(text) => setInput(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSubmit} type="submit">
              Add Task
            </Button>
          </Dialog.Actions>
          <View></View>
        </Dialog>
        <Dialog
          visible={editTaskVisible}
          onDismiss={() => showDialog("editTask")}
        >
          <Dialog.Title>Edit Task</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Edit task"
              value={editInput.value}
              onChangeText={(text) =>
                setEditInput({ ...editInput, value: text })
              }
            />
          </Dialog.Content>
          <Dialog.Actions style={styles.buttonContainer}>
            <Button onPress={handleEdit}>Edit Task</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={dateVisible} onDismiss={() => showDialog("calendar")}>
          <Dialog.Title>Calender</Dialog.Title>
          <Dialog.Content>
            <Calendar></Calendar>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => showDialog("calendar")}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => showDialog("addTask")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "10px",
  },
  heading: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkbox: {
    borderRadius: "100",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "12px",
    marginBottom: 8,
    height: "60px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    borderRadius: 10,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
