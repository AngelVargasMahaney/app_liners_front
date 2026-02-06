import { useRegistroStore } from "@/store/useRegistroStore";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function Alimentacion() {
  const webviewRef = useRef(null);
  const navigation = useNavigation<any>();

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
html, body, #map {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
    background: white;
}

#customModal {
  position: absolute;
  width: 260px;
  background: white;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  display: none;
  z-index: 2000;
  font-family: sans-serif;
  border: 1px solid #bbb;
  cursor: move;
  touch-action: none;
}

label {
  font-size: 12px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  margin-top: 4px;
  margin-bottom: 10px;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
}

#modalButtons {
  display: flex;
  justify-content: space-between;
}

#btnAceptar {
  background: #55c3ff;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
}

#btnCancelar {
  background: #ccc;
  border: none;
  padding: 5px 12px;
  border-radius: 4px;
}
.input-green {
  background-color: #e6f7e6;
}

.input-blue {
  background-color: #e6f0ff;
}

.input-orange {
  background-color: #fff1e0;
}
input:disabled {
  background-color: #f2f2f2;
  color: #888;
}
</style>
</head>

<body>
<div id="map"></div>

<div id="customModal">
  <label>ITEM</label>
  <input id="itemField" disabled />

  <label>VALOR</label>
  <input id="valorField" />

  <label>CONDICIÓN</label>
  <input id="condicionField" disabled />

  <label>PERNO</label>
  <select id="statusField">
  <option value="">-- Automático --</option>

  <option value="NO_CAMBIADO">No Cambiado</option>
  <option value="SIN_PERNO">Sin Perno</option>

  <option value="NO_CAMBIADO">Incorrecta lubricación</option>
  <option value="NO_CAMBIADO">Limpieza deficiente</option>
  <option value="NO_CAMBIADO">Incorrecta procedimiento de torque</option>
  <option value="NO_CAMBIADO">Incorrecta ubicación de perno</option>
  </select>

  <label>OBSERVACIONES</label>
  <textarea id="obsField" rows="3"></textarea>

  <div id="modalButtons">
    <button id="btnAceptar">Aceptar</button>
    <button id="btnCancelar">Cancelar</button>
  </div>
</div>

<script>
function resetInputColors() {
  valorField.className = "";
  statusField.className = "";
}
/* ---------------- MAPA ---------------- */
var map = L.map('map', { crs: L.CRS.Simple, minZoom: -4 });
var bounds = [[0,0], [800,1200]];
L.imageOverlay(
  'https://i.postimg.cc/w6bG34M5/diapo3.png?dl=1',
  bounds
).addTo(map);
map.fitBounds(bounds);

/* ---------------- ESTADO ---------------- */
const modal = document.getElementById("customModal");

let selectedPoint = null;
let blinkingMarker = null;
let blinkInterval = null;

/* ---------------- LEYENDA DE COLORES ---------------- */
const COLORS = {
  INSTALADO: "#00aa00",
  NO_CAMBIADO: "#0066ff",
  SIN_PERNO: "#ff8800"
};

/* ---------------- DRAG (VERSIÓN ORIGINAL QUE FUNCIONA) ---------------- */
let isDragging = false;
let startX = 0, startY = 0;
let modalLeft = 0, modalTop = 0;

function startDrag(x, y) {
  isDragging = true;
  startX = x;
  startY = y;
  const r = modal.getBoundingClientRect();
  modalLeft = r.left;
  modalTop = r.top;
}

function dragMove(x, y) {
  if (!isDragging) return;
  modal.style.left = modalLeft + (x - startX) + "px";
  modal.style.top = modalTop + (y - startY) + "px";
}

function stopDrag() {
  isDragging = false;
}

modal.addEventListener("mousedown", e => startDrag(e.clientX, e.clientY));
document.addEventListener("mousemove", e => dragMove(e.clientX, e.clientY));
document.addEventListener("mouseup", stopDrag);

modal.addEventListener("touchstart", e => {
  const t = e.touches[0];
  startDrag(t.clientX, t.clientY);
});
document.addEventListener("touchmove", e => {
  if (!isDragging) return;
  const t = e.touches[0];
  dragMove(t.clientX, t.clientY);
});
document.addEventListener("touchend", stopDrag);

/* ---------------- BLINK ---------------- */
function startBlink(marker) {
  stopBlink();
  let on = true;
  blinkInterval = setInterval(() => {
    marker.setStyle({
      fillOpacity: on ? 0.2 : 1,
      opacity: on ? 0.2 : 1
    });
    on = !on;
  }, 400);
  blinkingMarker = marker;
}

function stopBlink() {
  if (blinkInterval) clearInterval(blinkInterval);
  if (blinkingMarker) {
    blinkingMarker.setStyle({ fillOpacity: 1, opacity: 1 });
  }
  blinkInterval = null;
  blinkingMarker = null;
}

