// import {
//     createActivity,
//     createProject,
//     createRegisterDetail,
//     createRegisterHead,
//     createRegistro,
//     getActivities,
//     getCampaigns,
//     getJobs,
//     getProjects,
//     getRegisterDetails,
//     getRegisterHeads,
//     getRegistros,
//     getUbications,
// } from "@/api/client";
// import { Ionicons } from "@expo/vector-icons";
// import { Picker } from "@react-native-picker/picker";
// import React, { useEffect, useState } from "react";
// import {
//     ActivityIndicator,
//     Alert,
//     FlatList,
//     Modal,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from "react-native";

// // ENUM equipos (backend)
// const TEAMS = [
//     { id: 1, name: "Molino SAG" },
//     { id: 2, name: "Molino de Bolas N°1" },
//     { id: 3, name: "Molino de Bolas N°2" },
// ];

// export default function CampaignProjectRegisterScreen() {
//     const [ubications, setUbications] = useState([]);
//     const [jobs, setJobs] = useState([]);
//     // =========================
//     // DATA
//     // =========================
//     const [campaigns, setCampaigns] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [activities, setActivities] = useState([]);
//     const [registros, setRegistros] = useState([]);
//     const [heads, setHeads] = useState([]);
//     const [details, setDetails] = useState([]);

//     // =========================
//     // UI STATE
//     // =========================
//     const [expandedCampaign, setExpandedCampaign] = useState(null);
//     const [expandedProject, setExpandedProject] = useState(null);
//     const [selectedProjectId, setSelectedProjectId] = useState(null);
//     const [selectedCampaignId, setSelectedCampaignId] = useState(null);
//     const [selectedRegistroId, setSelectedRegistroId] = useState(null);
//     const [selectedHeadId, setSelectedHeadId] = useState(null);

//     const [loading, setLoading] = useState(true);

//     // =========================
//     // MODALS
//     // =========================
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalMode, setModalMode] = useState(null);
//     // "project" | "activity" | "registro"

//     const [headModalVisible, setHeadModalVisible] = useState(false);
//     const [detailModalVisible, setDetailModalVisible] = useState(false);

//     // form general
//     const [inputName, setInputName] = useState("");
//     const [saving, setSaving] = useState(false);

//     // registro form
//     const [selectedTeam, setSelectedTeam] = useState(1);
//     const [selectedActivity, setSelectedActivity] = useState(null);

//     // head form
//     const [headName, setHeadName] = useState("");
//     const [initialDate, setInitialDate] = useState("");
//     const [finalDate, setFinalDate] = useState("");
//     const [headInfo, setHeadInfo] = useState("");

//     // detail form
//     const [detailActivity, setDetailActivity] = useState(null);
//     const [detailUbication, setDetailUbication] = useState("");
//     const [detailJob, setDetailJob] = useState("");

//     // =========================
//     // LOAD DATA
//     // =========================
//     useEffect(() => {
//         loadData();
//     }, []);

//     const loadData = async () => {
//         try {
//             const camps = await getCampaigns();
//             const projs = await getProjects();
//             const acts = await getActivities();
//             const regs = await getRegistros();
//             const hds = await getRegisterHeads();
//             const dets = await getRegisterDetails();
//             const ubs = await getUbications();
//             const jbs = await getJobs();

//             setUbications(ubs);
//             setJobs(jbs);

//             setCampaigns(camps);
//             setProjects(projs);
//             setActivities(acts);
//             setRegistros(regs);
//             setHeads(hds);
//             setDetails(dets);
//         } catch (e) {
//             console.error("Error loading data:", e);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // =========================
//     // HELPERS
//     // =========================
//     const getProjectsByCampaign = (campaignId) =>
//         projects.filter((p) => p.parent === campaignId);

//     const getActivitiesByProject = (projectId) =>
//         activities.filter((a) => !a.project || a.project === projectId);

//     const getRegistrosByProject = (projectId) =>
//         registros.filter((r) => r.proyecto === projectId);

