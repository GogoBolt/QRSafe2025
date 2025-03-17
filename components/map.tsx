"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Bus } from "lucide-react";

// Create a custom icon using Lucide React Bus icon
const createBusIcon = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6v6"/><path d="M15 6v6"/><path d="M2 12h19.6"/><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><circle cx="15" cy="18" r="2"/></svg>`;
  const iconUrl = `data:image/svg+xml;base64,${btoa(svg)}`;

  return L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const busIcon = createBusIcon();

export default function Map() {
  const [buses, setBuses] = useState([
    {
      id: 1,
      position: [5.348, -4.017],
      name: "Bus 1",
      route: "Route Matin - École Internationale",
      speed: "40 km/h",
      nextStop: "II Plateaux",
    },
    {
      id: 2,
      position: [5.359, -3.996],
      name: "Bus 2",
      route: "Route Matin - Lycée Classique",
      speed: "35 km/h",
      nextStop: "Riviera Palmeraie",
    },
  ]);

  return (
    <MapContainer
      center={[5.348, -4.017]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {buses.map((bus) => (
        <Marker
          key={bus.id}
          position={bus.position as [number, number]}
          icon={busIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{bus.name}</h3>
              <p className="text-sm text-muted-foreground">{bus.route}</p>
              <div className="mt-2 space-y-1">
                <p className="text-sm">Vitesse: {bus.speed}</p>
                <p className="text-sm">Prochain arrêt: {bus.nextStop}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}