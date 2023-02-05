const express = require('express');
const app = express();

async function fetchAll() {
  const response = await fetch(
    'http://data.itsfactory.fi/journeys/api/1/stop-points'
  );
  const data = await response.json();
  return data;
}

async function fetchStop(shortName) {
  const response = await fetch(`https://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=${shortName}`);
  const data = await response.json();
  return data;
}
async function fetchNearbyStops(userLat, userLong) {

  const response = await fetch(
    `http://data.itsfactory.fi/journeys/api/1/stop-points?location=${userLat - 0.004},${userLong - 0.009}:${userLat + 0.003},${userLong + 0.009}`
  );
  const data = await response.json();
  let stops = data.body.filter((stop) => stop.municipality.name == 'Tampere');
  stops = stops.map(stop => stop.shortName);
  stops = stops.filter(stop => stop.startsWith("08") || stop.startsWith("08"));

  stops = stops.map(async stop => {
    const response = await fetchStop(stop);
    return response.body;
  })
  return await Promise.all(stops);
}


app.get('/', (req, res) => {
  const testLat = 61.496986;
  const testLong = 23.796476;
  fetchNearbyStops(testLat, testLong).then(response => {
    res.json(response)
  })
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
