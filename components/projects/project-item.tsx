import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ActivityList from "../activities/activity-list";
import ActivityModal from "../modals/activity-modal";
import { projectStyles as s } from "./project-styles";

export default function ProjectItem({
  project,
  activities,
  reloadActivities,
  onSelectProject,
  selectedProject,
}) {
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const isSelected = selectedProject?.id === project.id;

  return (
    <View style={[s.card, isSelected && s.selected]}>
      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
          onSelectProject(project); // 👈 selecciona proyecto
        }}
      >
        <Text style={s.title}>
          📌 {project.name} {isSelected && "✅"}
        </Text>
      </TouchableOpacity>

      {open && (
        <>
          <ActivityList activities={activities} />

          <TouchableOpacity
            style={s.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={s.addButtonText}>+ Agregar actividad</Text>
          </TouchableOpacity>
        </>
      )}

      <ActivityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCreated={reloadActivities}
        projectId={project.id}
      />
    </View>
  );
}
