import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Text, Card } from "react-native-paper";
import { globalStyles } from "../commons/styles";
import { Agenda } from "react-native-calendars";

let id = 0;

export default function Calendar({ todos, setTodos }) {
  const [filteredTasks, setFilteredTasks] = useState({});

  const filterTasksByDate = (selectedDate) => {
    return todos.filter((task) => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      const selectedDateObj = new Date(selectedDate);

      return taskStartDate <= selectedDateObj && taskEndDate >= selectedDateObj;
    });
  };

  const onDayPress = (day) => {
    const selectedDate = day.dateString;
    const filteredTasksForDate = filterTasksByDate(selectedDate);

    // Debugging: Log the selected date and filtered tasks
    console.log("Selected Date:", selectedDate);
    console.log("Filtered Tasks:", filteredTasksForDate);

    // Update the state with the filtered tasks using the selected date as the key
    setFilteredTasks({
      [selectedDate]: filteredTasksForDate,
    });
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.value}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge" style={globalStyles.heading}>
        Calendar
      </Text>
      <Agenda
        onDayPress={onDayPress}
        items={filteredTasks}
        renderItem={renderItem}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
});
