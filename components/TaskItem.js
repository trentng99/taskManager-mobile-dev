import React from "react";
import { View, StyleSheet } from "react-native";
import { Checkbox, Text, Button } from "react-native-paper";

const TaskItem = ({ item, handleComplete, handleDelete, showDialog }) => (
  <View style={styles.todoItem}>
    <View style={styles.todoItemContent}>
      <Checkbox
        style={styles.checkbox}
        status={item.complete ? "checked" : "unchecked"}
        onPress={() => handleComplete(item.id)}
      />
      <View>
        <Text style={item.complete ? styles.completedText : {}}>
          {item.value}
        </Text>
        {!item.complete && (
          <>
            <Text style={styles.dueDate}>{item.endDate}</Text>
          </>
        )}
      </View>
    </View>
    <View style={styles.buttonContainer}>
      {!item.complete && (
        <>
          <Button
            mode="text"
            onPress={() => showDialog("editTask", item.id)}
            icon="pencil"
          />
          <Button
            mode="text"
            onPress={() => handleDelete(item.id)}
            icon="trash-can-outline"
          />
        </>
      )}
    </View>
  </View>
);

export default TaskItem;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 8,
    height: 60,
    elevation: 2,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  dueDate: {
    fontSize: 10,
    color: '#b1b1b1'
  },
  todoItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
