// import React, { useEffect, useRef } from "react";
// import { StyleSheet, View } from "react-native";
// import { WebView } from "react-native-webview";

// export default function App() {
//   const webviewRef = useRef(null);

//   const html = `
// <!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">

//   <link 
//     rel="stylesheet" 
//     href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
//   />
//   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

//   <style>
//     html, body, #map {
//       margin: 0;
//       padding: 0;
//       height: 100%;
//       width: 100%;
//       overflow: hidden;
//     }

//     #customModal {
//       position: absolute;
//       width: 260px;
//       background: white;
//       padding: 15px;
//       border-radius: 6px;
//       box-shadow: 0 4px 12px rgba(0,0,0,0.25);
//       display: none;
//       z-index: 2000;
//       font-family: sans-serif;
//       border: 1px solid #bbb;
//     }

//     #customModal label {
//       font-size: 12px;
//       font-weight: bold;
//     }

//     #customModal input,
//     #customModal select,
//     #customModal textarea {
//       width: 100%;
//       margin-top: 4px;
//       margin-bottom: 10px;
//       padding: 4px;
//       border: 1px solid #ccc;
//       border-radius: 4px;
//       font-size: 12px;
//     }

//     #modalButtons {
//       display: flex;
//       justify-content: space-between;
//       margin-top: 10px;
//     }

//     #btnAceptar {
//       background: #55c3ff;
//       padding: 5px 12px;
//       border-radius: 4px;
//       color: white;
//       border: none;
//     }

//     #btnCancelar {
//       background: #ccc;
//       padding: 5px 12px;
//       border-radius: 4px;
//       border: none;
//     }
//   </style>
// </head>

// <body>
//   <div id="map"></div>

//   <div id="customModal">
//     <label>Item:</label>
//     <input id="itemField" type="text" />

//     <label>Status:</label>
//     <select id="statusField">
//       <option>Perno Electmetal</option>
//       <option>Perno Revisado</option>
//       <option>Otro</option>
//     </select>

//     <label>Valor:</label>
//     <input id="valorField" type="text" />

//     <label>Observaciones:</label>
//     <textarea id="obsField" rows="3"></textarea>

//     <div id="modalButtons">
//       <button id="btnAceptar">Aceptar</button>
//       <button id="btnCancelar">Cancelar</button>
//     </div>
//   </div>

//   <script>

//     console.log("HTML cargado!");

//     var map = L.map('map', {
//       crs: L.CRS.Simple,
//       minZoom: -4,
//     });

//     var w = 1200;
//     var h = 800;
//     var bounds = [[0,0], [h,w]];

//     L.imageOverlay(
//       'https://almdigital1.blob.core.windows.net/tove/entity_images/30179/PFD_General_5_TOVE_V2.jpg',
//       bounds
//     ).addTo(map);

//     map.fitBounds(bounds);

//     const modal = document.getElementById("customModal");

//     let points = [];
//     let selectedPoint = null;

//     function openModalAt(latlng, pointData) {
//       const screenPos = map.latLngToContainerPoint(latlng);
//       modal.style.left = screenPos.x + 10 + "px";
//       modal.style.top = screenPos.y + 10 + "px";

//       document.getElementById("itemField").value = pointData.item || "";
//       document.getElementById("statusField").value = pointData.status || "Perno Electmetal";
//       document.getElementById("valorField").value = pointData.valor || "";
//       document.getElementById("obsField").value = pointData.obs || "";

//       modal.style.display = "block";
//     }

//     // --------------------------
//     // LISTENERS Android + iOS
//     // --------------------------

//     function handleMessage(event) {
//       try {
//         const msg = JSON.parse(event.data);
//         console.log("WebView recibió:", msg);

//         if (msg.type === "LOAD_POINTS") {
//           loadPoints(msg.puntos);
//         }

//       } catch (e) {
//         console.log("Error procesando mensaje:", e);
//       }
//     }

//     document.addEventListener("message", handleMessage); // Android
//     window.addEventListener("message", handleMessage);   // iOS