//     const getHeadsByRegistro = (registroId) =>
//         heads.filter((h) => h.registro === registroId);

//     const getDetailsByHead = (headId) =>
//         details.filter((d) => d.register_head === headId);

//     const getTeamName = (id) =>
//         TEAMS.find((t) => t.id === id)?.name || "Equipo";

//     const getActivityName = (id) =>
//         activities.find((a) => a.id === id)?.name || "Actividad";

//     // =========================
//     // OPEN MODALS
//     // =========================
//     const openCreateProject = (campaignId) => {
//         setModalMode("project");
//         setSelectedCampaignId(campaignId);
//         setInputName("");
//         setModalVisible(true);
//     };

//     const openCreateActivity = (projectId) => {
//         setModalMode("activity");
//         setSelectedProjectId(projectId);
//         setInputName("");
//         setModalVisible(true);
//     };

//     const openCreateRegistro = (projectId) => {
//         setModalMode("registro");
//         setSelectedProjectId(projectId);

//         const acts = getActivitiesByProject(projectId);
//         if (acts.length > 0) setSelectedActivity(acts[0].id);

//         setModalVisible(true);
//     };

//     // =========================
//     // SAVE GENERAL
//     // =========================
//     const handleSave = async () => {
//         if (modalMode !== "registro" && !inputName.trim()) {
//             Alert.alert("Error", "El nombre es obligatorio");
//             return;
//         }

//         try {
//             setSaving(true);

//             if (modalMode === "project") {
//                 await createProject({
//                     name: inputName,
//                     type: 2,
//                     parent: selectedCampaignId,
//                     user: 1,
//                 });
//             }

//             if (modalMode === "activity") {
//                 await createActivity({
//                     name: inputName,
//                     project: selectedProjectId,
//                 });
//             }

//             if (modalMode === "registro") {
//                 await createRegistro({
//                     proyecto: selectedProjectId,
//                     equipo: selectedTeam,
//                     actividad: selectedActivity,
//                 });
//             }

//             setModalVisible(false);
//             await loadData();
//         } catch (e) {
//             console.error(e);
//             Alert.alert("Error", "No se pudo guardar");
//         } finally {
//             setSaving(false);
//         }
//     };

//     // =========================
//     // CREATE HEAD
//     // =========================
//     const handleCreateHead = async () => {
//         try {
//             await createRegisterHead({
//                 registro: selectedRegistroId,
//                 name: headName,
//                 initial_date: initialDate,
//                 final_date: finalDate,
//                 extra_information: headInfo,
//             });

//             setHeadModalVisible(false);
//             await loadData();
//         } catch (e) {
//             console.error(e);
//             Alert.alert("Error", "No se pudo crear el head");
//         }
//     };

//     // =========================
//     // CREATE DETAIL
//     // =========================
//     const handleCreateDetail = async () => {
//         if (!detailActivity || !detailUbication || !detailJob) {
//             Alert.alert("Error", "Completa todos los campos");
//             return;
//         }

//         try {
//             await createRegisterDetail({
//                 register_head: selectedHeadId,
//                 activity: detailActivity,
//                 ubication: detailUbication,
//                 job: detailJob,
//             });

//             setDetailModalVisible(false);
//             await loadData();
//         } catch (e) {
//             console.error(e);
//             Alert.alert("Error", "No se pudo crear el detalle");
//         }
//     };

//     // =========================
//     // RENDER CAMPAÑA
//     // =========================
//     const renderCampaign = ({ item }) => {
//         const isExpanded = expandedCampaign === item.id;
//         const campaignProjects = getProjectsByCampaign(item.id);

//         return (
//             <View style={styles.campaignCard}>
//                 <TouchableOpacity
//                     style={styles.campaignHeader}
//                     onPress={() =>
//                         setExpandedCampaign(isExpanded ? null : item.id)
//                     }
//                 >
//                     <Text style={styles.campaignTitle}>{item.name}</Text>
//                     <Ionicons
//                         name={isExpanded ? "chevron-up" : "chevron-down"}
//                         size={20}
//                         color="#666"
//                     />
//                 </TouchableOpacity>

