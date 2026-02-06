import React from "react";
import { Text, View } from "react-native";
import ActivityItem from "./activity-item";
import { activityStyles as s } from "./activity-styles";

export default function ActivityList({ activities }) {
  if (!activities.length) {
    return <Text style={{ fontSize: 12, color: "#999" }}>No hay actividades</Text>;
  }

  return (
    <View style={s.container}>
      {activities.map((a) => (
        <ActivityItem key={a.id} activity={a} />
      ))}
    </View>
  );
}
