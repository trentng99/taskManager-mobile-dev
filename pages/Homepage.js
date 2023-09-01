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
  Divider,
} from "react-native-paper";
import { Calendar } from "react-native-calendars";
import TaskItem from "../components/TaskItem";
import DateTimePicker from "@react-native-community/datetimepicker";

let id = 1;

export default function Homepage({ todos, setTodos }) {
  const currentDate = new Date().toISOString().split("T")[0];

  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [editInput, setEditInput] = useState({});
  const [dateVisible, setDateVisible] = React.useState(false);
  const [addTaskVisible, setAddTaskVisible] = React.useState(false);
  const [editTaskVisible, setEditTaskVisible] = React.useState(false);
  const [mode, setMode] = useState("date");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);

  // Convert "YYYY-MM-DD" format to "MM/DD/YYYY" format
  const formattedDate = currentDate.split("-").reverse().join("/");

  const onChangeStartDate = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setStartDate(selectedDate || startDate); // Use current value if no date is selected
  };

  const onChangeEndDate = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setEndDate(selectedDate || endDate); // Use current value if no date is selected
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
      case "datePicker":
        setShow(true);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setTodos([
      ...todos,
      {
        id: id++,
        value: input,
        description: description,
        startDate: startDate,
        endDate: endDate,
        complete: false,
      },
    ]);
    setInput("");
    setAddTaskVisible(!addTaskVisible);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleEdit = () => {
    console.log(editInput.id);
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
      <Text style={styles.heading}>Hey There!</Text>
      <Text></Text>
      <View style={styles.dateContainer}>
        <Text>Task Lists For:</Text>
        <Button
          onPress={() => showDialog("calendar")}
          style={styles.dateButton}
          mode="contained"
          compact
        >
          {selectedDate}
        </Button>
      </View>
      {/* Uncompleted Task */}
      <FlatList
        data={todos.filter(
          (task) =>
            task.startDate <= selectedDate && task.endDate >= selectedDate
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          !item.complete && (
            <TaskItem
              item={item}
              handleComplete={handleComplete}
              showDialog={showDialog}
              handleDelete={handleDelete}
            />
          )
        }
      />

      {/* Completed Task */}
      <FlatList
        data={todos.filter(
          (task) =>
            task.startDate <= selectedDate && task.endDate >= selectedDate
        )}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) =>
          item.complete && (
            <TaskItem
              item={item}
              handleComplete={handleComplete}
              showDialog={showDialog}
              handleDelete={handleDelete}
            />
          )
        }
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
            <View style={styles.inputContainer}>
              <Text>Set Start Date</Text>
              <Button
                mode="contained"
                onPress={() => setShowStartDatePicker(true)}
              >
                {startDate.toLocaleString()}
              </Button>
              {showStartDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={startDate}
                  mode={mode}
                  onChange={onChangeStartDate}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text>Set End Date</Text>
              <Button
                mode="contained"
                onPress={() => setShowEndDatePicker(true)}
              >
                {endDate.toLocaleString()}
              </Button>
              {showEndDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={endDate}
                  mode={mode}
                  onChange={onChangeEndDate}
                />
              )}
            </View>
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
            <TextInput
              mode="outlined"
              label="Edit Description"
              value={editInput.description}
              onChangeText={(text) =>
                setEditInput({ ...editInput, description: text })
              }
            />
            <TextInput
              mode="outlined"
              label="Change Start Date"
              value={editInput.startDate}
              onChangeText={(text) =>
                setEditInput({ ...editInput, startDate: text })
              }
            />
            <TextInput
              mode="outlined"
              label="Change End Date"
              value={editInput.endDate}
              onChangeText={(text) =>
                setEditInput({ ...editInput, endDate: text })
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
    margin: 20,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dateButton: {
    flex: 0,
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
