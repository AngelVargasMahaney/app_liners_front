import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

type Punto = {
  id: string;
  lat: number;
  lng: number;
  item: string;
  valor?: string | null;
  perno?: string | null;
  pernoEstado?: string | null;
  pernoCausa?: string | null;
  condicion?: string | null;
  obsHistory: string[];
};

export default function Shell() {
  const webviewRef = useRef<WebView>(null);

  // 🧠 ESTADO LOCAL
  const [puntos, setPuntos] = useState<Punto[]>([]);

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
html, body, #map {
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}
#customModal {
  position:absolute;
  width:260px;
  background:white;
  padding:10px;
  border-radius:6px;
  display:none;
  z-index:2000;
  box-shadow:0 4px 12px rgba(0,0,0,.3);
}
input, select, textarea {
  width:100%;
  margin-bottom:6px;
}
button {
  width:48%;
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

  <label>PERNO</label>
  <select id="statusField">
    <option value="">-- Automático --</option>
    <option value="NO_CAMBIADO">No Cambiado</option>
    <option value="SIN_PERNO">Sin Perno</option>
  </select>

  <label>OBS</label>
  <textarea id="obsField" rows="3"></textarea>

  <div style="display:flex;justify-content:space-between">
    <button id="btnAceptar">Aceptar</button>
    <button id="btnCancelar">Cancelar</button>
  </div>
</div>

<script>
const map = L.map('map', { crs: L.CRS.Simple, minZoom: -4 });
const bounds = [[0,0],[800,1200]];
L.imageOverlay(
  'https://i.postimg.cc/ZTvRnd6Z/shell.png',
  bounds
).addTo(map);
map.fitBounds(bounds);

let markers = {};
let selectedPoint = null;
const modal = document.getElementById("customModal");

/* 📌 CREAR PUNTO */
map.on("click", e => {
  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: "CREATE_POINT",
    lat: e.latlng.lat,
    lng: e.latlng.lng
  }));
});

/* 🧹 LIMPIAR */
function clearMarkers() {
  Object.values(markers).forEach(m => map.removeLayer(m));
  markers = {};
}

/* 🎯 CARGAR */
function loadPoints(puntos) {
  clearMarkers();

  puntos.forEach(p => {
    const marker = L.circleMarker([p.lat, p.lng], {
      radius: 10,
      color: "red",
      fillColor: "red",
      fillOpacity: 1
    }).addTo(map);

    markers[p.id] = marker;

    marker.on("click", e => {
      selectedPoint = p;

      itemField.value = p.item;
      valorField.value = p.valor || "";
      statusField.value = p.perno || "";
      obsField.value = "";

      modal.style.left = e.containerPoint.x + "px";
      modal.style.top = e.containerPoint.y + "px";
      modal.style.display = "block";
    });
  });
}

/* ❌ CANCELAR */
btnCancelar.onclick = () => {
  modal.style.display = "none";
};

/* ✅ ACEPTAR */
btnAceptar.onclick = () => {
  if (!selectedPoint) return;

  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: "POINT_UPDATED",
    data: {
      id: selectedPoint.id,
      valor: valorField.value || null,
      perno: statusField.value || null,
      obsHistory: obsField.value
        ? [...(selectedPoint.obsHistory || []), obsField.value]
        : selectedPoint.obsHistory
    }
  }));

  modal.style.display = "none";
};

/* 📩 MENSAJES RN */
function handleMessage(e) {
  const msg = JSON.parse(e.data);
  if (msg.type === "LOAD_POINTS") {
    loadPoints(msg.puntos);
  }
}

document.addEventListener("message", handleMessage);
window.addEventListener("message", handleMessage);
</script>
</body>
</html>
`;

  /* 🔁 RN → WebView */
  useEffect(() => {
    webviewRef.current?.postMessage(
      JSON.stringify({
        type: "LOAD_POINTS",
        puntos
      })
    );
  }, [puntos]);

  /* 🔁 WebView → RN */
  const onMessage = (e: any) => {
    const msg = JSON.parse(e.nativeEvent.data);

    if (msg.type === "CREATE_POINT") {
      setPuntos(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          lat: msg.lat,
          lng: msg.lng,
          item: "AUTO",
          obsHistory: []
        }
      ]);
    }

    if (msg.type === "POINT_UPDATED") {
      setPuntos(prev =>
        prev.map(p =>
          p.id === msg.data.id ? { ...p, ...msg.data } : p
        )
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ html }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        onMessage={onMessage}
      />
    </View>
  );
}
