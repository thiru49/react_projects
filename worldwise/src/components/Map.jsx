import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import Styles from "./Map.module.css";
import { useState } from "react";
import { useCites } from "../context/CitesContext";

const Map = () => {
  const { city } = useCites();
  const [mapPosition, setPosition] = useState([40, 0]);
  const [searchParms, setSearchParms] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParms);
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");
  return (
    <div className={Styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={Styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {city.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.cityName} <br /> {city.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
