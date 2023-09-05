import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Text, Card } from "react-native-paper";
import { globalStyles } from "../commons/styles";
import { Agenda } from "react-native-calendars";
import { formatDate } from "../commons/formatDate";

export default function Calendar({ todos, setTodos }) {
  const [filteredTasks, setFilteredTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())); // Default to the current date

  const filterTasksByDate = (selectedDate) => {
    return todos.filter((task) => {
      const taskStartDate = new Date(task.startDate);
      const taskEndDate = new Date(task.endDate);
      const selectedDateObj = new Date(selectedDate);

      return taskStartDate <= selectedDateObj && taskEndDate >= selectedDateObj;
    });
  };

  const loadItemsForTheMonth = (month) => {
    const startDate = new Date(month.dateString);
    startDate.setDate(1); // Set the start date to the 1st day of the mth
    const endDate = new Date(month.dateString);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Set the end date to the last day of the mth

    const items = {};

    // Loop through each day in the month and get the tasks for that day
    while (startDate <= endDate) {
      const dateString = formatDate(startDate.toDateString());
      const filteredTasksForDate = filterTasksByDate(dateString);

      // Adding the filteredTasks to the items object using the date as the key
      items[dateString] = filteredTasksForDate;

      startDate.setDate(startDate.getDate() + 1); // Move to the next day
    }

    setFilteredTasks(items);
  };

  useEffect(() => {
    // Load items for the current month when the page first renders
    loadItemsForTheMonth({ dateString: selectedDate });
  }, []);

  const onDayPress = (day) => {
    const selectedDate = day.dateString;
    setSelectedDate(selectedDate);
    loadItemsForTheMonth(day);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Card>
          <Card.Content>
            <View>
              <Text>{item.value}</Text>
              <Text>{item.endDate}</Text>
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
        selected={selectedDate}
        renderItem={renderItem}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
      />
      <StatusBar />
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
