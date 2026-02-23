import { getCurrentRegDetail, updateRegisterDetail } from "@/api/client";
import { useRegistroStore } from "@/store/useRegistroStore";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

export default function ShapeEditor({
  imageUrl,
  activity,
  ubication,
  job,
  equipo,
  pistolasTorque
}) {

  const webviewRef = useRef<any>(null);
  const [html, setHtml] = useState("");
  const [shapes, setShapes] = useState<any[]>([]);

  const { infoData } = useRegistroStore();

  /* ======================================
     HTML BUILDER (TU VERSION FUNCIONAL)
     SOLO agregamos lógica del div flotante
  ====================================== */
  const pistolasOptions = (pistolasTorque || [])
    .map(p => `<option value="${p.id}">${p.serial_number}</option>`)
    .join("");

  const buildHTML = (image) => `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<link rel="stylesheet"
 href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>

html,body,#map{
 margin:0;
 padding:0;
 height:100%;
 width:100%;
}

#editor{
 position:absolute;
 background:white;
 border-radius:8px;
 padding:12px;
 width:260px;
 box-shadow:0 4px 12px rgba(0,0,0,0.25);
 z-index:9999;
 display:none;
 cursor:move;
 touch-action:none;
 font-family:sans-serif;
}

label{
 font-size:12px;
 font-weight:bold;
}

input,select,textarea{
 width:100%;
 margin-top:4px;
 margin-bottom:10px;
 padding:4px;
 border:1px solid #ccc;
 border-radius:4px;
 font-size:12px;
}

#buttons{
 display:flex;
 justify-content:space-between;
}

</style>

</head>

<body>

<div id="map"></div>

<div id="editor">

<label>ITEM</label>
<input id="itemInput"/>

<label>VALOR</label>
<input id="valorInput"/>

<label>CONDICIÓN</label>
<input id="condicionInput" disabled/>

<label>PERNO</label>
<select id="pernoSelect">
<option value="">-- Automático --</option>

<option value="NO_CAMBIADO">No Cambiado</option>
<option value="SIN_PERNO">Sin Perno</option>
</select>

<label>OBSERVACIÓN PERNO</label>
<select id="obsPernoSelect">

<option value="">-- Seleccionar --</option>

<option value="Incorrecta lubricación">Incorrecta lubricación</option>
<option value="Limpieza deficiente">Limpieza deficiente</option>
<option value="Incorrecta procedimiento de torque">Incorrecta procedimiento de torque</option>
<option value="Incorrecta ubicación de perno">Incorrecta ubicación de perno</option>

</select>

<label>PISTOLA TORQUE</label>
<select id="pistolaSelect">
<option value="">-- Seleccionar --</option>
</select>


<label>COMENTARIOS</label>
<textarea id="obsInput"></textarea>

<div id="buttons">
<button id="btnAceptar">Aceptar</button>
<button id="btnCancelar">Cancelar</button>
</div>

</div>

<script>

/* ================= MAP ================= */
let currentMarkers = [];

var map=L.map('map',{
 crs:L.CRS.Simple,
 minZoom:-1.55,
 maxZoom:-0.77
});

/* ==== IMAGEN (NO TOCAR LOGICA) ==== */

var img=new Image();

img.onload=function(){

 const bounds=[[0,0],[img.naturalHeight,img.naturalWidth]];

 L.imageOverlay("${image}",bounds).addTo(map);

 map.fitBounds(bounds);

};

img.src="${image}";

if(img.complete){ img.onload(); }

/* ================= EDITOR ================= */

const editor=document.getElementById("editor");

const itemInput=document.getElementById("itemInput");
const valorInput=document.getElementById("valorInput");
const condicionInput=document.getElementById("condicionInput");
const pernoSelect=document.getElementById("pernoSelect");
const obsPernoSelect=document.getElementById("obsPernoSelect");
const pistolaSelect=document.getElementById("pistolaSelect");

const obsInput=document.getElementById("obsInput");

const btnAceptar=document.getElementById("btnAceptar");
const btnCancelar=document.getElementById("btnCancelar");

let selectedMarker=null;
let selectedShape=null;
let blinkInterval=null;

const COLORS={
  INSTALADO:"#00aa00",
  NO_CAMBIADO:"#0066ff",
  SIN_PERNO:"#ff8800"
};

function resolveEstado(p){

 const valor = p.meta?.valor;
 const causa = p.meta?.pernoCausa;

 if(valor && valor.trim() !== ""){
   return {
     estado:"INSTALADO",
     condicion:"Perno instalado y torqueado"
   };
 }

 if(p.meta?.perno === "SIN_PERNO"){
   return {
     estado:"SIN_PERNO",
     condicion:"Sin perno / Tapón colocado"
   };
}

 if(causa){
   return {
     estado:"NO_CAMBIADO",
     condicion:"Auto de acuerdo a Leyenda de colores"
   };
 }

 return null;
}


function applyColor(p){

 const result = resolveEstado(p);

 if(!result || !p.marker) return;

 const color = COLORS[result.estado];

 p.marker.setStyle({
   color: color,
   fillColor: color
 });

 // actualizar condición automática
 condicionInput.value = result.condicion;

 // reset backgrounds
 valorInput.style.background="";
 pernoSelect.style.background="";

 if(result.estado==="INSTALADO"){
   valorInput.style.background="#e6f7e6";
 }

 if(result.estado==="NO_CAMBIADO"){
   pernoSelect.style.background="#e6f0ff";
 }

 if(result.estado==="SIN_PERNO"){
   pernoSelect.style.background="#fff1e0";
 }
}


valorInput.addEventListener("input",()=>{

 if(!selectedShape) return;

 selectedShape.meta = selectedShape.meta || {};

 selectedShape.meta.valor = valorInput.value;

 // si escribe valor → limpiar perno
 if(valorInput.value.trim() !== ""){
   pernoSelect.value="";
   selectedShape.meta.perno=null;
   selectedShape.meta.pernoCausa=null;
 }

 applyColor(selectedShape);

});



/* ================= DRAG ================= */

let dragging=false;
let startX=0,startY=0;
let modalLeft=0,modalTop=0;

editor.addEventListener("mousedown",e=>{
 dragging=true;
 startX=e.clientX;
 startY=e.clientY;
 const r=editor.getBoundingClientRect();
 modalLeft=r.left;
 modalTop=r.top;
});
editor.addEventListener("touchstart",e=>{
 const t=e.touches[0];
 dragging=true;
 startX=t.clientX;
 startY=t.clientY;
 const r=editor.getBoundingClientRect();
 modalLeft=r.left;
 modalTop=r.top;
});

document.addEventListener("mousemove",e=>{
 if(!dragging) return;
 editor.style.left=(modalLeft+(e.clientX-startX))+"px";
 editor.style.top=(modalTop+(e.clientY-startY))+"px";
});

document.addEventListener("mouseup",()=>dragging=false);



document.addEventListener("touchmove",e=>{
 if(!dragging) return;
 const t=e.touches[0];
 editor.style.left=(modalLeft+(t.clientX-startX))+"px";
 editor.style.top=(modalTop+(t.clientY-startY))+"px";
});

document.addEventListener("touchend",()=>dragging=false);

/* ================= BLINK ================= */

function startBlink(marker){

 stopBlink();

 let visible=true;

 blinkInterval=setInterval(()=>{

   marker.setStyle({
     opacity:visible?0.2:1,
     fillOpacity:visible?0.2:1
   });

   visible=!visible;

 },400);

}

function stopBlink(){

 if(blinkInterval){
   clearInterval(blinkInterval);
   blinkInterval=null;
 }

 if(selectedMarker){
   selectedMarker.setStyle({
     opacity:1,
     fillOpacity:1
   });
 }

}

/* ================= EDITOR OPEN ================= */

function openEditor(latlng,data,marker){

 const point=map.latLngToContainerPoint(latlng);

 editor.style.left=(point.x+15)+"px";
 editor.style.top=(point.y+15)+"px";

 itemInput.value=data.meta?.item||"";
 valorInput.value=data.meta?.valor||"";
 condicionInput.value=data.meta?.condicion||"Auto";
 pernoSelect.value=data.meta?.perno||"";
 obsInput.value=data.meta?.obs||"";
obsPernoSelect.value = data.meta?.pernoCausa || "";
pistolaSelect.value = data.meta?.pistolaTorque || "";

 editor.style.display="block";

 selectedMarker=marker;
 selectedShape=data;

 startBlink(marker);

}

pernoSelect.addEventListener("change",()=>{

 if(!selectedShape) return;

 selectedShape.meta = selectedShape.meta || {};

 selectedShape.meta.perno = pernoSelect.value || null;

 if(
   selectedShape.meta.perno==="NO_CAMBIADO" ||
   selectedShape.meta.perno==="SIN_PERNO"
 ){
   valorInput.value="";
   valorInput.disabled=true;
   selectedShape.meta.valor=null;
 }else{
   valorInput.disabled=false;
 }

 applyColor(selectedShape);

});
pistolaSelect.addEventListener("change",()=>{

 if(!selectedShape) return;

 selectedShape.meta = selectedShape.meta || {};

 selectedShape.meta.pistolaTorque =
   pistolaSelect.value || null;

});

obsPernoSelect.addEventListener("change",()=>{

 if(!selectedShape) return;

 selectedShape.meta = selectedShape.meta || {};

 selectedShape.meta.pernoCausa =
   obsPernoSelect.value || null;

 applyColor(selectedShape);

});


/* ================= BOTONES ================= */

btnCancelar.onclick=()=>{

 editor.style.display="none";
 stopBlink();
 selectedMarker=null;
 selectedShape=null;

};


btnAceptar.onclick=()=>{

 if(!selectedShape) return;

 selectedShape.meta = selectedShape.meta || {};

 selectedShape.meta.item = itemInput.value;
 selectedShape.meta.valor = valorInput.value;
 selectedShape.meta.perno = pernoSelect.value;
 selectedShape.meta.obs = obsInput.value;
selectedShape.meta.pistolaTorque = pistolaSelect.value;
  selectedShape.meta.fechaRegistro = new Date().toISOString();
  
 // 🔥 IMPORTANTE: quitar marker antes de stringify (Leaflet NO es serializable)
 const { marker, ...cleanShape } = selectedShape;

 window.ReactNativeWebView.postMessage(JSON.stringify({
   type:"DEBUG",
   message: cleanShape
 }));

 window.ReactNativeWebView.postMessage(JSON.stringify({
   type:"SHAPE_UPDATED",
   shape: cleanShape
 }));
 editor.style.display="none";
};

/* ================= CARGANDO PISTOLAS ================= */
function loadPistolas(pistolas){

  pistolaSelect.innerHTML =
    '<option value="">-- Seleccionar --</option>';

  pistolas.forEach(p => {

    pistolaSelect.innerHTML +=
      '<option value="'+p.id+'">'+p.serial_number+'</option>';

  });

}


/* ================= LOAD POINTS ================= */

function loadPoints(puntos){


  // 🔥 BORRAR markers anteriores
  currentMarkers.forEach(m => {
    map.removeLayer(m);
  });

  currentMarkers = [];

  puntos.forEach(p=>{

    const marker = L.circleMarker(
      [p.geometry.lat,p.geometry.lng],
      {
        radius:12,
        color:"white",
        fillColor:"transparent",
        fillOpacity:1
      }
    ).addTo(map);

    p.marker = marker;

    applyColor(p);

    marker.on("click", e => {
      openEditor(e.latlng, p, marker);
    });

    // 🔥 guardar referencia
    currentMarkers.push(marker);
  });


}

function handleMessage(e){

 const msg=JSON.parse(e.data);

 if(msg.type==="LOAD_POINTS"){
   loadPoints(msg.puntos);
 }
 if(msg.type==="LOAD_PISTOLAS"){
   loadPistolas(msg.pistolas);
 }
}

document.addEventListener("message",handleMessage);
window.addEventListener("message",handleMessage);

</script>

</body>
</html>
`;


  /* ======================================
     GENERAR HTML
  ====================================== */

  useEffect(() => {

    if (!imageUrl) return;
    setHtml(buildHTML(imageUrl));

  }, [imageUrl]);

  /* ======================================
     LOAD SHAPES BACKEND
  ====================================== */

  useEffect(() => {

    if (!activity || !ubication || !job || !equipo) return;

    loadShapes();

  }, [activity, ubication, job, equipo]);
  const [currentDetailId, setCurrentDetailId] = useState<number | null>(null);

  const loadShapes = async () => {
    try {

      const res = await getCurrentRegDetail(
        Number(infoData.rhead),
        activity,
        ubication,
        job
      );
      // console.log("MY RERSS", res);

      if (!res.exists) {
        // console.log("ESTOY AQUI");

        setShapes([]);
        setCurrentDetailId(null);

        return;
      }

      const parsed = JSON.parse(res.shape_information || "[]");
      // console.log("PARSED", parsed);
      setCurrentDetailId(res.id);

      setShapes(parsed);

    } catch (err) {
      console.log("LOAD SHAPES ERROR", err);
      setCurrentDetailId(null);

    }

  };

  const saveShapesToBackend = async (newShapes: any[]) => {

    try {

      // 🔥 limpiar marker antes de enviar (NO tocar shapes reales)
      const cleanShapes = newShapes.map(({ marker, ...rest }) => rest);

      const payload = {
        register_head: Number(infoData.rhead),
        activity,
        ubication,
        job,
        shape_information: JSON.stringify(cleanShapes),
      };

      await updateRegisterDetail(payload, Number(currentDetailId));

      console.log("UPDATED BACKEND OK");

    } catch (err) {
      console.log("UPDATE ERROR", err);
    }

  };


  /* ======================================
     SYNC SHAPES → WEBVIEW
  ====================================== */
  // console.log("MY SHAPES", shapes);

  useEffect(() => {

    if (!webviewRef.current || !html) return;

    webviewRef.current.postMessage(JSON.stringify({
      type: "LOAD_POINTS",
      puntos: shapes
    }));

    webviewRef.current.postMessage(JSON.stringify({
      type: "LOAD_PISTOLAS",
      pistolas: pistolasTorque || []
    }));

  }, [shapes, html, pistolasTorque]);


  /* ======================================
     RENDER
  ====================================== */

  if (!html) return null;

  return (

    <View style={{ flex: 1 }}>

      <WebView
        ref={webviewRef}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(e) => {

          const data = JSON.parse(e.nativeEvent.data);

          console.log("RECIBIDO RN:", data); // 👈 AGREGAR

          if (data.type === "SHAPE_UPDATED") {
            console.log("EDITADO OK"); // 👈 AGREGAR

            const updatedShape = data.shape;

            setShapes(prev => {

              const newShapes = prev.map(s =>
                s.id === updatedShape.id ? updatedShape : s
              );

              saveShapesToBackend(newShapes);

              return newShapes;

            });

          }


        }}

      />

    </View>

  );

}
