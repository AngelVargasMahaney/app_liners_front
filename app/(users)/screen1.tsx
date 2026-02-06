import { getRHeadsByProjectEq } from "@/api/client";
import ProjectAvailableList from "@/components/ProjectsAvailable";
import { useRegistroStore } from "@/store/useRegistroStore";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { router } from 'expo-router';

const { width } = Dimensions.get("window");

export default function Screen1() {
    const { infoData, setInfoData } = useRegistroStore();
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const images = [
        {
            id: 1,
            name: "Molino SAG",
            image: require("../../assets/images/molino-sag.jpg"),
        },
        {
            id: 2,
            name: "Molino de bolas N°1",
            image: require("../../assets/images/molino-bolas.jpg"),
        },
        {
            id: 3,
            name: "Molino de bolas N°2",
            image: require("../../assets/images/molino-bolas.jpg"),
        },
    ];

    const handleSelectEquipo = (equipoId: number, name: string) => {
        setInfoData({
            ...infoData,
            equipoSelected: equipoId, // ✅ enum real
            equipo: name,
            proyecto: "", // reset proyecto al cambiar equipo
        });
    };

    const loadProjects = async () => {
        if (!infoData.equipoSelected) return;

        try {
            setLoading(true);
            const res = await getRHeadsByProjectEq(
                {
                    equipment: infoData.equipoSelected
                }
            );
            // console.log("adawdokwoa", res)
            setProjects(res);
        } catch (e) {
            console.log("Error cargando proyectos:", e);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, [infoData.equipoSelected]);

    // console.log("infoDaata", infoData);


    return (
        <View style={styles.container}>
            {/* TITULO */}
            <Text style={styles.title}>
                {!infoData.equipoSelected
                    ? "Selecciona un equipo"
                    : "Equipo seleccionado"}
            </Text>

            {/* EQUIPOS */}
            <View style={styles.imagesContainer}>
                {images.map((item) => {
                    const selected = infoData.equipoSelected === item.id;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.card, selected && styles.cardSelected]}
                            onPress={() => handleSelectEquipo(item.id, item.name)}
                            activeOpacity={0.9}
                        >
                            <Image source={item.image} style={styles.image} />

                            <View
                                style={[
                                    styles.overlay,
                                    selected && styles.overlaySelected,
                                ]}
                            />

                            <View style={styles.labelContainer}>
                                <Text style={styles.labelText}>{item.name}</Text>
                            </View>

                            {selected && (
                                <View style={styles.check}>
                                    <Text style={styles.checkText}>✓</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* PROYECTOS */}
            {infoData.equipoSelected && (
                <View style={{ flex: 1, width: "100%" }}>
                    <Text style={styles.title}>Cabeceras disponibles</Text>

                    {loading ? (
                        <Text style={{ textAlign: "center" }}>
                            Cargando proyectos...
                        </Text>
                    ) : (
                        <ProjectAvailableList
                            projects={projects}
                            onSelect={(head) => {
                                // console.log("project", head);

                                setInfoData({
                                    ...infoData,
                                    proyecto: String(head.proyecto.id),
                                    rhead: String(head.id),
                                })
                                router.push("/(users)/screen2")
                            }
                            }
                        />
                    )}
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },

    title: {
        fontSize: 26,
        fontWeight: "800",
        marginBottom: 20,
        textAlign: "center",
        color: "#00377D",
    },

    imagesContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
        gap: 16,
    },

    card: {
        width: (width - 64) / 3,
        height: (width - 64) / 3,
        borderRadius: 18,
        overflow: "hidden",
        backgroundColor: "#fff",
        elevation: 8,
    },

    cardSelected: {
        transform: [{ scale: 1.05 }],
        elevation: 14,
    },

    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },

    overlaySelected: {
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    labelContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.65)",
        paddingVertical: 6,
        alignItems: "center",
    },

    labelText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
        textAlign: "center",
    },

    check: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#F0E68C",
        justifyContent: "center",
        alignItems: "center",
    },

    checkText: {
        fontWeight: "900",
        color: "#00377D",
        fontSize: 16,
    },

    // ---- Proyectos ----
    projectsContainer: {
        flex: 1,
        marginTop: 10,
    },

    loadingText: {
        textAlign: "center",
        color: "#777",
        fontSize: 14,
        marginTop: 10,
    },
});
