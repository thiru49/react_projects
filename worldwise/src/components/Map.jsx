import React from "react";
import Styles from "./Map.module.css";
import { useSearchParams } from "react-router-dom";

const Map = () => {
  const [searchParms, setSearchParms] = useSearchParams();
  console.log(searchParms);
  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");
  return (
    <div className={Styles.mapContainer}>
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
