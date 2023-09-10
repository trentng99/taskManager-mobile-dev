import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";

export const CalenderItem = (item) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Card>
        <Card.Content>
          <View>
            <Text
              style={[
                styles.title,
                item.complete ? styles.completedTask : null,
              ]}
            >
              {item.value}
            </Text>
            {!item.complete && (
              <Text>{`${item.startDate} - ${item.endDate}`}</Text>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  title: {
    fontWeight: "bold",
  },
  completedTask: {
    color: "#888",
    textDecorationLine: "line-through",
  },
});
