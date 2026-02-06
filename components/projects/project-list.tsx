import React from "react";
import { View } from "react-native";
import ProjectItem from "./project-item";
import { projectStyles as s } from "./project-styles";

export default function ProjectList({
  projects,
  activitiesByProject,
  reloadActivities,
  onSelectProject,
  selectedProject,
}) {
  return (
    <View style={s.container}>
      {projects.map((p) => (
        <ProjectItem
          key={p.id}
          project={p}
          activities={activitiesByProject(p.id)}
          reloadActivities={reloadActivities}
          onSelectProject={onSelectProject}
          selectedProject={selectedProject}
        />
      ))}
    </View>
  );
}
