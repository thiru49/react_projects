// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState } from "react";

import DatePicker from "react-datepicker";
import { useUrlPosition } from "../hook/useUrlPosition";
import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

import styles from "./Form.module.css";
import ButtonBack from "./ButtonBack";
import Button from "./Button";

import Message from "./Message";
import Spinner from "./Spinner";
import { useCites } from "../context/CitesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCites();
  console.log(lat);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingPosition, setIsLoadingPosition] = useState(false);
  const [errorgetPosition, seterrorgetPosition] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGeopositon = async () => {
      if (!lat && !lng) return;
      try {
        setIsLoadingPosition(true);
        seterrorgetPosition("");
        const res = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();
        console.log(data);
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city.please click somwhere"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        seterrorgetPosition(error.message);
      } finally {
        setIsLoadingPosition(false);
      }
    };
    fetchGeopositon();
  }, [lat, lng]);
  if (isLoadingPosition) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  if (errorgetPosition) return <Message message={errorgetPosition} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCity = {
      cityName,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    };
    await createCity(newCity);
    navigate("/app/cities");
  };
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
