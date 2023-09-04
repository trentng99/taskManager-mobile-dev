import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { globalStyles } from "../commons/styles";

let id = 0;

export default function Achievements({ todos, setTodos }) {
  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge" style={globalStyles.heading}>
        Achievements
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
