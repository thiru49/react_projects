import React from "react";
import Styles from "./City.module.css";
import CityItem from "./CityItems";
import Spinner from "./Spinner";
import Message from "./Message";
const CityList = ({ cityList, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (!cityList.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={Styles.cityList}>
      {cityList.map((city, index) => (
        <CityItem city={city} key={index} />
      ))}
    </ul>
  );
};

export default CityList;
