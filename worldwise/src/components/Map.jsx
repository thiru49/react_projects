import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";

import Styles from "./Map.module.css";
import { useState } from "react";
import { useCites } from "../context/CitesContext";
import { useEffect } from "react";
import useGeoLocation from "../hook/useGeoLocation";
import Button from "./Button";

const Map = () => {
  const { city } = useCites();
  const [mapPosition, setPosition] = useState([10, 78]);
  const [searchParms] = useSearchParams();
  const {
    position: geoLocationPosition,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeoLocation();
  const maplat = searchParms.get("lat");
  const maplng = searchParms.get("lng");

  useEffect(() => {
    if (maplat && maplng) setPosition([maplat, maplng]);
  }, [maplat, maplng]);

  useEffect(() => {
    if (geoLocationPosition)
      setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);
  return (
    <div className={Styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your Position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};
const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};
const DetectClick = () => {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => navigate(`form?lang=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
};
export default Map;