//                 {isExpanded && (
//                     <View style={styles.projectList}>
//                         {campaignProjects.map((project) => {
//                             const isProjExpanded = expandedProject === project.id;
//                             const projectActivities = getActivitiesByProject(project.id);

//                             return (
//                                 <View key={project.id} style={styles.projectBox}>
//                                     <TouchableOpacity
//                                         style={styles.projectHeader}
//                                         onPress={() => {
//                                             setExpandedProject(
//                                                 isProjExpanded ? null : project.id
//                                             );
//                                             setSelectedProjectId(project.id);
//                                         }}
//                                     >
//                                         <Text
//                                             style={[
//                                                 styles.projectTitle,
//                                                 selectedProjectId === project.id &&
//                                                 styles.projectSelected,
//                                             ]}
//                                         >
//                                             📌 {project.name}
//                                         </Text>
//                                     </TouchableOpacity>

//                                     {isProjExpanded && (
//                                         <View style={styles.activityBox}>
//                                             <Text style={styles.sectionTitle}>
//                                                 ACTIVIDADES
//                                             </Text>

//                                             {projectActivities.map((a) => (
//                                                 <Text key={a.id} style={styles.activityItem}>
//                                                     • {a.name}
//                                                 </Text>
//                                             ))}

//                                             <TouchableOpacity
//                                                 style={styles.addActivityBtn}
//                                                 onPress={() =>
//                                                     openCreateActivity(project.id)
//                                                 }
//                                             >
//                                                 <Ionicons
//                                                     name="add-circle-outline"
//                                                     size={16}
//                                                     color="#28a745"
//                                                 />
//                                                 <Text style={styles.addActivityText}>
//                                                     Añadir actividad
//                                                 </Text>
//                                             </TouchableOpacity>

//                                             <TouchableOpacity
//                                                 style={styles.addRegistroBtnInline}
//                                                 onPress={() =>
//                                                     openCreateRegistro(project.id)
//                                                 }
//                                             >
//                                                 <Text style={styles.addRegistroInlineText}>
//                                                     + Crear registro
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         </View>
//                                     )}
//                                 </View>
//                             );
//                         })}

//                         <TouchableOpacity
//                             style={styles.addProjectBtn}
//                             onPress={() => openCreateProject(item.id)}
//                         >
//                             <Ionicons
//                                 name="add-circle-outline"
//                                 size={18}
//                                 color="#007AFF"
//                             />
//                             <Text style={styles.addProjectText}>
//                                 Añadir proyecto
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 )}
//             </View>
//         );
//     };

//     if (loading) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" />
//                 <Text>Cargando...</Text>
//             </View>
//         );
//     }

//     const registrosFiltrados = selectedProjectId
//         ? getRegistrosByProject(selectedProjectId)
//         : [];

//     return (
//         <View style={styles.container}>
//             {/* CAMPAÑAS */}
//             <FlatList
//                 data={campaigns}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={renderCampaign}
//             />

//             {/* REGISTROS */}
//             <View style={styles.registroSection}>
//                 <Text style={styles.registroTitle}>Registros</Text>

//                 {!selectedProjectId ? (
//                     <Text style={styles.emptyText}>
//                         Selecciona un proyecto arriba
//                     </Text>
//                 ) : registrosFiltrados.length === 0 ? (
//                     <Text style={styles.emptyText}>
//                         No hay registros
//                     </Text>
//                 ) : (
//                     <ScrollView>
//                         {registrosFiltrados.map((reg) => {
//                             const regHeads = getHeadsByRegistro(reg.id);

