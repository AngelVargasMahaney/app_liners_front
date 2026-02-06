import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const crearActividadesIniciales = () => ([
  { id: Date.now().toString() + '-a1', nombre: 'Verificación de Pernos' },
  { id: Date.now().toString() + '-a2', nombre: 'Calibración Llave de Torque' },
  { id: Date.now().toString() + '-a3', nombre: 'Instalación de Rubber Backing' },
  { id: Date.now().toString() + '-a4', nombre: 'Auditoria de Pernos' }
])

const crearProyectosIniciales = () => ([
  {
    id: Date.now().toString() + '-p1',
    nombre: 'Instalación',
    actividades: crearActividadesIniciales()
  },
  {
    id: Date.now().toString() + '-p2',
    nombre: 'Retorqueo N°1',
    actividades: crearActividadesIniciales()
  },
  {
    id: Date.now().toString() + '-p3',
    nombre: 'Retorqueo N°2',
    actividades: crearActividadesIniciales()
  }
])

const MainAdmin = () => {
  const [campanias, setCampanias] = useState([])
  const [modalCampania, setModalCampania] = useState(false)

  const [nombreCampania, setNombreCampania] = useState('')
  const [mes, setMes] = useState('Enero')

  const [modalNombre, setModalNombre] = useState(false)
  const [tipoNuevo, setTipoNuevo] = useState(null) // proyecto | actividad
  const [nombreNuevo, setNombreNuevo] = useState('')
  const [campaniaActual, setCampaniaActual] = useState(null)
  const [proyectoActual, setProyectoActual] = useState(null)

  // ---------------- CAMPAÑA ----------------

  const agregarCampania = () => {
    if (!nombreCampania.trim()) return

    setCampanias(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        nombre: nombreCampania,
        mes,
        proyectos: crearProyectosIniciales()
      }
    ])

    setNombreCampania('')
    setMes('Enero')
    setModalCampania(false)
  }

  const eliminarCampania = (id) => {
    setCampanias(prev => prev.filter(c => c.id !== id))
  }

  // ---------------- MODAL NOMBRE ----------------

  const abrirModalProyecto = (campaniaId) => {
    setTipoNuevo('proyecto')
    setCampaniaActual(campaniaId)
    setProyectoActual(null)
    setNombreNuevo('')
    setModalNombre(true)
  }

  const abrirModalActividad = (campaniaId, proyectoId) => {
    setTipoNuevo('actividad')
    setCampaniaActual(campaniaId)
    setProyectoActual(proyectoId)
    setNombreNuevo('')
    setModalNombre(true)
  }

  const guardarNuevoItem = () => {
    if (!nombreNuevo.trim()) return

    if (tipoNuevo === 'proyecto') {
      setCampanias(prev =>
        prev.map(c =>
          c.id === campaniaActual
            ? {
                ...c,
                proyectos: [
                  ...c.proyectos,
                  {
                    id: Date.now().toString(),
                    nombre: nombreNuevo,
                    actividades: crearActividadesIniciales()
                  }
                ]
              }
            : c
        )
      )
    }

    if (tipoNuevo === 'actividad') {
      setCampanias(prev =>
        prev.map(c =>
          c.id === campaniaActual
            ? {
                ...c,
                proyectos: c.proyectos.map(p =>
                  p.id === proyectoActual
                    ? {
                        ...p,
                        actividades: [
                          ...p.actividades,
                          {
                            id: Date.now().toString(),
                            nombre: nombreNuevo
                          }
                        ]
                      }
                    : p
                )
              }
            : c
        )
      )
    }

    setModalNombre(false)
  }

  // ---------------- ELIMINAR ----------------

  const eliminarProyecto = (campaniaId, proyectoId) => {
    setCampanias(prev =>
      prev.map(c =>
        c.id === campaniaId
          ? { ...c, proyectos: c.proyectos.filter(p => p.id !== proyectoId) }
          : c
      )
    )
  }

  const eliminarActividad = (campaniaId, proyectoId, actividadId) => {
    setCampanias(prev =>
      prev.map(c =>
        c.id === campaniaId
          ? {
              ...c,
              proyectos: c.proyectos.map(p =>
                p.id === proyectoId
                  ? {
                      ...p,
                      actividades: p.actividades.filter(a => a.id !== actividadId)
                    }
                  : p
              )
            }
          : c
      )
    )
  }

  // ---------------- RENDER ----------------

  const renderItem = ({ item }) => (
    <View style={styles.campania}>
      <View style={styles.rowBetween}>
        <Text style={styles.campaniaTitle}>{item.nombre}</Text>
        <TouchableOpacity onPress={() => eliminarCampania(item.id)}>
          <Text style={styles.delete}>Eliminar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.mes}>Mes: {item.mes}</Text>

      {item.proyectos.map(proyecto => (
        <View key={proyecto.id} style={styles.proyecto}>
          <View style={styles.rowBetween}>
            <Text style={styles.proyectoText}>• {proyecto.nombre}</Text>
            <TouchableOpacity
              onPress={() => eliminarProyecto(item.id, proyecto.id)}
            >
              <Text style={styles.deleteSmall}>X</Text>
            </TouchableOpacity>
          </View>

          {proyecto.actividades.map(act => (
            <View key={act.id} style={styles.actividadRow}>
              <Text style={styles.actividadText}>└ {act.nombre}</Text>
              <TouchableOpacity
                onPress={() =>
                  eliminarActividad(item.id, proyecto.id, act.id)
                }
              >
                <Text style={styles.deleteSmall}>X</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            onPress={() => abrirModalActividad(item.id, proyecto.id)}
          >
            <Text style={styles.addMini}>+ Agregar Actividad</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={() => abrirModalProyecto(item.id)}>
        <Text style={styles.addMini}>+ Agregar Proyecto</Text>
      </TouchableOpacity>
    </View>
  )

  console.log("CAMPAÑASS", campanias)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campañas</Text>

      <FlatList
        data={campanias}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay campañas</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalCampania(true)}
      >
        <Text style={styles.addText}>Agregar Campaña</Text>
      </TouchableOpacity>

      {/* MODAL CAMPAÑA */}
      <Modal visible={modalCampania} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Campaña</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombreCampania}
              onChangeText={setNombreCampania}
            />

            <Picker selectedValue={mes} onValueChange={setMes}>
              {meses.map(m => (
                <Picker.Item key={m} label={m} value={m} />
              ))}
            </Picker>

            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setModalCampania(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={agregarCampania}>
                <Text style={styles.save}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL PROYECTO / ACTIVIDAD */}
      <Modal visible={modalNombre} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {tipoNuevo === 'proyecto' ? 'Nuevo Proyecto' : 'Nueva Actividad'}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombreNuevo}
              onChangeText={setNombreNuevo}
            />

            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setModalNombre(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={guardarNuevoItem}>
                <Text style={styles.save}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MainAdmin

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  empty: { textAlign: 'center', marginTop: 40 },

  campania: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12
  },

  campaniaTitle: { fontWeight: 'bold', fontSize: 16 },
  mes: { fontSize: 12, color: '#555' },

  proyecto: { marginLeft: 12, marginTop: 8 },
  proyectoText: { fontWeight: '600' },

  actividadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 12
  },
  actividadText: { fontSize: 12 },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  addButton: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center'
  },
  addText: { color: '#fff', fontWeight: 'bold' },

  addMini: { color: '#007bff', fontSize: 12, marginTop: 4 },

  delete: { color: 'red' },
  deleteSmall: { color: 'red', fontSize: 12 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 16,
    borderRadius: 8
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8
  },
  cancel: { color: '#555' },
  save: { color: '#007bff', fontWeight: 'bold' }
})
