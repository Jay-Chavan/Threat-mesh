import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ThreatMap = () => {
  const [threats, setThreats] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    socket.on("newThreat", (newThreat) => {
      setThreats((prev) => [...prev, newThreat]);
    });

    return () => socket.off("newThreat");
  }, []);

  return (
    <div>
      <h2>Live Threat Map</h2>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <MapContainer center={[20, 78]} zoom={4} style={{ height: "400px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {threats
          .filter((t) => filter === "All" || t.severity === filter)
          .map((t, idx) => (
            <Marker key={idx} position={[t.lat, t.lon]}>
              <Popup>
                <b>{t.type}</b> - {t.severity}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default ThreatMap;
