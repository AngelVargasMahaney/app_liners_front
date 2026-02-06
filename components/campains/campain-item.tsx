import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import ProjectModal from "../modals/project-modal";
import ProjectList from "../projects/project-list";
import { campaignStyles as s } from "./campain-styles";

export default function CampaignItem({
  campaign,
  projects,
  activitiesByProject,
  reloadProjects,
  reloadActivities,
  onSelectProject,
  selectedProject,
}) {
  const [open, setOpen] = useState(false);
  const [projectModalVisible, setProjectModalVisible] = useState(false);

  return (
    <View style={s.card}>
      {/* HEADER CAMPAÑA */}
      <TouchableOpacity onPress={() => setOpen(!open)}>
        <Text style={s.title}>{campaign.name}</Text>
      </TouchableOpacity>

      {/* PROYECTOS */}
      {open && (
        <>
          <ProjectList
            projects={projects}
            activitiesByProject={activitiesByProject}
            reloadActivities={reloadActivities}
            onSelectProject={onSelectProject}
            selectedProject={selectedProject}
          />


          {/* BOTÓN AGREGAR PROYECTO */}
          <TouchableOpacity
            style={s.addButton}
            onPress={() => setProjectModalVisible(true)}
          >
            <Text style={s.addButtonText}>+ Agregar proyecto</Text>
          </TouchableOpacity>
        </>
      )}

      {/* MODAL PROYECTO */}
      <ProjectModal
        visible={projectModalVisible}
        onClose={() => setProjectModalVisible(false)}
        onCreated={reloadProjects}
        campaignId={campaign.id}
      />
    </View>
  );
}
