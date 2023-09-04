import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { globalStyles } from "../commons/styles";
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
  Divider,
} from "react-native-paper";
import { Calendar } from "react-native-calendars";
import TaskItem from "../components/TaskItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "../commons/formatDate";

let id = 1;

export default function Homepage({
  todos,
  setTodos,
  selectedDate,
  setSelectedDate,
  saveTasksToStorage,
  loadTasksFromStorage,
}) {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [editInput, setEditInput] = useState({});
  const [dateVisible, setDateVisible] = React.useState(false);
  const [addTaskVisible, setAddTaskVisible] = React.useState(false);
  const [editTaskVisible, setEditTaskVisible] = React.useState(false);
  const [mode, setMode] = useState("date");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [addTaskStartDate, setAddTaskStartDate] = useState(new Date());
  const [addTaskEndDate, setAddTaskEndDate] = useState(new Date());

  const [editTaskStartDate, setEditTaskStartDate] = useState(new Date());
  const [editTaskEndDate, setEditTaskEndDate] = useState(new Date());

  // Add Task
  const onChangeAddTaskStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setAddTaskStartDate(selectedDate || addTaskStartDate);
  };

  const onChangeAddTaskEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setAddTaskEndDate(selectedDate || addTaskEndDate);
  };

  // Edit Task
  const onChangeEditTaskStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setEditTaskStartDate(selectedDate || editTaskStartDate);
  };

  const onChangeEditTaskEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setEditTaskEndDate(selectedDate || editTaskEndDate);
  };

  const showDialog = (type, id) => {
    switch (type) {
      case "addTask":
        setAddTaskVisible(!addTaskVisible);
        break;
      case "calendar":
        setDateVisible(!dateVisible);
        break;
      case "editTask":
        setEditTaskVisible(!editTaskVisible);
        const selectedTodo = todos.find((todo) => todo.id === id);
        if (selectedTodo) {
          setEditInput(selectedTodo);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const newTask = {
      id: id++,
      value: input,
      description: description,
      startDate: formatDate(addTaskStartDate),
      endDate: formatDate(addTaskEndDate),
      complete: false,
    };

    const updatedTasks = [...todos, newTask];

    // Save the updated tasks to AsyncStorage
    saveTasksToStorage(updatedTasks);

    setTodos(updatedTasks);

    setInput("");
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleEdit = () => {
    const editedTask = {
      ...editInput,
      startDate: formatDate(editTaskStartDate),
      endDate: formatDate(editTaskEndDate),
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === editInput.id ? editedTask : todo
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

  // To sort todos such that completed ones are automatically moved to the bottom
  const sortedTodos = todos
    .filter(
      (task) => task.startDate <= selectedDate && task.endDate >= selectedDate
    )
    .sort((a, b) => {
      if (a.complete === b.complete) {
        return 0;
      } else if (a.complete) {
        return 1;
      } else {
        return -1;
      }
    });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.heading}>Hey There!</Text>
      <View style={styles.dateContainer}>
        <Text style={{ paddingRight: 8 }}>Task Lists For:</Text>
        <Button
          onPress={() => showDialog("calendar")}
          style={styles.dateButton}
          mode="contained"
          compact
        >
          {selectedDate}
        </Button>
      </View>
      <FlatList
        data={sortedTodos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <TaskItem
              item={item}
              handleComplete={handleComplete}
              showDialog={showDialog}
              handleDelete={handleDelete}
            />
          </>
        )}
      />
      <Portal>
        {/* Add Task Dialog */}
        <Dialog
          visible={addTaskVisible}
          onDismiss={() => showDialog("addTask")}
        >
          <Dialog.Title>Add Task</Dialog.Title>
          <Dialog.Content style={styles.dialogContent}>
            <TextInput
              mode="outlined"
              style={styles.inputContainer}
              label="Task"
              placeholder="Add Task"
              value={input}
              onChangeText={(text) => setInput(text)}
            />
            <TextInput
              mode="outlined"
              style={styles.inputContainer}
              label="Description"
              placeholder="Description..."
              value={description}
              onChangeText={(text) => setDescription(text)}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text>Start Date</Text>
                <Button
                  mode="contained"
                  onPress={() => setShowStartDatePicker(true)}
                >
                  {formatDate(addTaskStartDate)}
                </Button>
              </View>

              <Text style={{ marginHorizontal: 8 }}>to</Text>

              <View style={{ alignItems: "center" }}>
                <Text>End Date</Text>
                <Button
                  mode="contained"
                  onPress={() => setShowEndDatePicker(true)}
                >
                  {formatDate(addTaskEndDate)}
                </Button>
              </View>
            </View>

            {showStartDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={addTaskStartDate}
                mode={mode}
                onChange={(event, selectedDate) =>
                  onChangeAddTaskStartDate(event, selectedDate)
                }
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={addTaskEndDate}
                mode={mode}
                onChange={(event, selectedDate) =>
                  onChangeAddTaskEndDate(event, selectedDate)
                }
              />
            )}
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
          <Dialog.Content style={styles.dialogContent}>
            <TextInput
              mode="outlined"
              label="Edit task"
              style={styles.inputContainer}
              value={editInput.value}
              onChangeText={(text) =>
                setEditInput({ ...editInput, value: text })
              }
            />
            <TextInput
              mode="outlined"
              label="Edit Description"
              style={styles.inputContainer}
              value={editInput.description}
              onChangeText={(text) =>
                setEditInput({ ...editInput, description: text })
              }
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text>Start Date</Text>
                <Button
                  mode="contained"
                  onPress={() => setShowStartDatePicker(true)}
                >
                  {formatDate(editTaskStartDate)}
                </Button>
              </View>

              <Text style={{ marginHorizontal: 8 }}>to</Text>

              <View style={{ alignItems: "center" }}>
                <Text>End Date</Text>
                <Button
                  mode="contained"
                  onPress={() => setShowEndDatePicker(true)}
                >
                  {formatDate(editTaskEndDate)}
                </Button>
              </View>
            </View>

            {showStartDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={editTaskStartDate}
                mode={mode}
                onChange={(event, selectedDate) =>
                  onChangeEditTaskStartDate(event, selectedDate)
                }
              />
            )}
            {showEndDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={editTaskEndDate}
                mode={mode}
                onChange={(event, selectedDate) =>
                  onChangeEditTaskEndDate(event, selectedDate)
                }
              />
            )}
          </Dialog.Content>
          <Dialog.Actions style={styles.buttonContainer}>
            <Button onPress={handleEdit}>Edit Task</Button>
          </Dialog.Actions>
        </Dialog>

        <Dialog visible={dateVisible} onDismiss={() => showDialog("calendar")}>
          <Dialog.Title>Calender</Dialog.Title>
          <Dialog.Content>
            <Calendar
              onDayPress={(day) => {
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: "orange",
                },
              }}
            />
          </Dialog.Content>
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
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  dateButton: {
    flex: 0,
    paddingHorizontal: 6,
  },
  divider: {
    marginVertical: 16,
  },
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
  todoItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    textDecorationLine: "line-through",
  },
  dialogContent: {
    flexDirection: "column",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  inputContainer: {
    marginBottom: 10,
  },
});
