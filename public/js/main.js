// Inicializa a variável marker globalmente
var marker;

// Recebe as coordenadas e adiciona o marcador
function updateMapWithCoordinates(latitude, longitude) {
  map.setView([latitude, longitude], 6); // Define a nova posição do mapa
  marker.setLatLng([latitude, longitude]); // Atualiza a posição do marcador
}

function getCoordinates() {
  const city = document.getElementById("cityInput").value;
  const state = document.getElementById("stateInput").value.toUpperCase();

  const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${city},${state},Brazil`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const location = data[0];
        const latitude = location.lat;
        const longitude = location.lon;

        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;

        // Chama a função para atualizar o mapa com as novas coordenadas
        updateMapWithCoordinates(latitude, longitude);
      } else {
        alert(
          "Cidade não encontrada. Por favor, verifique o nome da cidade e a sigla do estado."
        );
      }
    })
    .catch((error) => console.error("Erro ao obter coordenadas:", error));
}

// Inicio do mapa
var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Inicializa o marcador e o adiciona ao mapa
marker = L.marker([51.5, -0.09], {
  icon: L.icon({
    iconUrl: "images/marker-icon.png",
    shadowUrl: "images/marker-shadow.png",
    iconSize: [25, 41],
    shadowSize: [41, 41],
    iconAnchor: [15, 34],
    shadowAnchor: [15, 32],
    popupAnchor: [-3, -36],
  }),
})
  .addTo(map)
  .bindPopup("<div style='text-align:center'><strong>App de localização</strong>.<br> Você está aqui.</div>")
  .openPopup();