/* ---------------- LOGICA MOCKUP ---------------- */
function resolveEstado(p) {
  if (p.pernoEstado) return p.pernoEstado;
  if (p.valor) return "INSTALADO";
  return null;
}

function applyColor(p) {
   resetInputColors();

  const estado = resolveEstado(p);
  if (!estado) return;

  // Marker
  p.marker.setStyle({
    color: COLORS[estado],
    fillColor: COLORS[estado]
  });

  p.condicion = "Auto según leyenda";

  // Inputs
  if (estado === "INSTALADO") {
    valorField.classList.add("input-green");
    statusField.classList.add("input-green");
  }

  if (estado === "NO_CAMBIADO") {
    statusField.classList.add("input-blue");
  }

  if (estado === "SIN_PERNO") {
    statusField.classList.add("input-orange");
  }
}

/* ---------------- MODAL ---------------- */
function openModal(latlng, p) {
  const pos = map.latLngToContainerPoint(latlng);
  modal.style.left = pos.x + 10 + "px";
  modal.style.top = pos.y + 10 + "px";

  itemField.value = p.item;
  valorField.value = p.valor || "";
  statusField.value = p.perno || "";
  condicionField.value = p.condicion || "Auto";
  obsField.value = "";

  modal.style.display = "block";
}

statusField.addEventListener("change", () => {
  if (!selectedPoint) return;

  const selectedOption = statusField.options[statusField.selectedIndex];

  // Guardamos estado lógico y causa textual
  selectedPoint.pernoEstado = selectedOption.value || null;
  selectedPoint.pernoCausa = selectedOption.text || null;

  // 🔑 REGLA EXACTA:
  // Solo deshabilitar VALOR si es NO_CAMBIADO o SIN_PERNO
  if (
    selectedPoint.pernoCausa === "No Cambiado" ||
    selectedPoint.pernoCausa === "Sin Perno"
  ) {
    selectedPoint.valor = null;
    valorField.value = "";
    valorField.disabled = true;
  } else {
    valorField.disabled = false;
  }

  applyColor(selectedPoint);
});

valorField.addEventListener("input", () => {
  if (!selectedPoint) return;

  selectedPoint.valor = valorField.value || null;
  applyColor(selectedPoint);
});

/* ---------------- PUNTOS ---------------- */
function loadPoints(puntos) {
  puntos.forEach(p => {
    const marker = L.circleMarker([p.lat, p.lng], {
      radius: 12,
      color: "red",
      fillColor: "red",
      fillOpacity: 1
    }).addTo(map);

    p.marker = marker;
    p.obsHistory = p.obsHistory || [];

    marker.on("click", e => {
      selectedPoint = p;
      openModal(e.latlng, p);
      startBlink(marker);
    });
  });
}

/* ---------------- BOTONES ---------------- */
btnCancelar.onclick = () => {
  modal.style.display = "none";
  stopBlink();
};

btnAceptar.onclick = () => {
  if (!selectedPoint) return;

  selectedPoint.valor = valorField.value;
  selectedPoint.perno = statusField.value || null;

  if (obsField.value) {
    selectedPoint.obsHistory.push(obsField.value);
  }

  applyColor(selectedPoint);

  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: "POINT_UPDATED",
    data: selectedPoint
  }));

  modal.style.display = "none";
  stopBlink();
};

/* ---------------- MENSAJES RN ---------------- */
function handleMessage(e) {
  const msg = JSON.parse(e.data);
  if (msg.type === "LOAD_POINTS") loadPoints(msg.puntos);
}

document.addEventListener("message", handleMessage);
window.addEventListener("message", handleMessage);
</script>
</body>
</html>
`;

  const { infoData } = useRegistroStore()

  useEffect(() => {
    const puntos = [
      { lat: 532, lng: 220, item: "2-E" },
      { lat: 173, lng: 880, item: "18-E" }
    ];

    setTimeout(() => {
      webviewRef.current?.postMessage(
        JSON.stringify({ type: "LOAD_POINTS", puntos })
      );
    }, 600);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={e => {
          console.log("RN recibió:", JSON.parse(e.nativeEvent.data));
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#000"
  },
  cell: {
    width: "33.3333%",
    height: 48,
    borderWidth: 0.5,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    backgroundColor: "#fff"
  },

  parent: {
    backgroundColor: "#ffeb3b"
  },
  parentText: {
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center"
  },

  active: {
    backgroundColor: "#ffeb3b"
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#333"
  },
  button: {
    width: "33.3333%",               // 2 columnas
    paddingVertical: 14,
    borderWidth: 0.5,
    borderColor: "#333",
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonActive: {
    backgroundColor: "#ffeb55ff"
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center"
  },
  textActive: {
    color: "#000000ff"
  }
});