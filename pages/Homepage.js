import React, { useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import { Checkbox, FAB, Text, Portal, Dialog, Provider, PaperProvider, Button } from "react-native-paper";

let id = 0;

export default function Homepage({ todos, setTodos }) {
  const [input, setInput] = useState("");
  const [showEdit, setShowEdit] = useState(true);
  const [editInput, setEditInput] = useState({});
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const handleSubmit = () => {
    setTodos([...todos, { id: id++, value: input, complete: false }]);
    setInput("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleShowEdit = (id) => {
    const selectedTodo = todos.find((todo) => todo.id === id);
    setShowEdit(false);
    setEditInput(selectedTodo);
  };

  const handleEdit = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editInput.id ? editInput : todo
    );
    setTodos(updatedTodos);
    setShowEdit(true);
    setEditInput({});
  };

  const handleComplete = (id, complete) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, complete: complete } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.heading}>
        Hey There!
      </Text>
      <View style={{flexDirection: 'row',}}>
        <Text style={{flex: 1}}>Task Lists For:</Text>
        <Button onPress={showDialog} style={{flex: 1}}>Show Dialog</Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">This is simple dialog</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Add your task"
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
      {!showEdit && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Edit task"
            value={editInput.value}
            onChangeText={(text) => setEditInput({ ...editInput, value: text })}
          />
          <View style={styles.buttonContainer}>
            <Button title="Edit" onPress={handleEdit} />
          </View>
        </View>
      )}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Checkbox
              style={styles.checkbox}
              value={item.complete}
              onValueChange={(value) => handleComplete(item.id, value)}
            />
            <Text style={item.complete ? styles.completedText : {}}>
              {item.value}
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleShowEdit(item.id)} />
              <Button title="Delete" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    marginTop: 8,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    marginRight: 8,
    width: 20,
    height: 20,
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