//                             return (
//                                 <View key={reg.id} style={styles.registroCard}>
//                                     <Text style={styles.registroMain}>
//                                         {getTeamName(reg.equipo)}
//                                     </Text>
//                                     <Text style={styles.registroSub}>
//                                         {getActivityName(reg.actividad)}
//                                     </Text>
//                                     <Text style={styles.registroDate}>
//                                         📅 {reg.fecha}
//                                     </Text>

//                                     {/* HEADS */}
//                                     {regHeads.map((head) => {
//                                         const headDetails = getDetailsByHead(head.id);

//                                         return (
//                                             <View key={head.id} style={styles.headItem}>
//                                                 <Text style={styles.headTitle}>
//                                                     🗂 {head.name}
//                                                 </Text>
//                                                 <Text style={styles.headDate}>
//                                                     {head.initial_date} →{" "}
//                                                     {head.final_date}
//                                                 </Text>

//                                                 {/* DETAILS */}
//                                                 {headDetails.map((d) => (
//                                                     <Text key={d.id} style={styles.detailItem}>
//                                                         • {getActivityName(d.activity)} |{" "}
//                                                         {d.ubication} | {d.job}
//                                                     </Text>
//                                                 ))}

//                                                 <TouchableOpacity
//                                                     onPress={() => {
//                                                         setSelectedHeadId(head.id);
//                                                         setDetailModalVisible(true);
//                                                     }}
//                                                 >
//                                                     <Text style={styles.addDetailText}>
//                                                         + Añadir detalle
//                                                     </Text>
//                                                 </TouchableOpacity>
//                                             </View>
//                                         );
//                                     })}

//                                     <TouchableOpacity
//                                         style={styles.addHeadBtn}
//                                         onPress={() => {
//                                             setSelectedRegistroId(reg.id);
//                                             setHeadModalVisible(true);
//                                         }}
//                                     >
//                                         <Text style={styles.addHeadText}>
//                                             + Crear Head
//                                         </Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             );
//                         })}
//                     </ScrollView>
//                 )}
//             </View>

//             {/* MODAL GENERAL */}
//             <Modal visible={modalVisible} transparent animationType="slide">
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContainer}>
//                         <Text style={styles.modalTitle}>
//                             {modalMode === "project"
//                                 ? "Nuevo Proyecto"
//                                 : modalMode === "activity"
//                                     ? "Nueva Actividad"
//                                     : "Nuevo Registro"}
//                         </Text>

//                         {modalMode !== "registro" && (
//                             <TextInput
//                                 style={styles.input}
//                                 placeholder="Nombre"
//                                 value={inputName}
//                                 onChangeText={setInputName}
//                             />
//                         )}

//                         {modalMode === "registro" && (
//                             <>
//                                 <Text style={styles.label}>Equipo</Text>
//                                 {TEAMS.map((team) => (
//                                     <TouchableOpacity
//                                         key={team.id}
//                                         style={[
//                                             styles.option,
//                                             selectedTeam === team.id &&
//                                             styles.optionSelected,
//                                         ]}
//                                         onPress={() => setSelectedTeam(team.id)}
//                                     >
//                                         <Text
//                                             style={[
//                                                 styles.optionText,
//                                                 selectedTeam === team.id &&
//                                                 styles.optionTextSelected,
//                                             ]}
//                                         >
//                                             {team.name}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}

//                                 <Text style={styles.label}>Actividad</Text>
//                                 {getActivitiesByProject(selectedProjectId).map(
//                                     (act) => (
//                                         <TouchableOpacity
//                                             key={act.id}
//                                             style={[
//                                                 styles.option,
//                                                 selectedActivity === act.id &&
//                                                 styles.optionSelected,
//                                             ]}
//                                             onPress={() =>
//                                                 setSelectedActivity(act.id)
//                                             }
//                                         >
//                                             <Text style={styles.optionText}>
//                                                 {act.name}
//                                             </Text>
//                                         </TouchableOpacity>
//                                     )
//                                 )}
//                             </>
//                         )}

