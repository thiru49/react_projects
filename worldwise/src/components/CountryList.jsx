import React from "react";
import Styles from "./countryList.module.css";
import Countryitem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";

const CountryList = ({ cityList, isLoading }) => {
  console.log(cityList);
  if (isLoading) return <Spinner />;
  if (!cityList?.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  const countries = cityList.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  console.log(countries);
  return (
    <ul className={Styles.countryList}>
      {countries.map((country, index) => (
        <Countryitem country={country} key={index} />
      ))}
    </ul>
  );
};

export default CountryList;
