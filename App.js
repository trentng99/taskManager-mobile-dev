import React, { useState } from "react";
import {
  StyleSheet,
  Text,
} from "react-native";
import { BottomNavigation, PaperProvider, useTheme, DefaultTheme } from "react-native-paper";
import Homepage from "./pages/Homepage";

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;

export default function App() {
  const [todos, setTodos] = useState([{ id: 0, value: 'test 1', complete: false }]);
  const [index, setIndex] = React.useState(0);
  const theme = {...DefaultTheme};

  const [routes] = React.useState([
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

  const HomeRoute = () => <Homepage todos={todos} setTodos={setTodos}></Homepage>;

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    achievements: AlbumsRoute,
    calendar: RecentsRoute,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
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
});