//     // --------------------------
//     // FUNCION PARA AGREGAR PUNTOS
//     // --------------------------
//     function loadPoints(puntos) {
//       console.log("Cargando puntos:", puntos);

//       puntos.forEach(data => {

//         const marker = L.circleMarker([data.lat, data.lng], {
//           radius: 12,
//           color: "red",
//           fillColor: "red",
//           fillOpacity: 1
//         }).addTo(map);

//         data.marker = marker;

//         marker.on("click", function(evt) {
//           selectedPoint = data;
//           openModalAt(evt.latlng, data);
//         });

//         points.push(data);
//       });
//     }

//     document.getElementById("btnCancelar").onclick = function() {
//       modal.style.display = "none";
//     };

//     document.getElementById("btnAceptar").onclick = function() {
//       if (!selectedPoint) return;

//       selectedPoint.item = document.getElementById("itemField").value;
//       selectedPoint.status = document.getElementById("statusField").value;
//       selectedPoint.valor = document.getElementById("valorField").value;
//       selectedPoint.obs = document.getElementById("obsField").value;

//       window.ReactNativeWebView.postMessage(JSON.stringify({
//         type: "POINT_UPDATED",
//         data: selectedPoint
//       }));

//       modal.style.display = "none";
//     };

//   </script>
// </body>
// </html>
// `;


//   useEffect(() => {
//     async function fetchPoints() {
//       const puntos = [
//         { lat: 532.12, lng: 244.55, item: "Punto A", status: "Perno Electmetal", valor: "10", obs: "Obs A" },
//         { lat: 123.88, lng: 880.10, item: "Punto B", status: "Perno Revisado", valor: "22", obs: "Obs B" }
//       ];

//       setTimeout(() => {
//         console.log("Enviando puntos al WebView...");
//         webviewRef.current?.postMessage(
//           JSON.stringify({ type: "LOAD_POINTS", puntos })
//         );
//       }, 600);
//     }

//     fetchPoints();
//   }, []);

//   return (
//     <View style={{ flex: 1, backgroundColor:'white' }}>
//       <WebView
//         ref={webviewRef}
//         originWhitelist={["*"]}
//         source={{ html }}
//         javaScriptEnabled
//         domStorageEnabled
//         onMessage={(event) => {
//           const msg = JSON.parse(event.nativeEvent.data);
//           console.log("React Native recibió:", msg);

//           if (msg.type === "POINT_UPDATED") {
//             console.log("Punto editado:", msg.data);

//             // Api del baggend:3
//             // fetch("https://miapi.com/puntos/update", {
//             //   method: "POST",
//             //   headers: { "Content-Type": "application/json" },
//             //   body: JSON.stringify(msg.data)
//             // });
//           }
//         }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: "#222",
//   },
// });

import {
  createRegisterDetail,
  getActByProjectEq,
  getCurrentRegDetail,
  getEquipments,
  getJobs,
  getRegisterHeads,
  getUbications,
  updateRegisterDetail,
} from "@/api/client";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

