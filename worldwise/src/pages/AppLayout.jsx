import React from "react";
import Styles from "./AppLayout.module.css";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
function AppLayout() {
  return (
    <div className={Styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
