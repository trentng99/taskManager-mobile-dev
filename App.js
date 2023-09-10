import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  BottomNavigation,
  PaperProvider,
  useTheme,
  DefaultTheme,
} from "react-native-paper";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Achievements from "./pages/Achievements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const theme = { ...DefaultTheme };

  const [todos, setTodos] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const loadTasksFromStorage = async () => {
      try {
        const jsonTasks = await AsyncStorage.getItem("tasks");
        setTodos(
          jsonTasks.length > 0 && Array.isArray(jsonTasks) // Check if returned value is an array and not empty
            ? JSON.parse(jsonTasks) // If true, populate todos with jsonTasks
            : [
                // else populate with test data
                {
                  id: 0,
                  value: "test 1",
                  complete: false,
                  description: "some description",
                  startDate: new Date().toISOString().split("T")[0],
                  endDate: new Date().toISOString().split("T")[0],
                },
              ]
        );
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasksFromStorage();
  }, []);

  const saveTasksToStorage = async (tasks) => {
    try {
      const jsonTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks", jsonTasks);
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    saveTasksToStorage(todos);
  }, [todos]);

  const [routes] = useState([
    {
      key: "home",
      title: "",
      focusedIcon: "home-variant",
      unfocusedIcon: "home-variant-outline",
    },
    {
      key: "achievements",
      title: "",
      focusedIcon: "medal",
      unfocusedIcon: "medal-outline",
    },
    {
      key: "calendar",
      title: "",
      focusedIcon: "application",
      unfocusedIcon: "application-outline",
    },
  ]);

  const HomeRoute = () => (
    <Homepage
      todos={todos}
      setTodos={setTodos}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      saveTasksToStorage={saveTasksToStorage}
    ></Homepage>
  );
  const CalendarRoute = () => (
    <Calendar todos={todos} setTodos={setTodos}></Calendar>
  );
  const AchievementsRoute = () => (
    <Achievements todos={todos} setTodos={setTodos}></Achievements>
  );

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    achievements: AchievementsRoute,
    calendar: CalendarRoute,
  });

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({});
