import { useContext, useReducer } from "react";

import { createContext, useState, useEffect } from "react";

const BaseUrl = "http://localhost:4000";

const CitesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "cities/loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "getcurrentcity":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "createCity":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "deleteCity":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown Action");
  }
};
const CitesProvider = ({ children }) => {
  /* const [city, setCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({}); */
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "cities/loading" });
    const fetchCity = async () => {
      try {
        const res = await fetch(`${BaseUrl}/cities`);
        const data = await res.json();
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "there was error on geting cities data",
        });
      }
    };
    fetchCity();
  }, []);

  const getCity = async (id) => {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(`${BaseUrl}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "getcurrentcity", payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  const createCity = async (newCity) => {
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(`${BaseUrl}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      const data = await res.json();
      dispatch({
        type: "createCity",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was error on creating new city",
      });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "cities/loading" });
    try {
      const res = await fetch(`${BaseUrl}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "deleteCity", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error delete the city",
      });
    }
  };

  return (
    <CitesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
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
