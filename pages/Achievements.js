import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { globalStyles } from "../commons/styles";

export default function Achievements({ todos, setTodos }) {
  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge" style={globalStyles.heading}>
        Achievements
      </Text>
      <Text style={styles.countText}>
        Total To-dos: {todos.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countText: {
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold'
  }
});