//                         <View style={styles.modalButtons}>
//                             <TouchableOpacity
//                                 style={[styles.btn, styles.btnCancel]}
//                                 onPress={() => setModalVisible(false)}
//                             >
//                                 <Text style={styles.btnText}>Cancelar</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[styles.btn, styles.btnSave]}
//                                 onPress={handleSave}
//                             >
//                                 <Text style={styles.btnText}>Guardar</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             {/* MODAL HEAD */}
//             <Modal visible={headModalVisible} transparent animationType="slide">
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContainer}>
//                         <Text style={styles.modalTitle}>Nuevo Head</Text>

//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nombre"
//                             value={headName}
//                             onChangeText={setHeadName}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha inicio (YYYY-MM-DD)"
//                             value={initialDate}
//                             onChangeText={setInitialDate}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Fecha fin (YYYY-MM-DD)"
//                             value={finalDate}
//                             onChangeText={setFinalDate}
//                         />
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Información extra"
//                             value={headInfo}
//                             onChangeText={setHeadInfo}
//                         />

//                         <View style={styles.modalButtons}>
//                             <TouchableOpacity
//                                 style={[styles.btn, styles.btnCancel]}
//                                 onPress={() => setHeadModalVisible(false)}
//                             >
//                                 <Text style={styles.btnText}>Cancelar</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[styles.btn, styles.btnSave]}
//                                 onPress={handleCreateHead}
//                             >
//                                 <Text style={styles.btnText}>Guardar</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             {/* MODAL DETAIL */}
//             <Modal visible={detailModalVisible} transparent animationType="slide">
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContainer}>
//                         <Text style={styles.modalTitle}>Nuevo Detalle</Text>

//                         {/* ACTIVIDAD */}
//                         <Text style={styles.label}>Actividad</Text>
//                         <Picker
//                             selectedValue={detailActivity}
//                             onValueChange={(value) => setDetailActivity(value)}
//                             style={styles.picker}
//                         >
//                             <Picker.Item label="Selecciona actividad" value={null} />
//                             {activities.map((a) => (
//                                 <Picker.Item key={a.id} label={a.name} value={a.id} />
//                             ))}
//                         </Picker>

//                         {/* UBICACIÓN */}
//                         <Text style={styles.label}>Ubicación</Text>
//                         <Picker
//                             selectedValue={detailUbication}
//                             onValueChange={(value) => setDetailUbication(value)}
//                             style={styles.picker}
//                         >
//                             <Picker.Item label="Selecciona ubicación" value={null} />
//                             {ubications.map((u) => (
//                                 <Picker.Item key={u.id} label={u.name} value={u.id} />
//                             ))}
//                         </Picker>

//                         {/* TRABAJO */}
//                         <Text style={styles.label}>Trabajo</Text>
//                         <Picker
//                             selectedValue={detailJob}
//                             onValueChange={(value) => setDetailJob(value)}
//                             style={styles.picker}
//                         >
//                             <Picker.Item label="Selecciona trabajo" value={null} />
//                             {jobs.map((j) => (
//                                 <Picker.Item key={j.id} label={j.name} value={j.id} />
//                             ))}
//                         </Picker>

//                         <View style={styles.modalButtons}>
//                             <TouchableOpacity
//                                 style={[styles.btn, styles.btnCancel]}
//                                 onPress={() => setDetailModalVisible(false)}
//                             >
//                                 <Text style={styles.btnText}>Cancelar</Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 style={[styles.btn, styles.btnSave]}
//                                 onPress={handleCreateDetail}
//                             >
//                                 <Text style={styles.btnText}>Guardar</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// }

