import React from "react";
import Styles from "./CityItem.module.css";

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};
function CityItem({ city }) {
  const { cityName, emoji, date } = city;
  return (
    <li className={Styles.cityItem}>
      <span className={Styles.emoji}>{emoji}</span>
      <h3 className={Styles.name}>{cityName}</h3>
      <time className={Styles.date}>{formatDate(date)}</time>
      <button className={Styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
