import React from "react";
import Styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const Map = () => {
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
      <h1>Map</h1>
      <p>
        lat:{lat}lang:{lng}
      </p>
      <button onClick={() => setSearchParms({ lat: 10, lng: 20 })}>
        Change Position
      </button>
    </div>
  );
};

export default Map;
