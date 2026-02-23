import { createRegisterHead, getEquipments } from "@/api/client";
import { useRegistroStore } from "@/store/useRegistroStore";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";


// const EQUIPOS = [
//     { id: 1, label: "Molino SAG" },
//     { id: 2, label: "Molino de Bolas N°1" },
//     { id: 3, label: "Molino de Bolas N°2" },
// ];

export default function RegisterHeadModal({
    visible,
    onClose,
    proyecto,
}) {
    const [dates, setDates] = useState({
        initial: null as Date | null,
        final: null as Date | null,
    });

    const [picker, setPicker] = useState<{
        visible: boolean;
        field: "initial" | "final" | null;
        step: "date" | "time";
    }>({
        visible: false,
        field: null,
        step: "date",
    });

    const openPicker = (field: "initial" | "final") => {
        setPicker({
            visible: true,
            field,
            step: "date",
        });
    };


    const [equipments, setEquipments] = useState(null)
    const apiGetEquipments = async () => {
        try {
            const response = await getEquipments()
            const rs = response.map((obj: any) => {
                return {
                    id: obj.id,
                    label: obj.name
                }
            })
            setEquipments(rs)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        apiGetEquipments()
    }, [])

    const { infoData, setInfoData } = useRegistroStore();

    const [name, setName] = useState("");
    const [extra, setExtra] = useState("");
    const [equipo, setEquipo] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // 🔹 cuando se abre el modal, inicializa el equipo
    useEffect(() => {
        if (visible) {
            setEquipo(infoData.equipoSelected ?? null);
            setName("");
            setExtra("");
        }
    }, [visible]);


    const handleCreate = async () => {
        if (!proyecto || !equipo) {
            Alert.alert("Error", "Selecciona proyecto y equipo");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                proyecto: proyecto.id,
                equipo: equipo,
                name: name || null,
                extra_information: extra || null,
                initial_date: dates.initial
                    ? dates.initial.toISOString()
                    : null,

                final_date: dates.final
                    ? dates.final.toISOString()
                    : null,
            };

            console.log("payload", payload)

            const head = await createRegisterHead(payload);

            // guardamos el head activo
            //   setRegisterHeadId(head.id);

            // sincronizamos el equipo seleccionado global
            setInfoData({
                ...infoData,
                equipoSelected: equipo,
                equipo: equipments?.find((e) => e.id === equipo)?.label,
            });

            onClose();
        } catch (e) {
            console.log(e);
            Alert.alert("Error", "No se pudo crear el registro");
        } finally {
            setLoading(false);
        }
    };
    const handleChange = (event, selectedDate) => {
        if (!selectedDate || !picker.field) {
            setPicker({ visible: false, field: null, step: "date" });
            return;
        }

        if (picker.step === "date") {
            setDates(prev => ({
                ...prev,
                [picker.field]: selectedDate,
            }));

            setPicker(prev => ({ ...prev, step: "time" }));
            return;
        }

        // combinar fecha + hora
        setDates(prev => {
            const base = new Date(prev[picker.field] || new Date());

            base.setHours(selectedDate.getHours());
            base.setMinutes(selectedDate.getMinutes());

            return {
                ...prev,
                [picker.field]: base,
            };
        });

        setPicker({ visible: false, field: null, step: "date" });
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Iniciar registro</Text>

                    {/* INFO CONTEXTO */}
                    <Text style={styles.info}>
                        Proyecto: <Text style={styles.bold}>{proyecto?.name}</Text>
                    </Text>

                    {/* 👇 SELECT EQUIPO */}
                    <Text style={styles.label}>Equipo</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={equipo}
                            onValueChange={(value) => setEquipo(value)}
                        >
                            <Picker.Item label="Seleccione equipo..." value={null} />
                            {equipments?.map((e) => (
                                <Picker.Item key={e.id} label={e.label} value={e.id} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>Fecha inicial</Text>
                    <TouchableOpacity style={styles.input} onPress={() => openPicker("initial")}>
                        <Text>
                            {dates.initial
                                ? dates.initial.toLocaleString()
                                : "Seleccionar fecha"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Fecha final</Text>
                    <TouchableOpacity style={styles.input} onPress={() => openPicker("final")}>
                        <Text>
                            {dates.final
                                ? dates.final.toLocaleString()
                                : "Seleccionar fecha"}
                        </Text>
                    </TouchableOpacity>


                    {/* NOMBRE */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre del registro (opcional)"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* OBSERVACIONES */}
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Observaciones"
                        value={extra}
                        onChangeText={setExtra}
                        multiline
                    />

                    {/* ACCIONES */}
                    <View style={styles.actions}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancel}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.confirm,
                                (!equipo || loading) && { opacity: 0.5 },
                            ]}
                            onPress={handleCreate}
                            disabled={!equipo || loading}
                        >
                            <Text style={styles.confirmText}>
                                {loading ? "Creando..." : "Crear"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {picker.visible && (
                <DateTimePicker
                    value={dates[picker.field] || new Date()}
                    mode={picker.step}
                    display="default"
                    is24Hour
                    onChange={handleChange}
                />
            )}
        </Modal>
    );
}


const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "700",
        marginTop: 10,
    },

    pickerWrapper: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        marginTop: 4,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        alignItems: "center",
    },

    modal: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
    },

    title: {
        fontSize: 18,
        fontWeight: "800",
        marginBottom: 12,
    },

    info: {
        fontSize: 14,
        marginBottom: 4,
    },

    bold: {
        fontWeight: "700",
    },

    input: {
        backgroundColor: "#f5f5f5",
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
    },

    textArea: {
        minHeight: 80,
        textAlignVertical: "top",
    },

    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        gap: 16,
    },

    cancel: {
        color: "#777",
        fontWeight: "600",
    },

    confirm: {
        backgroundColor: "#ff9500",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },

    confirmText: {
        color: "#fff",
        fontWeight: "700",
    },
});
