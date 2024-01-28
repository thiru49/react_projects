import React from "react";
import Styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCites } from "../context/CitesContext";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
function CityItem({ city }) {
  const { currentCity } = useCites();
  const { cityName, emoji, date, id, position } = city;
  return (
    <li>
      <Link
        className={`${Styles.cityItem} ${
          currentCity.id === id ? Styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={Styles.emoji}>{emoji}</span>
        <h3 className={Styles.name}>{cityName}</h3>
        <time className={Styles.date}>{formatDate(date)}</time>
        <button className={Styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

export default CityItem;
