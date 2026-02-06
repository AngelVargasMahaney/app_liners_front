import { FlatList } from "react-native";
import CampaignItem from "./campain-item";

export default function CampaignList({
  campaigns,
  projectsByCampaign,
  activitiesByProject,
  reloadProjects,
  reloadActivities,
  getActivityName,
  onSelectProject,      // ✅ RECIBE
  selectedProject,      // ✅ RECIBE
}) {
  return (
    <FlatList
      data={campaigns}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CampaignItem
          campaign={item}
          projects={projectsByCampaign(item.id)}
          activitiesByProject={activitiesByProject}
          reloadProjects={reloadProjects}
          reloadActivities={reloadActivities}
          getActivityName={getActivityName}
          onSelectProject={onSelectProject}   // ✅ PASA
          selectedProject={selectedProject}   // ✅ PASA
        />
      )}
    />
  );
}
