async function fetchAll() {
    const response = await fetch(
        'http://data.itsfactory.fi/journeys/api/1/stop-points'
    );
    const data = await response.json();
    return data;
}

async function fetchNearbyStops(userLat, userLong) {

    const response = await fetch(
        `http://data.itsfactory.fi/journeys/api/1/stop-points?location=${userLat - 0.003},${userLong - 0.008}:${userLat + 0.003},${userLong + 0.008}`
    );
    const data = await response.json();
    stops = data.body.filter((stop) => stop.municipality.name == 'Tampere');
    stops = stops.map(stop => stop.shortName);
    stops = stops.filter(stop => stop.startsWith("08") || stop.startsWith("08"));

    console.log(stops);
    stops.map(stop => {
        const stopMonitor = fetch(
            `https://data.itsfactory.fi/journeys/api/1/stop-monitoring?stops=${stop}`
        );

        const stopData = stopMonitor.json();
    })

    return;
}