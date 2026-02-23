import { getActByProjectEq, getEquipments, getJobs, getPistolasTorque, getUbications } from '@/api/client';
import { useRegistroStore } from '@/store/useRegistroStore';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import ShapeEditor from '../(auditoria)/ShapeEditor';


export default function Screen1() {
  const [actividadOpen, setActividadOpen] = useState(false);
  const [actividad, setActividad] = useState(null);
  const { infoData, setInfoData } = useRegistroStore();
  const [actividadItems, setActividadItems] = useState(null)

  const [equipments, setEquipments] = useState<any[] | null>(null)

  const apiGetActivitiesByProjEq = async () => {
    try {
      const response = await getActByProjectEq(Number(infoData.proyecto), Number(infoData.equipoSelected))

      const rs = response.map((obj: any) => {
        return {
          label: obj.name,
          value: obj.id
        }
      })

      setActividadItems(rs)

    } catch (error) {
      console.log("ERRROR", error)
    }
  }



  // const [actividadItems, setActividadItems] = useState([
  //   { label: "Auditoría de Pernos", value: "auditoria" },
  //   { label: "Verificación de Pernos", value: "verificacion" },
  //   { label: "Calibración de llaves", value: "calibracion" },
  // ]);

  const [ubicacionOpen, setUbicacionOpen] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);
  // const [ubicacionItems, setUbicacionItems] = useState([
  //   { label: "Shell", value: "shell" },
  //   { label: "Tapa de Alimentación", value: "tapa" },
  //   { label: "Tapa de Descarga - Cajones", value: "cajones" },
  //   { label: "Tapa de Descarga - Parrillas", value: "parrillas" },
  // ]);

  const [ubicacionItems, setUbicacionItems] = useState(null)

  const apiGetUbications = async () => {
    try {
      const response = await getUbications()
      // console.log("MY RESPONSE", response);

      const rs = response.map((obj: any) => {
        return {
          label: obj.name,
          value: obj.id
        }
      })

      setUbicacionItems(rs)

    } catch (error) {
      console.log("ERRROR", error)
    }
  }


  const [tareaOpen, setTareaOpen] = useState(false);
  const [tarea, setTarea] = useState(null);
  // const [tareaItems, setTareaItems] = useState([
  //   { label: "Instalación de Pernos", value: "instalacion" },
  //   { label: "Rubber Baking", value: "rubber" },
  //   { label: "Sensores", value: "sensores" },
  // ]);

  const [tareaItems, setTareaItems] = useState(null)

  const apiGetJobs = async () => {
    try {
      const response = await getJobs()

      const rs = response.map((obj: any) => {
        return {
          label: obj.name,
          value: obj.id
        }
      })

      setTareaItems(rs)

    } catch (error) {
      console.log("ERRROR", error)
    }
  }

  const apiGetEquipments = async () => {
    try {
      const response = await getEquipments()
      console.log(response);
      setEquipments(response)

    } catch (error) {
      console.log("ERrror", error)
    }
  }

  const [pistolasTorque, setPistolasTorque] = useState(null)

  const apiGetPistols = async () => {
    try {
      const response = await getPistolasTorque()
      const rsp = response.filter((obj) => obj.equipo === infoData.equipoSelected)
      setPistolasTorque(rsp)

    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    apiGetEquipments()
    apiGetActivitiesByProjEq()
    apiGetUbications()
    apiGetJobs()
  }, [])

  useEffect(() => {
    if (infoData.equipoSelected) {
      apiGetPistols()
    }
  }, [infoData])



  const [imageLeaflet, setImageLeaflet] = useState(null)

  useEffect(() => {
    if (!equipments || !infoData.equipoSelected || !ubicacion) {
      setImageLeaflet(null);
      return;
    }

    const equipment = equipments.find(
      (e) => e.id === infoData.equipoSelected
    );

    if (!equipment) {
      setImageLeaflet(null);
      return;
    }

    const img = equipment.images.find(
      (i: any) => i.type === ubicacion
    );

    setImageLeaflet(img?.file ?? null);

  }, [equipments, infoData.equipoSelected, ubicacion, tarea]);



  // console.log("TEARA", tarea);


  //   console.log(infoData);


  const [minimizeBtn, setMinimizeBtn] = useState(false)

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.cardTitle}>{infoData.equipo}</Text>
              <Text style={styles.cardSubtitle}>INFORMACION ADICIONAL</Text>
            </View>
            {
              minimizeBtn && actividad && ubicacion && tarea ?
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ borderLeftWidth: 1, padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {actividadItems?.find((obj) => obj.value === actividad)?.label}
                  </Text>

                  <Text style={{ borderLeftWidth: 1, padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {ubicacionItems?.find((obj) => obj.value === ubicacion)?.label}
                  </Text>

                  <Text style={{ borderLeftWidth: 1, padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {tareaItems?.find((obj) => obj.value === tarea)?.label}
                  </Text>
                </View> : null
            }

          </View>
          <TouchableOpacity onPress={() => setMinimizeBtn(!minimizeBtn)}>
            <Feather name={!minimizeBtn ? "minimize-2" : "maximize-2"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={{ height: !minimizeBtn ? 'auto' : '0%', overflow: minimizeBtn ? 'hidden' : 'visible' }}>
          <Text style={styles.sectionTitle}>Datos del Registro...</Text>

          <View style={{ zIndex: 4000 }}>
            <Text style={styles.label}>ACTIVIDAD</Text>
            {
              actividadItems !== null ?
                <DropDownPicker
                  open={actividadOpen}
                  value={actividad}
                  items={actividadItems}
                  setOpen={setActividadOpen}
                  setValue={setActividad}
                  setItems={setActividadItems}
                  placeholder="Seleccionar actividad"
                  style={styles.dropdown}
                  zIndex={3000}
                /> : null
            }
          </View>

          <View style={{ zIndex: 3000 }}>
            <Text style={styles.label}>UBICACIÓN</Text>
            {
              ubicacionItems !== null ?
                <DropDownPicker
                  open={ubicacionOpen}
                  value={ubicacion}
                  items={ubicacionItems}
                  setOpen={(open) => {
                    setUbicacionOpen(open);
                    setTareaOpen(false);
                  }}
                  setValue={setUbicacion}
                  setItems={setUbicacionItems}
                  placeholder="Seleccionar ubicación"
                  style={styles.dropdown}
                /> : null
            }
          </View>

          <View style={{ zIndex: 2000, marginTop: 10 }}>
            <Text style={styles.label}>TAREA</Text>
            {
              tareaItems !== null ?
                <DropDownPicker
                  open={tareaOpen}
                  value={tarea}
                  items={tareaItems}
                  setOpen={(open) => {
                    setTareaOpen(open);
                    setUbicacionOpen(false);
                  }}
                  setValue={setTarea}
                  setItems={setTareaItems}
                  placeholder="Seleccionar tarea"
                  style={styles.dropdown}
                /> : null
            }
          </View>
          <View style={{ alignItems: 'center' }}>
            {
              infoData.equipoSelected === 1 ?
                <Image
                  source={require('../../assets/images/colores_shell.png')}
                  style={
                    {
                      width: 350,
                      height: 150,
                      resizeMode: "contain",
                    }
                  }
                /> : <Image
                  source={require('../../assets/images/colores_alimentacion.png')}
                  style={
                    {
                      width: 350,
                      height: 150,
                      resizeMode: "contain",
                    }
                  }
                />
            }
          </View>
        </View>
      </View>


      <View style={{ flex: 1, marginVertical: 10 }}>
        {/* <Alimentacion/> */}
        <ShapeEditor pistolasTorque={pistolasTorque} imageUrl={imageLeaflet} activity={actividad} ubication={ubicacion} equipo={infoData.equipoSelected} job={tarea} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginTop: 12,
    padding: 14,
    borderRadius: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#777",
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: "600",
    color: "#0077b6",
  },
  field: {
    marginTop: 12,
    zIndex: 1,
  },
  label: {
    fontSize: 12,
    color: "#555",
    marginBottom: 4,
  },
  dropdown: {
    borderRadius: 8,
    borderColor: "#ddd",
  },
});