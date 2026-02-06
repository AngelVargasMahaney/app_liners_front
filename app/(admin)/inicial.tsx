import { useRegistroStore } from '@/store/useRegistroStore'
import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

/* ---------------- CONSTANTES ---------------- */

const PROYECTOS_BASE = [
  'Instalación',
  'Retorqueo N°1',
  'Retorqueo N°2'
]

const ACTIVIDADES_BASE = [
  'Verificación de pernos',
  'Calibración llave de torque',
  'Instalación de rubber backing',
  'Auditoría de pernos'
]

const ACTIVIDAD_AUDITORIA = 'Auditoría de pernos'

const EQUIPOS = [
  { id: '1', nombre: 'EQ 1' },
  { id: '2', nombre: 'EQ 2' },
  { id: '3', nombre: 'EQ 3' }
]

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril',
  'Mayo', 'Junio', 'Julio', 'Agosto',
  'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

/* ---------------- HELPERS ---------------- */

const crearActividadesBase = () =>
  ACTIVIDADES_BASE.map(nombre => ({
    id: Date.now().toString() + Math.random(),
    nombre
  }))

const crearProyectosBase = () =>
  PROYECTOS_BASE.map(nombre => ({
    id: Date.now().toString() + Math.random(),
    nombre,
    actividades: crearActividadesBase()
  }))

/* ---------------- COMPONENT ---------------- */

