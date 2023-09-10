import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { globalStyles } from "../commons/styles";
import { TabView, SceneMap } from "react-native-tab-view";
import CustomTabBar from "../components/CustomTabBar";
import Achievement from "../components/Achievement";

export default function Achievements({ todos }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Earned" },
    { key: "second", title: "Not Earned" },
  ]);

  const milestoneAchievements = [
    {
      milestone: 5,
      title: "High Five!",
      description: "5 tasks completed",
      icon: "folder",
    },
    {
      milestone: 10,
      title: "Perfect 10",
      description: "10 tasks completed",
      icon: "folder",
    },
    {
      milestone: 20,
      title: "Milestone Master",
      description: "20 tasks completed",
      icon: "folder",
    },
    {
      milestone: 30,
      title: "Triumphant 30",
      description: "30 tasks completed",
      icon: "folder",
    },
    {
      milestone: 40,
      title: "40 and Fabulous",
      description: "40 tasks completed",
      icon: "folder",
    },
    {
      milestone: 50,
      title: "Golden 50",
      description: "50 tasks completed!",
      icon: "folder",
    },
  ];

  useEffect(() => {
    setCompletedTaskCount(todos.filter((todo) => todo.complete).length);
  }, [todos]);

  // Calculate earned achievements based on completed tasks
  const earnedAchievements = useMemo(() => {
    return milestoneAchievements.filter(
      (achievement) => completedTaskCount >= achievement.milestone
    );
  }, [todos, milestoneAchievements]);

  const renderScene = SceneMap({
    first: () => (
      <View style={{ flexDirection: "row" }}>
        {earnedAchievements.map((achievement) => (
          <Achievement
            key={achievement.milestone}
            title={achievement.title}
            milestone={achievement.milestone}
            completedTasks={completedTaskCount}
            icon={achievement.icon}
            description={achievement.description}
          />
        ))}
      </View>
    ),
    second: () => (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {milestoneAchievements
          .filter((achievement) => !earnedAchievements.includes(achievement))
          .map((achievement) => (
            <Achievement
              key={achievement.milestone}
              title={achievement.title}
              milestone={achievement.milestone}
              completedTasks={completedTaskCount}
              icon={achievement.icon}
              description={achievement.description}
            />
          ))}
      </View>
    ),
  });

  return (
    <View style={globalStyles.container}>
      <Text variant="headlineLarge" style={globalStyles.heading}>
        Achievements
      </Text>
      <Card style={styles.completedTask}>
        <View style={styles.cardContent}>
          <Avatar.Icon icon="check" size={24} />
          <Text style={styles.cardTitle}>Completed Tasks</Text>
          <Text style={styles.countText}>{completedTaskCount}</Text>
        </View>
      </Card>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        style={{ marginVertical: 20 }}
        renderTabBar={(props) => <CustomTabBar {...props} color="#673ab7" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  completedTask: {
    marginTop: 20,
  },
  cardContent: {
    flexDirection: "row",
    padding: 16,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 16,
  },
  countText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
