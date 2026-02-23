import { deletePistolaTorque, postPistolasTorque } from "@/api/client";
import CampaignList from "@/components/campains/campain-list";
import CampaignModal from "@/components/modals/campain-modal";
import RegisterHeadModal from "@/components/modals/head-modal";
import PistolaTorqueModal from "@/components/modals/torque-modal";

import { useActivities } from "@/hooks/use-activities";
import { useCampaigns } from "@/hooks/use-campains";
import { useEquipments } from "@/hooks/use-equipments";
import { useRegisterHeads } from "@/hooks/use-heads";
import { usePistolasTorque } from "@/hooks/use-pistolas-torque";
import { useProjects } from "@/hooks/use-projects";
import { useUbications } from "@/hooks/use-ubications";

import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default function CampaignScreen() {

  const { campaigns, loading, reload: reloadCampaigns } = useCampaigns();
  const { projects, reload: reloadProjects } = useProjects();
  const { activities, reload: reloadActivities } = useActivities();

  const { equipments } = useEquipments();
  const { ubications } = useUbications();

  const { pistolas, loading: loadingPistolas, reload: reloadPistolas } =
    usePistolasTorque();

  const [campaignModalVisible, setCampaignModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState<any>(null);

  const { heads, loading: loadingHeads } =
    useRegisterHeads(selectedProject?.id);

  // 🔥 Pistola modal
  const [pistolaModalVisible, setPistolaModalVisible] = useState(false);
  const [pistolaMode, setPistolaMode] = useState<
    "create" | "edit" | "view"
  >("create");
  const [selectedPistola, setSelectedPistola] = useState<any>(null);

  const projectsByCampaign = (campaignId) =>
    projects.filter((p) => p.parent === campaignId);

  const activitiesByProject = (projectId) =>
    activities.filter((a) => a.project === projectId);

  const getActivityName = (id) =>
    activities.find((a) => a.id === id)?.name ||
    activities.find((a) => a.id === id)?.nombre ||
    "Actividad";

  const formatDateForDjango = (date: any) => {
    if (!date) return null;
    return new Date(date).toISOString().split("T")[0];
  };

  const formatTimeForDjango = (date: any) => {
    if (!date) return null;
    return new Date(date)
      .toTimeString()
      .split(" ")[0]; // HH:mm:ss
  };

  const deletePistol = async (id: number) => {
    try {
      const response = await deletePistolaTorque(id)
      reloadPistolas()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Campañas</Text>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setCampaignModalVisible(true)}
        >
          <Text style={styles.addBtnText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Cargando campañas...</Text>
      ) : (
        <ScrollView>

          <CampaignList
            campaigns={campaigns}
            projectsByCampaign={projectsByCampaign}
            activitiesByProject={activitiesByProject}
            reloadProjects={reloadProjects}
            reloadActivities={reloadActivities}
            getActivityName={getActivityName}
            onSelectProject={setSelectedProject}
            selectedProject={selectedProject}
          />

          {/* REGISTROS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Registros</Text>

            {loadingHeads ? (
              <Text>Cargando...</Text>
            ) : (
              heads.map((head) => (
                <View key={head.id} style={styles.card}>
                  <Text>{head.name}</Text>
                </View>
              ))
            )}
          </View>

          {/* 🔥 PISTOLAS TORQUE */}
          <View style={styles.section}>

            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Pistolas Torque</Text>

              <TouchableOpacity
                style={styles.addRegistroBtn}
                onPress={() => {
                  setPistolaMode("create");
                  setSelectedPistola(null);
                  setPistolaModalVisible(true);
                }}
              >
                <Text style={styles.addRegistroText}>+ Agregar</Text>
              </TouchableOpacity>
            </View>

            {loadingPistolas ? (
              <Text>Cargando pistolas...</Text>
            ) : pistolas.length === 0 ? (
              <Text>No hay pistolas</Text>
            ) : (
              pistolas.map((p) => (
                <View style={[styles.card, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                  <TouchableOpacity
                    key={p.id}
                    style={{
                      flexDirection: 'column'
                    }}
                    onPress={() => {
                      setPistolaMode("view");
                      setSelectedPistola(p);
                      setPistolaModalVisible(true);
                    }}
                  >
                    <Text>{p.manufacturer} {p.model}</Text>
                    <Text>Serial: {p.serial_number}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deletePistol(p.id)}>
                    <AntDesign name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              ))
            )}

          </View>

        </ScrollView>
      )}

      {/* MODALS */}

      <CampaignModal
        visible={campaignModalVisible}
        onClose={() => setCampaignModalVisible(false)}
        onCreated={reloadCampaigns}
      />

      <RegisterHeadModal
        visible={registerModalVisible}
        onClose={() => setRegisterModalVisible(false)}
        proyecto={selectedProject}
      />

      <PistolaTorqueModal
        visible={pistolaModalVisible}
        onClose={() => setPistolaModalVisible(false)}
        mode={pistolaMode}
        data={selectedPistola}
        equipments={equipments}
        ubications={ubications}
        onSave={async (form) => {

          const payload = {
            ...form,
            equipo: form.equipo?.id,
            ubicacion: form.ubicacion?.id,
            calibration_date: formatDateForDjango(form.calibration_date),
            calibration_time: formatTimeForDjango(form.calibration_time),

          };

          try {
            const response = await postPistolasTorque(payload)
            console.log(response)
            setPistolaModalVisible(false);
          } catch (error) {
            console.log(error)
          } finally {
            reloadPistolas();
          }


        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 12 },
  header: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 20, fontWeight: "800" },
  addBtn: { backgroundColor: "#007AFF", padding: 8, borderRadius: 6 },
  addBtnText: { color: "#fff" },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "800" },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  card: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginTop: 8 },
  addRegistroBtn: { backgroundColor: "#ff9500", padding: 6, borderRadius: 6 },
  addRegistroText: { color: "#fff" }
});