export default function Index() {
  /* =======================
     ESTADOS
  ======================= */


  const [editingShapeId, setEditingShapeId] = useState<string | null>(null);

  const [registerHeads, setRegisterHeads] = useState<any[]>([]);
  const [headSelected, setHeadSelected] = useState<any | null>(null);

  const [activities, setActivities] = useState<any[]>([]);
  const [activitySelected, setActivitySelected] = useState<number | null>(null);

  const [ubications, setUbications] = useState<any[]>([]);
  const [ubicationSelected, setUbicationSelected] = useState<number | null>(null);

  const [jobs, setJobs] = useState<any[]>([]);
  const [jobSelected, setJobSelected] = useState<number | null>(null);

  const [equipments, setEquipments] = useState<any[]>([]);

  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [imageBounds, setImageBounds] = useState<any>(null);

  const [leaflet, setLeaflet] = useState<any>(null);

  const [shapes, setShapes] = useState<any[]>([]);
  const [draft, setDraft] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const featureGroupRef = useRef<any>(null);
  const tempLayerRef = useRef<any>(null);

  const [currentDetailId, setCurrentDetailId] = useState<number | null>(null);
  const loadExistingShapes = async () => {
    try {
      const res = await getCurrentRegDetail(headSelected.id, Number(activitySelected), Number(ubicationSelected), Number(jobSelected));
      console.log("MY RESSSS", res);

      if (!res.exists) {
        setShapes([]);
        setCurrentDetailId(null);
        return;
      }

      const parsed = JSON.parse(res.shape_information || "[]");

      setShapes(parsed);
      setCurrentDetailId(res.id);
    } catch (error) {
      console.error("Error cargando shapes", error);
      setShapes([]);
      setCurrentDetailId(null);
    }
  };

  useEffect(() => {
    if (
      !headSelected ||
      !activitySelected ||
      !ubicationSelected ||
      !jobSelected
    ) {
      setShapes([]);
      setCurrentDetailId(null);
      return;
    }

    loadExistingShapes();
  }, [headSelected, activitySelected, ubicationSelected, jobSelected]);

  console.log("MY SHAOES", shapes);


  /* =======================
     CARGA INICIAL
  ======================= */
  useEffect(() => {
    getRegisterHeads().then((res) =>
      setRegisterHeads(
        res.map((r: any) => ({
          id: r.id,
          label: {
            name: r.name,
            equipo: r.equipo,
            proyecto: r.proyecto.id,
          },
        }))
      )
    );

    getUbications().then((res) =>
      setUbications(res.map((u: any) => ({ value: u.id, label: u.name })))
    );

    getJobs().then((res) =>
      setJobs(res.map((j: any) => ({ value: j.id, label: j.name })))
    );

    getEquipments().then((res) => setEquipments(res));
  }, []);

  /* =======================
     LEAFLET LOADER
  ======================= */
  useEffect(() => {
    Promise.all([import("leaflet"), import("react-leaflet")]).then(
      async ([L, RL]) => {
        (window as any).L = L.default;
        await import("leaflet-draw");

        setLeaflet({
          L: L.default,
          MapContainer: RL.MapContainer,
          ImageOverlay: RL.ImageOverlay,
          useMap: RL.useMap,
        });
      }
    );
  }, []);

  /* =======================
     ACTIVIDADES POR HEAD
  ======================= */
  useEffect(() => {
    if (!headSelected) return;

    getActByProjectEq(
      headSelected.label.proyecto,
      headSelected.label.equipo
    ).then((res) =>
      setActivities(res.map((a: any) => ({ value: a.id, label: a.name })))
    );
  }, [headSelected]);

  /* =======================
     CARGA DE IMAGEN (OPCIÓN B)
  ======================= */
  useEffect(() => {
    if (!headSelected || !ubicationSelected || equipments.length === 0) {
      setOverlayImage(null);
      setImageBounds(null);
      return;
    }

    const equipment = equipments.find(
      (e) => e.id === headSelected.label.equipo
    );
    if (!equipment) return;

    const img = equipment.images.find(
      (i: any) => i.type === ubicationSelected
    );
    if (!img?.file) return;

    const image = new Image();
    image.onload = () => {
      setOverlayImage(img.file);
      setImageBounds([
        [0, 0],
        [image.naturalHeight, image.naturalWidth],
      ]);
    };
    image.src = img.file;
  }, [headSelected, ubicationSelected, equipments]);

  if (!leaflet) return null;

  /* =======================
     DRAW CONTROLLER
  ======================= */
  function DrawController() {
    const map = leaflet.useMap();

    useEffect(() => {
      const fg = leaflet.L.featureGroup();
      featureGroupRef.current = fg;
      map.addLayer(fg);

      const draw = new leaflet.L.Control.Draw({
        draw: {
          polygon: false,
          polyline: false,
          rectangle: false,
          marker: false,
          circlemarker: false,
          circle: true,
        },
        edit: { featureGroup: fg },
      });

      map.addControl(draw);

      map.on(leaflet.L.Draw.Event.CREATED, (e: any) => {
        const layer = e.layer;
        tempLayerRef.current = layer;

        const center = layer.getLatLng();

        setDraft({
          lat: center.lat,
          lng: center.lng,
          radius: layer.getRadius(),

          item: "",
          condicion: "",
          valor: "",
          perno: "",
          observacion: "",
        });

        setModalOpen(true);
      });

      return () => {
        map.removeControl(draw);
        map.removeLayer(fg);
      };
    }, [map]);

    useEffect(() => {
      if (!featureGroupRef.current) return;

      const fg = featureGroupRef.current;
      fg.clearLayers();

      shapes.forEach((s) => {
        const circle = leaflet.L.circle(
          [s.geometry.lat, s.geometry.lng],
          {
            radius: s.geometry.radius,
            color: "red",
            fillOpacity: 0.4,
          }
        );

        // 👉 CLICK EN SHAPE
        circle.on("click", () => {
          setDraft({
            lat: s.geometry.lat,
            lng: s.geometry.lng,
            radius: s.geometry.radius,

            item: s.meta.item,
            condicion: s.meta.condicion,
            valor: s.meta.valor,
            perno: s.meta.perno,
            observacion: s.meta.observacion,
          });

          setEditingShapeId(s.id);   // 👈 MODO EDICIÓN
          setModalOpen(true);
        });

        circle.addTo(fg);
      });
    }, [shapes]);

    return null;
  }

  /* =======================
     GUARDAR SHAPE
  ======================= */
  function saveShape() {
    if (!draft) return;

    if (editingShapeId) {
      // ✏️ EDITAR SHAPE
      setShapes((prev) =>
        prev.map((s) =>
          s.id === editingShapeId
            ? {
              ...s,
              meta: {
                item: draft.item,
                condicion: draft.condicion,
                valor: draft.valor,
                perno: draft.perno,
                observacion: draft.observacion,
              },
            }
            : s
        )
      );
    } else {
      // ➕ NUEVO SHAPE
      setShapes((prev) => [
        ...prev,
        {
          id: `c-${Date.now()}`,
          type: "circle",
          geometry: {
            lat: draft.lat,
            lng: draft.lng,
            radius: draft.radius,
          },
          meta: {
            item: draft.item,
            condicion: draft.condicion,
            valor: draft.valor,
            perno: draft.perno,
            observacion: draft.observacion,
          },
        },
      ]);
    }

    setEditingShapeId(null);
    setModalOpen(false);
  }

  /* =======================
     RENDER
  ======================= */

  const saveRegisterDetail = async () => {
    try {
      const payload = {
        register_head: headSelected.id,
        activity: activitySelected,
        ubication: ubicationSelected,
        job: jobSelected,
        shape_information: JSON.stringify(shapes),
      };

      if (currentDetailId) {
        await updateRegisterDetail(payload, currentDetailId);
      } else {
        await createRegisterDetail(payload);
      }

      alert("Registro guardado correctamente");
    } catch (error) {
      console.error(error);
      alert("Error al guardar el registro");
    }
  };
  function deleteShape() {
    if (!editingShapeId) return;

    if (!confirm("¿Eliminar este elemento?")) return;

    setShapes((prev) =>
      prev.filter((s) => s.id !== editingShapeId)
    );

    setEditingShapeId(null);
    setModalOpen(false);
  }



  return (
    <>
      {/* CONTROLES */}
      <div style={{ display: "flex", gap: 8, padding: 8 }}>
        <select onChange={(e) => {
          const h = registerHeads.find(r => r.id === Number(e.target.value));
          setHeadSelected(h || null);
        }}>
          <option value="">RegisterHead</option>
          {registerHeads.map(h => (
            <option key={h.id} value={h.id}>{h.label.name}</option>
          ))}
        </select>

        <select onChange={(e) => setActivitySelected(Number(e.target.value))}>
          <option value="">Actividad</option>
          {activities.map(a => (
            <option key={a.value} value={a.value}>{a.label}</option>
          ))}
        </select>

        <select onChange={(e) => setUbicationSelected(Number(e.target.value))}>
          <option value="">Ubicación</option>
          {ubications.map(u => (
            <option key={u.value} value={u.value}>{u.label}</option>
          ))}
        </select>

        <select onChange={(e) => setJobSelected(Number(e.target.value))}>
          <option value="">Tarea</option>
          {jobs.map(j => (
            <option key={j.value} value={j.value}>{j.label}</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={saveShape}>Aceptar</button>
          <button onClick={() => setModalOpen(false)}>Cancelar</button>
        </div>
        <button
          disabled={
            !headSelected ||
            !activitySelected ||
            !ubicationSelected ||
            !jobSelected ||
            shapes.length === 0
          }
          onClick={saveRegisterDetail}
        >
          Guardar registro
        </button>
      </div>

      {/* MAPA */}
      {imageBounds && overlayImage && (
        <leaflet.MapContainer
          crs={leaflet.L.CRS.Simple}
          bounds={imageBounds}
          maxBounds={imageBounds}
          maxBoundsViscosity={1}
          minZoom={-2}
          maxZoom={2}
          style={{ height: "100vh", width: "100%" }}
        >
          <leaflet.ImageOverlay bounds={imageBounds} url={overlayImage} />
          <DrawController />
        </leaflet.MapContainer>
      )}

      {/* MODAL */}
      {modalOpen && draft && (
        <div style={modalStyle}>
          <h4>Detalle del perno</h4>

          {/* ITEM */}
          <label>Item</label>
          <input
            value={draft.item}
            onChange={(e) =>
              setDraft({ ...draft, item: e.target.value })
            }
            placeholder="Perno 36-D"
          />

          {/* CONDICIÓN */}
          <label>Condición</label>
          <select
            value={draft.condicion}
            onChange={(e) =>
              setDraft({ ...draft, condicion: e.target.value })
            }
          >
            <option value="">-- Seleccionar --</option>
            <option value="no_cambiado">No cambiado</option>
            <option value="sin_perno">Sin perno</option>
          </select>

          {/* VALOR */}
          <label>Valor</label>
          <input
            value={draft.valor}
            onChange={(e) =>
              setDraft({ ...draft, valor: e.target.value })
            }
            placeholder="Valor"
          />

          {/* PERNO */}
          <label>Perno</label>
          <select
            value={draft.perno}
            onChange={(e) =>
              setDraft({ ...draft, perno: e.target.value })
            }
          >
            <option value="">-- Seleccionar --</option>
            <option value="sin_perno">Sin perno</option>
            <option value="con_perno">Con perno</option>
          </select>

          {/* OBSERVACIÓN */}
          <label>Observación</label>
          <select
            value={draft.observacion}
            onChange={(e) =>
              setDraft({ ...draft, observacion: e.target.value })
            }
          >
            <option value="">-- Seleccionar --</option>
            <option value="incorrecta_lubricacion">
              Incorrecta lubricación
            </option>
            <option value="limpieza_deficiente">
              Limpieza deficiente
            </option>
            <option value="incorrecto_torqueo">
              Incorrecto procedimiento de torqueo
            </option>
            <option value="incorrecta_lubricacion_perno">
              Incorrecta lubricación de perno
            </option>
            <option value="sin_observaciones">
              Sin observaciones
            </option>
          </select>

          {/* BOTONES */}
          {editingShapeId && (
            <button
              style={{ background: "#ff3b30", color: "#fff" }}
              onClick={deleteShape}
            >
              Eliminar
            </button>
          )}
        </div>
      )}
    </>
  );
}

const modalStyle = {
  position: "fixed",
  top: 20,
  right: 20,
  width: 280,
  background: "white",
  padding: 12,
  borderRadius: 6,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  zIndex: 2000,
  fontFamily: "sans-serif",
};

const listStyle = {
  position: "fixed",
  bottom: 20,
  right: 20,
  width: 280,
  maxHeight: 300,
  overflow: "auto",
  background: "white",
  padding: 12,
  borderRadius: 6,
  boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
  zIndex: 2000,
  fontFamily: "sans-serif",
};