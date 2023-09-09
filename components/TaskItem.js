import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Checkbox, Text, Button, Dialog, Portal } from "react-native-paper";
import { formatDate } from "../commons/formatDate";
import Icon from "react-native-vector-icons/MaterialIcons";
import TaskDialog from './TaskDialog';


const TaskItem = ({ item, handleComplete, handleDelete, showDialog }) => {
  const [visible, setVisible] = useState(false);

  const showTaskDetails = () => {
    setVisible(true);
  };

  const hideTaskDetails = () => {
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.todoItem} onPress={showTaskDetails}>
        <View style={styles.todoItemContent}>
          <Checkbox
            style={styles.circularCheckbox}
            status={item.complete ? "checked" : "unchecked"}
            onPress={() => handleComplete(item.id)}
          />
          <View>
            <Text style={item.complete ? styles.completedText : styles.title}>
              {item.value}
            </Text>
            {!item.complete && (
              <>
                <Text style={styles.dueDate}>
                  Due Date: {formatDate(item.endDate)}
                </Text>
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
      </TouchableOpacity>
      <TaskDialog item={item} visible={visible} onClose={hideTaskDetails} />
    </>
  );
};

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
    color: "#b1b1b1",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  todoItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  dialogButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  circularCheckbox: {
    marginRight: 4,
  },
});
