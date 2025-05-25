let map = L.map('map').setView([-37.8136, 144.9631], 8);
let markersLayer = L.layerGroup().addTo(map);
let userLat = -37.8136;
let userLon = 144.9631;

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

navigator.geolocation.getCurrentPosition(pos => {
  userLat = pos.coords.latitude;
  userLon = pos.coords.longitude;

  L.marker([userLat, userLon], {
    icon: L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41]
    })
  }).addTo(map).bindPopup("You are here").openPopup();

  loadStations("all");
  drawRoute();
});

function loadStations(operator) {
  markersLayer.clearLayers();
  axios.get(`/stations?operator=${operator}`).then(res => {
    res.data.forEach(station => {
      L.marker([station.lat, station.lon]).addTo(markersLayer)
        .bindPopup(`${station.operator}<br>${station.Address}`);
    });
  });
}

function drawRoute() {
  axios.get(`/route/${userLat}/${userLon}`).then(res => {
    const coords = res.data.features[0].geometry.coordinates.map(c => [c[1], c[0]]);
    L.polyline(coords, { color: 'red' }).addTo(map);
  });
}

// --- Autocomplete Search ---
const input = document.getElementById('operator-search');
const suggestionBox = document.getElementById('suggestions');

input.addEventListener('input', () => {
  const query = input.value;
  if (query.length < 1) {
    suggestionBox.innerHTML = '';
    return;
  }
  axios.get(`/operators?query=${query}`).then(res => {
    suggestionBox.innerHTML = '';
    res.data.forEach(name => {
      const li = document.createElement('li');
      li.textContent = name;
      li.style.cursor = 'pointer';
      li.onclick = () => {
        input.value = name;
        suggestionBox.innerHTML = '';
        loadStations(name);
      };
      suggestionBox.appendChild(li);
    });
  });
});
