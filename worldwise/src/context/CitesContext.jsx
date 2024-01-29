import { useContext } from "react";
import { Children } from "react";
import { createContext, useState, useEffect } from "react";

const BaseUrl = "http://localhost:4000";

const CitesContext = createContext();

const CitesProvider = ({ children }) => {
  const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BaseUrl}/cities`);
        setCity(await res.json());
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCity();
  }, []);

  const getCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BaseUrl}/cities/${id}`);
      setCurrentCity(await res.json());
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const createCity = async (newCity) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BaseUrl}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      const data = await res.json();
      setCity((x) => [...x, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (id) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${BaseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      setCity((x) => x.filter((city) => city.id !== id));
    } catch (error) {
      alert("there was an error delete the city");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitesContext.Provider
      value={{ city, isLoading, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitesContext.Provider>
  );
};
const useCites = () => {
  const context = useContext(CitesContext);
  if (!context)
    throw new Error("cites context was called outside of the Provider");
  return context;
};
export { CitesProvider, useCites };