// // =========================
// // STYLES
// // =========================
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#f5f5f5",
//         padding: 10,
//     },
//     campaignCard: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 12,
//         marginBottom: 8,
//     },
//     campaignHeader: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//     },
//     campaignTitle: {
//         fontSize: 15,
//         fontWeight: "700",
//     },
//     projectList: {
//         marginTop: 8,
//         paddingLeft: 6,
//     },
//     projectBox: {
//         marginBottom: 6,
//     },
//     projectHeader: {
//         paddingVertical: 4,
//     },
//     projectTitle: {
//         fontSize: 14,
//         color: "#333",
//     },
//     projectSelected: {
//         color: "#007AFF",
//         fontWeight: "700",
//     },
//     activityBox: {
//         marginTop: 4,
//         paddingLeft: 12,
//         borderLeftWidth: 1,
//         borderLeftColor: "#ddd",
//     },
//     sectionTitle: {
//         fontSize: 12,
//         fontWeight: "700",
//         color: "#444",
//     },
//     activityItem: {
//         fontSize: 12,
//         color: "#555",
//     },
//     addActivityBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 2,
//     },
//     addActivityText: {
//         fontSize: 12,
//         color: "#28a745",
//         marginLeft: 4,
//     },
//     addProjectBtn: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginTop: 6,
//     },
//     addProjectText: {
//         fontSize: 13,
//         color: "#007AFF",
//         marginLeft: 4,
//     },
//     addRegistroBtnInline: {
//         marginTop: 4,
//     },
//     addRegistroInlineText: {
//         fontSize: 12,
//         color: "#ff9500",
//     },
//     registroSection: {
//         marginTop: 12,
//         paddingTop: 10,
//         borderTopWidth: 2,
//         borderTopColor: "#007AFF",
//     },
//     registroTitle: {
//         fontSize: 20,
//         fontWeight: "800",
//     },
//     registroCard: {
//         backgroundColor: "#fff",
//         padding: 10,
//         borderRadius: 10,
//         marginBottom: 8,
//     },
//     registroMain: {
//         fontSize: 14,
//         fontWeight: "700",
//     },
//     registroSub: {
//         fontSize: 13,
//         color: "#555",
//     },
//     registroDate: {
//         fontSize: 11,
//         color: "#888",
//     },
//     headItem: {
//         marginTop: 6,
//         paddingLeft: 10,
//         borderLeftWidth: 2,
//         borderLeftColor: "#ddd",
//     },
//     headTitle: {
//         fontSize: 13,
//         fontWeight: "600",
//     },
//     headDate: {
//         fontSize: 11,
//         color: "#777",
//     },
//     detailItem: {
//         fontSize: 12,
//         color: "#444",
//         marginLeft: 6,
//     },
//     addHeadBtn: {
//         marginTop: 6,
//     },
//     addHeadText: {
//         fontSize: 12,
//         color: "#007AFF",
//         fontWeight: "600",
//     },
//     addDetailText: {
//         fontSize: 12,
//         color: "#28a745",
//     },
//     emptyText: {
//         fontSize: 13,
//         color: "#999",
//     },
//     center: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: "rgba(0,0,0,0.4)",
//         justifyContent: "flex-end",
//     },
//     modalContainer: {
//         backgroundColor: "#fff",
//         padding: 20,
//         borderTopLeftRadius: 18,
//         borderTopRightRadius: 18,
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: "700",
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 10,
//         padding: 12,
//         marginTop: 8,
//         backgroundColor: "#fafafa",
//     },
//     label: {
//         fontSize: 14,
//         fontWeight: "600",
//         marginTop: 6,
//     },
//     option: {
//         padding: 10,
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: "#ddd",
//         marginBottom: 6,
//     },
//     optionSelected: {
//         backgroundColor: "#007AFF",
//         borderColor: "#007AFF",
//     },
//     optionText: {
//         fontSize: 13,
//     },
//     optionTextSelected: {
//         color: "#fff",
//     },
//     modalButtons: {
//         flexDirection: "row",
//         justifyContent: "flex-end",
//         marginTop: 10,
//     },
//     btn: {
//         paddingVertical: 10,
//         paddingHorizontal: 18,
//         borderRadius: 10,
//         marginLeft: 10,
//     },
//     btnCancel: {
//         backgroundColor: "#999",
//     },
//     btnSave: {
//         backgroundColor: "#007AFF",
//     },
//     btnText: {
//         color: "#fff",
//         fontWeight: "600",
//     },
//     picker: {
//         backgroundColor: "#fafafa",
//         borderWidth: 1,
//         borderColor: "#ddd",
//         borderRadius: 10,
//         marginTop: 4,
//         marginBottom: 8,
//     },
// });


