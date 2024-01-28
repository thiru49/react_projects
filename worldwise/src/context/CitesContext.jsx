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

  return (
    <CitesContext.Provider value={{ city, isLoading, currentCity, getCity }}>
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
