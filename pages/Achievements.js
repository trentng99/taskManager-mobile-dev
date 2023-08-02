import React, { useState } from "react";
import { StyleSheet, View, TextInput, FlatList } from "react-native";
import {
  Checkbox,
  FAB,
  Text,
  Portal,
  Dialog,
  Provider,
  PaperProvider,
  Button,
} from "react-native-paper";

let id = 0;

export default function Achievements({ todos, setTodos }) {

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.heading}>
        Achievements
      </Text>    
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
