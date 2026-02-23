import React, { useEffect, useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import SelectModal from "../select-modal";

type Mode = "create" | "edit" | "view";

interface Props {
    visible: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    mode?: Mode;
    data?: any;
    equipments: any[];
    ubications: any[];
}

export default function PistolaTorqueModal({
    visible,
    onClose,
    onSave,
    mode = "create",
    data,
    equipments,
    ubications,
}: Props) {

    const isView = mode === "view";

    const [showEquipments, setShowEquipments] = useState(false);
    const [showUbications, setShowUbications] = useState(false);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const initialState = {
        equipo: null,
        ubicacion: null,
        company_in_charge: "",
        manufacturer: "",
        model: "",
        calibration_cert: "",
        calibration_number: "",
        tension_by_manufacturer: "",
        torque_by_manufacturer: "",
        giro_number: "",
        torque_in_field: "",
        tension_by_test_bench: "",
        calibration_date: null,
        calibration_time: null,
        serial_number: "",
    }

    const [form, setForm] = useState<any>(initialState);

    useEffect(() => {
        if (data) {
            setForm(data);
        }
    }, [data]);

    const update = (key: string, value: any) => {
        setForm((p: any) => ({ ...p, [key]: value }));
    };

    const formatDate = (date: any) => {
        if (!date) return "Seleccionar fecha";
        return new Date(date).toISOString().split("T")[0];
    };

    const formatTime = (date: any) => {
        if (!date) return "Seleccionar hora";
        return new Date(date).toTimeString().split(" ")[0];
    };

    const Input = (label: string, key: string) => (
        <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>{label}</Text>

            <TextInput
                editable={!isView}
                style={styles.input}
                value={form[key]}
                onChangeText={(t) => update(key, t)}
            />
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide">

            <View style={styles.container}>

                <Text style={styles.title}>Pistola Torque</Text>

                <ScrollView>

                    {/* EQUIPO */}
                    <Text style={styles.label}>Equipo</Text>
                    <TouchableOpacity
                        disabled={isView}
                        style={styles.selector}
                        onPress={() => setShowEquipments(true)}
                    >
                        <Text>{form.equipo?.name || "Seleccionar equipo"}</Text>
                    </TouchableOpacity>

                    {/* UBICACION */}
                    <Text style={styles.label}>Ubicación</Text>
                    <TouchableOpacity
                        disabled={isView}
                        style={styles.selector}
                        onPress={() => setShowUbications(true)}
                    >
                        <Text>{form.ubicacion?.name || "Seleccionar ubicación"}</Text>
                    </TouchableOpacity>

                    {Input("Empresa encargada", "company_in_charge")}
                    {Input("Fabricante", "manufacturer")}
                    {Input("Modelo", "model")}
                    {Input("Certificado calibración", "calibration_cert")}
                    {Input("Número calibración", "calibration_number")}
                    {Input("Tensión fabricante", "tension_by_manufacturer")}
                    {Input("Torque fabricante", "torque_by_manufacturer")}
                    {Input("Número giro", "giro_number")}
                    {Input("Torque en campo", "torque_in_field")}
                    {Input("Tensión banco prueba", "tension_by_test_bench")}

                    {/* DATE PICKER */}
                    <Text style={styles.label}>Fecha calibración</Text>
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>{formatDate(form.calibration_date)}</Text>
                    </TouchableOpacity>

                    {/* TIME PICKER */}
                    <Text style={styles.label}>Hora calibración</Text>
                    <TouchableOpacity
                        style={styles.selector}
                        onPress={() => setShowTimePicker(true)}
                    >
                        <Text>{formatTime(form.calibration_time)}</Text>
                    </TouchableOpacity>

                    {Input("Serial", "serial_number")}

                </ScrollView>

                <View style={styles.footer}>

                    <TouchableOpacity onPress={onClose}>
                        <Text>Cancelar</Text>
                    </TouchableOpacity>

                    {!isView && (
                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={() => onSave(form)}
                        >
                            <Text style={{ color: "#fff" }}>Guardar</Text>
                        </TouchableOpacity>
                    )}

                </View>

            </View>

            {/* SELECT MODALS */}
            <SelectModal
                visible={showEquipments}
                title="Seleccionar equipo"
                data={equipments}
                onClose={() => setShowEquipments(false)}
                onSelect={(item) => update("equipo", item)}
            />

            <SelectModal
                visible={showUbications}
                title="Seleccionar ubicación"
                data={ubications}
                onClose={() => setShowUbications(false)}
                onSelect={(item) => update("ubicacion", item)}
            />

            {/* DATE PICKER */}
            {showDatePicker && (
                <DateTimePicker
                    value={form.calibration_date || new Date()}
                    mode="date"
                    onChange={(e, date) => {
                        setShowDatePicker(false);
                        if (date) update("calibration_date", date);
                    }}
                />
            )}

            {/* TIME PICKER */}
            {showTimePicker && (
                <DateTimePicker
                    value={form.calibration_time || new Date()}
                    mode="time"
                    onChange={(e, date) => {
                        setShowTimePicker(false);
                        if (date) update("calibration_time", date);
                    }}
                />
            )}

        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    title: { fontSize: 18, fontWeight: "800", marginBottom: 10 },
    label: { fontSize: 12, fontWeight: "600", marginTop: 10 },
    input: { borderWidth: 1, borderColor: "#ddd", padding: 8, borderRadius: 6 },
    selector: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 6, marginTop: 4 },
    footer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
    saveBtn: { backgroundColor: "#007AFF", padding: 10, borderRadius: 6 }
});
