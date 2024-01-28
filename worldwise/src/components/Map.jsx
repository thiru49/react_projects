import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import Styles from "./Map.module.css";
import { useState } from "react";

const Map = () => {
  const [mapPosition, setPosition] = useState([40, 0]);
  const [searchParms, setSearchParms] = useSearchParams();
  const navigate = useNavigate();
  console.log(searchParms);
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");
  return (
    <div
      className={Styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
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
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
