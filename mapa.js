// Vista inicial de mi mapa: N, W, y el zoom o altura
let map = L.map('map').setView([37.7325, -0.7905], 9);
// Cuando carga la pagina hace zoom a la zona del Mar Menor
window.onload = function() {
    map.flyTo([37.7325, -0.7905], 13);
}

// Capa con el mapa base de openstreetmap que se le anyade a map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agregar MiniMapa para ver en qué zona del mundo está el MarMenor (España) mediante Carto
var cartoMiniatura = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { attribution: '©OpenStreetMap, ©CartoDB', subdomains: 'abcd', maxZoom: 24 });

// Agregar plugin MiniMap
var minimapa = new L.Control.MiniMap(cartoMiniatura, {
    toggleDisplay: true,
    minimized: false,
    position: "bottomright"
}).addTo(map);

// Agregar escala
new L.control.scale({ imperial: false, position: "bottomright" }).addTo(map);

// Agregar capa con el area del Mar Menor
var marMenorJS = L.geoJson(marMenor).addTo(map);

// Agregar donde esta la boya que mide la temperatura
var puntoTemperatura = L.circleMarker(L.latLng(37.70940, -0.78552), {
    radius: 2,
    fillColor: "red",
    color: "red",
    weight: 2,
    opacity: 1,
    fillOpacity: 0.6,
}).addTo(map);

// Agregar la leyenda
const legend = L.control.Legend({
    position: "topright",
    collapsed: false,
    symbolWidth: 24,
    opacity: 1,
    column: 1,
    legends: [{
        label: "Mar Menor",
        type: "rectangle",
        color: "#0074f0",
        fillColor: "#009ff0",
        weight: 2,
        layers: marMenorJS,
        marMenor
    }, {
        label: "Medidor Temperatura del agua",
        type: "circle",
        color: "red",
        fillColor: "red",
        radius: 2,
        layers: [puntoTemperatura]
    }]
}).addTo(map);