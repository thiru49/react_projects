import React from "react";
import Logo from "./Logo";
import Styles from "./Sidebar.module.css";
import AppNav from "./AppNav";

function Sidebar() {
  return (
    <div className={Styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <footer className={Styles.footer}>
        <p>&copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
      </footer>
    </div>
  );
}

export default Sidebar;
