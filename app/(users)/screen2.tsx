import { getActByProjectEq, getEquipments, getJobs, getPistolasTorque, getPistolasTorqueById, getUbications, putPistolaTorque } from '@/api/client';
import { useRegistroStore } from '@/store/useRegistroStore';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
          value: obj.name
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
  const [colorOpen, setColorOpen] = useState(false);
  const [pistolaOpen, setPistolaOpen] = useState(false);
  const [tarea, setTarea] = useState(null);
  const [color, setColor] = useState(null);
  const [pistolaSerie, setPistolaSerie] = useState(null);
  // const [tareaItems, setTareaItems] = useState([
  //   { label: "Instalación de Pernos", value: "instalacion" },
  //   { label: "Rubber Baking", value: "rubber" },
  //   { label: "Sensores", value: "sensores" },
  // ]);

  const [tareaItems, setTareaItems] = useState(null)
  const [colorItems, setColorItems] = useState<any>(null)

  const getColorSag = () => {
    const colorsAlimentacion = [
      { label: "Rojo", value: "44-0" },
      { label: "Verde", value: "44-1" },
      { label: "Rosado", value: "44-2" },
      { label: "Blanco", value: "88-3" },
      { label: "Sin Color", value: "44-4" }
    ]
    const colorsShell = [
      { label: "Rosado", value: "65-0" },
      { label: "Morado", value: "65-1" },
      { label: "Sin Color", value: "389-2" }
    ]
    const colorsDescarga = [
      { label: "Rojo", value: "44-0" },
      { label: "Azul", value: "44-1" },
      { label: "Verde", value: "44-2" },
      { label: "Amarillo", value: "44-3" },
      { label: "Celeste", value: "44-4" },
      { label: "Blanco", value: "66-5" },
      { label: "Café", value: "44-6" },
      { label: "Dorado", value: "44-7" },
      { label: "Naranja", value: "44-8" },
      { label: "Rosado", value: "22-9" },
    ]

    if (ubicacion === 1) {
      setColorItems(colorsShell)
    } else if (ubicacion === 2) {
      setColorItems(colorsAlimentacion)
    } else {
      setColorItems(colorsDescarga)
    }

  }
  const getColorBolas = () => {
    const colorsAlimentacion = [
      { label: "Azul", value: "24-0" },
      { label: "Negro", value: "24-1" },
      { label: "Celeste", value: "24-2" },
      { label: "Blanco", value: "24-3" },
      { label: "Sin Color", value: "20-4" },
    ]
    const colorsShell = [
      { label: "Rojo", value: "52-0" },
      { label: "Amarillo", value: "52-1" },
      { label: "Sin Color", value: "780-2" },
    ]
    const colorsDescarga = [
      { label: "Azul", value: "24-0" },
      { label: "Negro", value: "24-1" },
      { label: "Celeste", value: "24-2" },
      { label: "Blanco", value: "24-3" },
      { label: "Sin Color", value: "20-4" },
    ]
    if (ubicacion === 1) {
      setColorItems(colorsShell)
    } else if (ubicacion === 2) {
      setColorItems(colorsAlimentacion)
    } else {
      setColorItems(colorsDescarga)
    }
  }

  useEffect(() => {
    if (ubicacion !== null) {
      if (infoData.equipoSelected === 1) {
        getColorSag()
      } else {
        getColorBolas()
      }
    }
  }, [ubicacion, infoData.equipoSelected])


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
      // console.log(response);
      setEquipments(response)

    } catch (error) {
      console.log("ERrror", error)
    }
  }

  const [pistolasTorque, setPistolasTorque] = useState(null)
  const [pistolasTorqueItems, setPistolasTorqueItems] = useState(null)

  console.log("ubicacion", ubicacion);


  const apiGetPistols = async () => {
    try {
      const response = await getPistolasTorque()

      const rs = response.filter((obj2) => obj2.ubicacion === ubicacion).map((obj: any) => {
        return {
          label: obj.serial_number,
          value: obj.id
        }
      })
      setPistolasTorqueItems(rs)
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
  }, [infoData, ubicacion])



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

  const [pernosValue, setPernosValue] = useState({
    totalCampo: 0,
    noDimentions: 0,
    oxido: 0,
    hiloDanado: 0,
    tuercaDanada: 0,
    pernosOp: 0,
  })

  const handlePernosOp = () => {
    const rsp = pernosValue.totalCampo - (pernosValue.noDimentions + pernosValue.oxido + pernosValue.hiloDanado + pernosValue.tuercaDanada)
    setPernosValue({
      ...pernosValue,
      pernosOp: rsp
    })
  }

  useEffect(() => {
    handlePernosOp()
  }, [pernosValue.totalCampo, pernosValue.noDimentions, pernosValue.oxido, pernosValue.hiloDanado, pernosValue.tuercaDanada])



  const Row = ({
    label,
    value,
    onChange,
    bgLeft = "#d9d9d9",
    bgRight = "#fff",
    editable = false
  }) => {
    return (
      <View style={styles.row}>
        <View style={[styles.leftCell, { backgroundColor: bgLeft }]}>
          <Text style={styles.label}>{label}</Text>
        </View>

        <View style={[styles.rightCell, { backgroundColor: bgRight }]}>
          {editable ? (
            <TextInput
              style={styles.input}
              value={value?.toString()}
              onChangeText={onChange}
              placeholderTextColor="#000"
            />
          ) : (
            <Text style={styles.value}>{value}</Text>
          )}
        </View>
      </View>
    );
  };


  console.log("PISTOLA TORQUE SERIE", pistolaSerie);

  const [pistolaInfo, setPistolaInfo] = useState(null)

  const [pistolasHistory, setPistolasHistory] = useState(null)

  const apiGetPistolaById = async () => {
    try {
      const resp = await getPistolasTorqueById(Number(pistolaSerie))
      setPistolaInfo(resp.data)
      // console.log("MY RESSPE", resp.data);
      setPistolasHistory(resp.history)
      console.log("MY RESSPE historu", resp.history);

    } catch (error) {
      console.log("MY RERROR", error)
    }
  }

  useEffect(() => {
    if (pistolaSerie !== null) {
      apiGetPistolaById()
    }
  }, [pistolaSerie])

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

  const apiPutPistola = async () => {
    const sendInfoPistola = {
      ...pistolaInfo,
      calibration_date: formatDateForDjango(new Date()),
      calibration_time: formatTimeForDjango(new Date())
    }
    try {
      const response = await putPistolaTorque(Number(pistolaSerie), sendInfoPistola)
      alert('Pistola editada correctamente')
    } catch (error) {
      console.log("ERR", error)
    }
  }

  const handleChange = (field, value) => {
    setPistolaInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const loadHistoryRecord = (record) => {
    const { history_id, history_date, history_type, ...cleanRecord } = record;
    setPistolaInfo(cleanRecord);
  };


  const [pernosVerif, setPernosVerif] = useState(null)
  const [pernosVerifHistory, setPernosVerifHistory] = useState(null)

  // console.log("RJOARJWOAJROAW", colorItems.find((obj)=>obj.value==color));
  

  // const apiGetPernosVerif = async () =>{
  //   try {
  //     const response = await getPernosVerifByData(infoData.equipoSelected, ubicacion,)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  const handleChangePernosVerif = (field, value) => {
    setPistolaInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const loadHistoryRecordPernosVerif = (record) => {
    const { history_id, history_date, history_type, ...cleanRecord } = record;
    setPistolaInfo(cleanRecord);
  };

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

          {
            actividad === 'Calibración de llaves' ? null : actividad === 'Verificación de pernos' ? null : <View>
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
          }
        </View>
      </View>

      {
        actividad === 'Calibración de llaves' ?
          <ScrollView>
            <View style={{ backgroundColor: '#00b0f0', justifyContent: 'center', alignItems: 'center', paddingVertical: 8, marginVertical: 8 }}>
              <Text style={{ color: 'white' }}>Calibración llaves de Torque</Text>
            </View>
            <Row label="Empresa a cargo:" value={pistolaInfo?.company_in_charge} bgRight="#fff200" editable />
            <Row label="Fabricante:" value={pistolaInfo?.manufacturer} bgRight="#fff200" editable />
            <Row label="Modelo:" value={pistolaInfo?.model} bgRight="#fff200" editable />

            {/* <Row label="N° Serie:" value="Llenado en campo" bgRight="#fff200" editable /> */}
            <View style={styles.row}>
              <View style={[styles.leftCell, { backgroundColor: '#d9d9d9' }]}>
                <Text style={styles.label}>N° serie</Text>
              </View>
              <View style={styles.rightCell}>
                {
                  pistolasTorqueItems !== null ?
                    <DropDownPicker
                      open={pistolaOpen}
                      value={pistolaSerie}
                      items={pistolasTorqueItems}
                      setOpen={(open) => {
                        setPistolaOpen(open);
                        // setUbicacionOpen(false);
                      }}
                      setValue={setPistolaSerie}
                      setItems={setPistolasTorqueItems}
                      placeholder="Seleccionar pistola"
                      style={styles.dropdown}
                    /> : null
                }
              </View>
            </View>

            <Row label="N° Certificado calibración:" value={pistolaInfo?.calibration_cert} bgRight="#fff200" editable />
            <Row label="Calibración N°:" value={pistolaInfo?.calibration_number} bgRight="#fff200" editable />

            <Row
              label="Tensión indicada por el Fabricante:"
              value={pistolaInfo?.tension_by_manufacturer}
              bgLeft="#00b050"
              bgRight="#00b050"
            />

            <Row
              label="Torque aprox indicado por Fabricante:"
              value={pistolaInfo?.torque_by_manufacturer}
              bgLeft="#00b050"
              bgRight="#00b050"
            />

            <Row label="Giro N°" value={pistolaInfo?.giro_number} onChange={(value) => handleChange('giro_number', value)} bgRight="#fff200" editable />

            <Row
              label="Torque seteado en campo:"
              value={pistolaInfo?.torque_in_field}
              bgLeft="#f4b183"
              bgRight="#f4b183"
              editable
              onChange={(value) => handleChange('torque_in_field', value)}
            />

            <Row
              label="Tensión obtenida en banco de prueba:"
              value={pistolaInfo?.tension_by_test_bench}
              onChange={(value) => handleChange('tension_by_test_bench', value)}
              bgLeft="#f4b183"
              bgRight="#f4b183"
              editable
            />

            <Row
              label="Fecha de Calibración del Equipo"
              value={pistolaInfo?.calibration_date}
              bgLeft="#00b050"
              bgRight="#00b050"
            />

            <Row
              label="Hora de Calibración del Equipo"
              value={pistolaInfo?.calibration_time}
              bgLeft="#00b050"
              bgRight="#00b050"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 10 }}>
              {
                pistolasHistory !== null ?
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    {
                      pistolasHistory.map((obj, index) => {
                        return (
                          <TouchableOpacity onPress={() => {
                            loadHistoryRecord(obj)
                          }} style={{ flexDirection: 'column', backgroundColor: '#4ba49d', padding: 4, borderRadius: 3 }} key={index}>
                            <Text>Registro N° {index + 1}</Text>
                            <Text>Fecha: {obj.calibration_date}</Text>
                            <Text>Hora: {obj.calibration_time}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View> : null
              }
              <View>
                <TouchableOpacity
                  onPress={() => {
                    apiPutPistola()
                  }}
                  style={{
                    backgroundColor: '#00b0f0',
                    width: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                    borderRadius: 2,
                  }}>
                  <Text>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
          : actividad === 'Verificación de pernos' ? <View style={{ zIndex: 1000, marginTop: 10 }}>
            {/* <Text>{JSON.stringify(infoData)}</Text>
          <Text>Ubicacion {JSON.stringify(ubicacion)}</Text> */}
            <View >
              <Text style={styles.label}>Elija el color</Text>
              {
                colorItems !== null ?
                  <DropDownPicker
                    open={colorOpen}
                    value={color}
                    items={colorItems}
                    setOpen={(open) => {
                      setColorOpen(open);
                      setUbicacionOpen(false);
                    }}
                    setValue={setColor}
                    setItems={setColorItems}
                    placeholder="Seleccionar un color"
                    style={styles.dropdown}
                  /> : null
              }
              <View style={{ marginVertical: 5 }}>
                <Text style={styles.label}>Total(auto)</Text>
                <TextInput editable={false} value={color?.split('-')[0]} style={[styles.input, { backgroundColor: '#eee', color: '#aaa' }]} />
              </View>
              <View>
                <Text style={styles.label}>Total(campo)</Text>
                <TextInput keyboardType='number-pad' onChangeText={(value) => setPernosValue({
                  ...pernosValue,
                  totalCampo: Number(value)
                })} style={styles.input} />
              </View>
              <View style={{ marginVertical: 4 }}>
                <Text style={{ fontWeight: '800' }}>Observados</Text>
                <View style={{
                  marginVertical: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Text style={{ flex: 0.25 }}>No cumple dimensiones</Text>
                  <TextInput keyboardType='number-pad' onChangeText={(value) => setPernosValue({
                    ...pernosValue,
                    noDimentions: Number(value)
                  })} style={[styles.input, { flex: 0.75 }]} />
                </View>
                <View style={{
                  marginVertical: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Text style={{ flex: 0.25 }}>Presenta óxido</Text>
                  <TextInput onChangeText={(value) => setPernosValue({
                    ...pernosValue,
                    oxido: Number(value)
                  })} keyboardType='number-pad' style={[styles.input, { flex: 0.75 }]} />
                </View>
                <View style={{
                  marginVertical: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Text style={{ flex: 0.25 }}>Hilo dañado</Text>
                  <TextInput onChangeText={(value) => setPernosValue({
                    ...pernosValue,
                    hiloDanado: Number(value)
                  })} keyboardType='number-pad' style={[styles.input, { flex: 0.75 }]} />
                </View>
                <View style={{
                  marginVertical: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <Text style={{ flex: 0.25 }}>Tuerca dañada</Text>
                  <TextInput onChangeText={(value) => setPernosValue({
                    ...pernosValue,
                    tuercaDanada: Number(value)
                  })} keyboardType='number-pad' style={[styles.input, { flex: 0.75 }]} />
                </View>
              </View>
              <View style={{
                marginVertical: 4, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <Text style={{ flex: 0.25 }}>Pernos operativos - Total(auto)</Text>
                <TextInput value={String(pernosValue.pernosOp)} editable={false} style={[styles.input, { flex: 0.75, backgroundColor: '#eee', color: '#aaa' }]} />
              </View>
              <View style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Image source={require("../../assets/images/perno.png")} style={styles.image} />
              </View>
            </View>
            <View>
              {/* <TouchableOpacity
                onPress={() => {
                  console.log("A")
                }}
                style={{
                  backgroundColor: '#00b0f0',
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                  borderRadius: 2,
                }}>
                <Text>Guardar</Text>
              </TouchableOpacity> */}
            </View>
          </View> :
            <View style={{ flex: 1, marginVertical: 10 }}>
              {/* <Alimentacion/> */}
              <ShapeEditor pistolasTorque={pistolasTorque} imageUrl={imageLeaflet} activity={actividad} ubication={ubicacion} equipo={infoData.equipoSelected} job={tarea} />
            </View>
      }
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    width: 525,
    height: 275,
    resizeMode: "contain",
  },
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
  input: {
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: 'white',
    padding: 7
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  leftCell: {
    flex: 1.2,
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  rightCell: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
});