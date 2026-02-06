import { useRegistroStore } from '@/store/useRegistroStore';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

const images = [
    {
        name: 'Molino sag',
        image: require("../../assets/images/molino-sag.jpg")
    },
    {
        name: 'Molino de bolas N°1',
        image: require("../../assets/images/molino-bolas.jpg")
    },
    {
        name: 'Molino de bolas N°2',
        image: require("../../assets/images/molino-bolas.jpg")
    }
];

export default function Screen1() {


    // Estados separados para cada picker

    // const [infoData, setInfoData] = useState<{
    //     campana: string,
    //     proyecto: string,
    //     turno: string,
    //     actividad: string
    // }>({
    //     campana: '',
    //     proyecto: '',
    //     turno: '',
    //     actividad: ''
    // })
    const { infoData, setInfoData } = useRegistroStore();

    const handleSelect = (index: number) => {
        setInfoData({
            ...infoData,
            equipo: images.find((obj, ind) => ind === index)?.name,
            equipoSelected: index
        })
    };


    const handleConfirm = () => {
        if (infoData.equipoSelected === null) {
            return alert("Por favor selecciona una imagen.");
        }
        // router.push({ pathname: `/screen2`, params: { ...infoData, equipo: images.find((obj, ind) => ind === selectedIndex)?.name } })
        if (infoData.actividad === '1' || infoData.actividad === '2' || infoData.actividad === '4') {
            router.push({ pathname: `/screen2` })
        } else {
            router.push({ pathname: `/screen3` })
        }

    };


    const handleBtnDisabled = () => {
        if (infoData.actividad === '' || infoData.campana === '' || infoData.equipo === '' || infoData.proyecto === '' || infoData.turno === '') {
            return true
        } else {
            return false
        }

    }

    console.log(infoData)

    return (

        <LinearGradient
            colors={["#9A9A04", "#F0E68C", "#00377D"]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <ScrollView>
                <View>
                    <Text style={styles.title}>{infoData.equipoSelected === null ? 'Elegir el equipo' : 'Equipo elegido: '} {images.find((obj, ind) => ind === infoData.equipoSelected)?.name}</Text>

                    <View style={styles.imagesContainer}>
                        {images.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.imageWrapper,
                                    infoData.equipoSelected === index && styles.selectedBorder,
                                ]}
                                onPress={() => handleSelect(index)}
                                activeOpacity={0.8}
                            >
                                <Image source={item.image} style={styles.image} />
                                <View style={styles.labelContainer}>
                                    <Text style={styles.labelText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {
                    infoData.equipoSelected === null ? null :
                        <View>
                            {/* <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around'
                        }}>
                            <TouchableOpacity>
                                <LinearGradient
                                    colors={["#00377D", "#00377D"]}
                                    style={[styles.button, { width: 150 }]}
                                >
                                    <Text style={styles.buttonText}>Editar registro</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <LinearGradient
                                    colors={["#00377D", "#00377D"]}
                                    style={[styles.button, { width: 150 }]}
                                >
                                    <Text style={styles.buttonText}>Registrar datos</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <View>
                                <Text>Información del proyecto</Text>
                            </View>
                            <TouchableOpacity>
                                <Text>Resumen</Text>
                            </TouchableOpacity>
                        </View> */}

                            {/* PICKERS */}
                            <View style={styles.form}>
                                <View style={styles.field}>
                                    <Text style={styles.label}>Campaña:</Text>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={infoData.campana}
                                        onValueChange={(value: string) => setInfoData({ ...infoData, campana: value })}
                                    >
                                        <Picker.Item label="Seleccione..." value="" />
                                        <Picker.Item label="Campaña N° 1" value="1" />
                                        <Picker.Item label="Campaña N° 2" value="2" />
                                    </Picker>
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Proyecto</Text>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={infoData.proyecto}
                                        onValueChange={(value: string) => setInfoData({ ...infoData, proyecto: value })}
                                    >
                                        <Picker.Item label="Seleccione..." value="1" />
                                        <Picker.Item label="Instalación" value="2" />
                                        <Picker.Item label="Retorqueo N°1" value="3" />
                                        <Picker.Item label="Retorqueo N°2" value="4" />
                                    </Picker>
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Turno</Text>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={infoData.turno}
                                        onValueChange={(value: string) => setInfoData({ ...infoData, turno: value })}
                                    >
                                        <Picker.Item label="Seleccione..." value="" />
                                        <Picker.Item label="A" value="a" />
                                        <Picker.Item label="B" value="b" />
                                    </Picker>
                                </View>

                                <View style={styles.field}>
                                    <Text style={styles.label}>Actividad</Text>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={infoData.actividad}
                                        onValueChange={(value: string) => setInfoData({ ...infoData, actividad: value })}
                                    >
                                        <Picker.Item label="Seleccione..." value="" />
                                        <Picker.Item label="Verificación de pernos" value="1" />
                                        <Picker.Item label="Calibración llave de torque" value="2" />
                                        <Picker.Item label="Instalación de rubber backing" value="3" />
                                        <Picker.Item label="Auditoria de pernos" value="4" />
                                    </Picker>
                                </View>
                            </View>

                            {/* BOTÓN */}
                            <TouchableOpacity disabled={handleBtnDisabled()} style={[styles.button, { backgroundColor: handleBtnDisabled() ? '#ccc' : '#00377D' }]} onPress={handleConfirm} activeOpacity={0.8}>

                                <Text style={styles.buttonText}>Confirmar</Text>

                            </TouchableOpacity>
                        </View>
                }
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 60,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
        textAlign: "center",
        color: "#fff",
    },
    imagesContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 40,
    },
    imageWrapper: {
        width: (width - 80) / 3,
        height: (width - 80) / 3,
        borderRadius: 15,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "transparent",
        backgroundColor: "#fff",
        elevation: 5,
    },
    selectedBorder: {
        borderColor: "#F0E68C",
        borderWidth: 3,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    labelContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        paddingVertical: 4,
        alignItems: "center",
    },
    labelText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 12,
        textAlign: "center",
    },

    form: {
        backgroundColor: "rgba(255,255,255,0.15)",
        padding: 10,
        borderRadius: 10,
    },

    field: {
        marginBottom: 18,
    },

    label: {
        color: "black",
        fontWeight: "700",
        marginBottom: 5,
    },

    button: {
        height: 55,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },
});
