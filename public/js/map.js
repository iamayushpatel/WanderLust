// Assuming listing.geometry.coordinates is [longitude, latitude]
console.log(listing.geometry.coordinates);
let coordinates = listing.geometry.coordinates; // Example: [longitude, latitude]
// Create a map and set its view to the coordinates
let map = L.map("map").setView(coordinates, 10); // Zoom level 10

// Add OpenStreetMap tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Add a marker at the coordinates
L.marker(coordinates)
  .addTo(map)
  .bindPopup("Exact location provided after booking.")
  .openPopup();