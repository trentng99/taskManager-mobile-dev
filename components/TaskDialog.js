import React from "react";
import { Text, Button, Dialog, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { formatDate } from "../commons/formatDate";
import { StyleSheet } from "react-native";

const TaskDialog = ({ item, visible, onClose }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title style={styles.dialogTitle}>{item.value}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.dialogText}>
            <Icon name="description" size={16} color="#007AFF" /> Description:{" "}
            {item.description}
          </Text>
          <Text style={styles.dialogText}>
            <Icon name="event" size={16} color="#007AFF" /> Start Date:{" "}
            {formatDate(item.startDate)}
          </Text>
          <Text style={styles.dialogText}>
            <Icon name="event" size={16} color="#007AFF" /> End Date:{" "}
            {formatDate(item.endDate)}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose} style={styles.dialogButton}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialogTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dialogText: {
    fontSize: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  dialogButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});

export default TaskDialog;
