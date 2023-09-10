import { View, Text, StyleSheet } from "react-native";
import { TabBar } from "react-native-tab-view";

const CustomTabBar = ({ color, ...props }) => {
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: color }}
      style={{ backgroundColor: "transparent" }}
      renderLabel={({ route, focused }) => (
        <Text
          style={{
            color: color,
            fontWeight: "bold",
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );
};

export default CustomTabBar; // Don't forget to export the component
