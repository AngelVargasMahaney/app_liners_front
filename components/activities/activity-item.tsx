import React from "react";
import { Text, View } from "react-native";
import { activityStyles as s } from "./activity-styles";

export default function ActivityItem({ activity }) {
  return (
    <View style={s.item}>
      <Text style={s.text}>• {activity.name || activity.nombre}</Text>
    </View>
  );
}