import CampaignList from "@/components/campains/campain-list";
import CampaignModal from "@/components/modals/campain-modal";
import RegisterHeadModal from "@/components/modals/head-modal";
import { useActivities } from "@/hooks/use-activities";
import { useCampaigns } from "@/hooks/use-campains";
import { useRegisterHeads } from "@/hooks/use-heads";
import { useProjects } from "@/hooks/use-projects";
import { useRegistroStore } from "@/store/useRegistroStore";
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


  const {
    infoData,
  } = useRegistroStore();

  const [campaignModalVisible, setCampaignModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [creating, setCreating] = useState(false);
  const { heads, loading: loadingHeads, reload: reloadHeads } =
    useRegisterHeads(selectedProject?.id);

    // console.log("THESE ARE MY HEADS", heads);
    
  // filtros
  const projectsByCampaign = (campaignId) =>
    projects.filter((p) => p.parent === campaignId);

  const activitiesByProject = (projectId) =>
    activities.filter((a) => a.project === projectId);

  const getActivityName = (id) =>
    activities.find((a) => a.id === id)?.name ||
    activities.find((a) => a.id === id)?.nombre ||
    "Actividad";

  const [registerModalVisible, setRegisterModalVisible] = useState(false);

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

      {/* CAMPAÑAS */}
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

          {/* 👇 REGISTROS */}
          <View style={styles.registrosSection}>
            <View style={styles.registrosHeader}>
              <Text style={styles.registrosTitle}>Registros</Text>

              <TouchableOpacity
                style={[
                  styles.addRegistroBtn,
                  !selectedProject && { opacity: 0.5 },
                ]}
                disabled={!selectedProject}
                onPress={() => setRegisterModalVisible(true)}
              >
                <Text style={styles.addRegistroText}>+ Iniciar</Text>
              </TouchableOpacity>
            </View>
            {!selectedProject ? (
              <Text style={styles.registrosEmpty}>
                Selecciona un proyecto para ver los registros
              </Text>
            ) : loadingHeads ? (
              <Text style={styles.registrosEmpty}>
                Cargando registros...
              </Text>
            ) : heads.length === 0 ? (
              <Text style={styles.registrosEmpty}>
                No hay registros para este proyecto
              </Text>
            ) : (
              <View style={{ marginTop: 8 }}>
                {heads.map((head) => (
                  <TouchableOpacity
                    key={head.id}
                    style={styles.registroCard}
                    onPress={() => {
                      // setRegisterHeadId(head.id);
                      // aquí luego navegas a detalles
                    }}
                  >
                    <Text style={styles.registroTitle}>
                      {head.name || "Registro sin nombre"}
                    </Text>
                    <Text style={styles.registroSub}>
                      {new Date(head.initial_date).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      )}

      {/* MODAL CAMPAÑA */}
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
    </View>
  );
}

const styles = StyleSheet.create({
  registroInfo: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
  },
  addBtn: {
    backgroundColor: "#007AFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
  },

  // 👇 REGISTROS
  registrosSection: {
    marginTop: 12,
    borderTopWidth: 2,
    borderTopColor: "#ddd",
    paddingTop: 8,
  },
  registrosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  registrosTitle: {
    fontSize: 18,
    fontWeight: "800",
  },
  registrosEmpty: {
    marginTop: 10,
    fontSize: 13,
    color: "#777",
  },
  addRegistroBtn: {
    backgroundColor: "#ff9500",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  addRegistroText: {
    color: "#fff",
    fontWeight: "600",
  },
  registroCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
    elevation: 2,
  },

  registroTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  registroSub: {
    fontSize: 12,
    color: "#666",
  },

});