const MainAdmin = () => {
  const { infoData, setInfoData } = useRegistroStore()
  const {
    campanias = [],
    campaniaSeleccionada,
    equipoSeleccionado,

    proyectos = [],
    proyectoSeleccionado,

    actividades = [],
    actividadSeleccionada,

    datosAuditoria = {
      nombre: '',
      fechaInicio: '',
      fechaFin: '',
      tension: '',
      torque: '',
      adjuntos: []
    }
  } = infoData

  const [modalCampania, setModalCampania] = useState(false)
  const [modalProyecto, setModalProyecto] = useState(false)
  const [modalActividad, setModalActividad] = useState(false)

  const [nombreCampania, setNombreCampania] = useState('')
  const [nombreProyecto, setNombreProyecto] = useState('')
  const [nombreActividad, setNombreActividad] = useState('')
  const [mes, setMes] = useState('Enero')

  /* -------- CAMPAÑAS -------- */

  const agregarCampania = () => {
    if (!nombreCampania.trim()) return

    setInfoData({
      campanias: [
        ...campanias,
        {
          id: Date.now().toString(),
          nombre: nombreCampania,
          mes,
          proyectos: crearProyectosBase()
        }
      ]
    })

    setNombreCampania('')
    setModalCampania(false)
  }

  const seleccionarCampania = (id) => {
    const camp = campanias.find(c => c.id === id)

    setInfoData({
      campaniaSeleccionada: id,
      equipoSeleccionado: null,
      proyectos: camp?.proyectos || [],
      proyectoSeleccionado: null,
      actividades: [],
      actividadSeleccionada: null,
      datosAuditoria: {}
    })
  }

  const eliminarCampania = (id) => {
    setInfoData({
      campanias: campanias.filter(c => c.id !== id),
      campaniaSeleccionada: null,
      equipoSeleccionado: null,
      proyectos: [],
      proyectoSeleccionado: null,
      actividades: [],
      actividadSeleccionada: null,
      datosAuditoria: {}
    })
  }

  /* -------- EQUIPO -------- */

  const seleccionarEquipo = (id) => {
    setInfoData({
      equipoSeleccionado: id,
      proyectoSeleccionado: null,
      actividades: [],
      actividadSeleccionada: null,
      datosAuditoria: {}
    })
  }

  /* -------- PROYECTOS -------- */

  const seleccionarProyecto = (id) => {
    const proj = proyectos.find(p => p.id === id)

    setInfoData({
      proyectoSeleccionado: id,
      actividades: proj?.actividades || [],
      actividadSeleccionada: null,
      datosAuditoria: {}
    })
  }

  const agregarProyecto = () => {
    if (!nombreProyecto.trim()) return

    setInfoData({
      proyectos: [
        ...proyectos,
        {
          id: Date.now().toString(),
          nombre: nombreProyecto,
          actividades: crearActividadesBase()
        }
      ]
    })

    setNombreProyecto('')
    setModalProyecto(false)
  }

  const eliminarProyecto = (id) => {
    setInfoData({
      proyectos: proyectos.filter(p => p.id !== id),
      proyectoSeleccionado: null,
      actividades: [],
      actividadSeleccionada: null,
      datosAuditoria: {}
    })
  }

  /* -------- ACTIVIDADES -------- */

  const seleccionarActividad = (id) => {
    const act = actividades.find(a => a.id === id)

    setInfoData({
      actividadSeleccionada: id,
      datosAuditoria:
        act?.nombre === ACTIVIDAD_AUDITORIA
          ? {
              nombre: '',
              fechaInicio: '',
              fechaFin: '',
              tension: '',
              torque: '',
              adjuntos: []
            }
          : {}
    })
  }

  const agregarActividad = () => {
    if (!nombreActividad.trim()) return

    setInfoData({
      actividades: [
        ...actividades,
        { id: Date.now().toString(), nombre: nombreActividad }
      ]
    })

    setNombreActividad('')
    setModalActividad(false)
  }

  const eliminarActividad = (id) => {
    setInfoData({
      actividades: actividades.filter(a => a.id !== id),
      actividadSeleccionada: null,
      datosAuditoria: {}
    })
  }

  /* -------- UI HELPERS -------- */

  const renderCard = (item, selected, onPress, onDelete) => (
    <View key={item.id} style={styles.cardWrapper}>
      <TouchableOpacity
        style={[styles.card, selected && styles.cardSelected]}
        onPress={onPress}
      >
        <Text style={styles.cardText}>{item.nombre}</Text>
      </TouchableOpacity>

      {onDelete && (
        <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
          <Text style={styles.deleteText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>APP LINERS</Text>

      {/* CAMPAÑAS */}
      <Text style={styles.sectionTitle}>Campañas</Text>
      <View style={styles.row}>
        {campanias.map(c =>
          renderCard(
            c,
            c.id === campaniaSeleccionada,
            () => seleccionarCampania(c.id),
            () => eliminarCampania(c.id)
          )
        )}
        <TouchableOpacity
          style={[styles.card, styles.addCard]}
          onPress={() => setModalCampania(true)}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* EQUIPOS */}
      {campaniaSeleccionada && (
        <>
          <Text style={styles.sectionTitle}>Equipos</Text>
          <View style={styles.row}>
            {EQUIPOS.map(eq =>
              renderCard(
                eq,
                eq.id === equipoSeleccionado,
                () => seleccionarEquipo(eq.id)
              )
            )}
          </View>
        </>
      )}

      {/* PROYECTOS */}
      {equipoSeleccionado && (
        <>
          <Text style={styles.sectionTitle}>Proyectos</Text>
          <View style={styles.row}>
            {proyectos.map(p =>
              renderCard(
                p,
                p.id === proyectoSeleccionado,
                () => seleccionarProyecto(p.id),
                () => eliminarProyecto(p.id)
              )
            )}
            <TouchableOpacity
              style={[styles.card, styles.addCard]}
              onPress={() => setModalProyecto(true)}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* ACTIVIDADES */}
      {proyectoSeleccionado && (
        <>
          <Text style={styles.sectionTitle}>Actividades</Text>
          <View style={styles.row}>
            {actividades.map(a =>
              renderCard(
                a,
                a.id === actividadSeleccionada,
                () => seleccionarActividad(a.id),
                () => eliminarActividad(a.id)
              )
            )}
            <TouchableOpacity
              style={[styles.card, styles.addCard]}
              onPress={() => setModalActividad(true)}
            >
              <Text style={styles.addText}>+</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* FORMULARIO AUDITORÍA */}
      {actividadSeleccionada &&
        actividades.find(a => a.id === actividadSeleccionada)?.nombre ===
          ACTIVIDAD_AUDITORIA && (
          <View style={styles.auditContainer}>
            <Text style={styles.auditTitle}>Datos Auditoría</Text>

            {['nombre', 'fechaInicio', 'fechaFin', 'tension', 'torque'].map(
              field => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field}
                  value={datosAuditoria[field]}
                  onChangeText={v =>
                    setInfoData({
                      datosAuditoria: { ...datosAuditoria, [field]: v }
                    })
                  }
                />
              )
            )}

            <TouchableOpacity style={styles.attachBtn}>
              <Text style={styles.attachText}>Adjuntar archivo</Text>
            </TouchableOpacity>
          </View>
        )}

      {/* MODALES */}
      {/* Campaña */}
      <Modal visible={modalCampania} transparent animationType="fade">
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

      {/* Proyecto */}
      <Modal visible={modalProyecto} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Proyecto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombreProyecto}
              onChangeText={setNombreProyecto}
            />
            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setModalProyecto(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={agregarProyecto}>
                <Text style={styles.save}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Actividad */}
      <Modal visible={modalActividad} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nueva Actividad</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombreActividad}
              onChangeText={setNombreActividad}
            />
            <View style={styles.rowBetween}>
              <TouchableOpacity onPress={() => setModalActividad(false)}>
                <Text style={styles.cancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={agregarActividad}>
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

/* ---------------- STYLES ---------------- */

const CARD_SIZE = 100

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  appTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },

  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    flexWrap: 'wrap'
  },

  cardWrapper: { position: 'relative' },

  card: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },

  cardSelected: {
    backgroundColor: '#8b0015',
    borderColor: '#8b0015'
  },

  cardText: { fontWeight: 'bold' },

  deleteBtn: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#000',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },

  deleteText: { color: '#fff', fontWeight: 'bold' },

  addCard: {
    borderStyle: 'dashed',
    borderColor: '#555'
  },

  addText: { fontSize: 36 },

  auditContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 32
  },

  auditTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8
  },

  attachBtn: {
    marginTop: 8,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center'
  },

  attachText: { fontWeight: 'bold' },

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

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  cancel: { color: '#555' },
  save: { color: '#007bff', fontWeight: 'bold' }
})
