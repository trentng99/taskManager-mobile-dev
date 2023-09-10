import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, StatusBar } from "react-native";
import { Text, Card } from "react-native-paper";
import { globalStyles } from "../commons/styles";
import { Agenda } from "react-native-calendars";
import { formatDate } from "../commons/formatDate";
import { CalenderItem } from "../components/CalendarItem";

export default function Calendar({ todos, setTodos }) {
  const [filteredTasks, setFilteredTasks] = useState({});
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

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

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge" style={globalStyles.heading}>
        Calendarss
      </Text>
      <Agenda
        onDayPress={onDayPress}
        items={filteredTasks}
        selected={selectedDate}
        renderItem={CalenderItem}
        refreshControl={null}
        showClosingKnob={true}
        refreshing={false}
      />
      <StatusBar />
    </View>
  );
}
