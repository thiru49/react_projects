import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import { useEffect } from "react";

const BaseUrl = "http://localhost:8000";

function App() {
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BaseUrl}/cities`);
        setCityList(await res.json());
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCity();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="Pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route
              index
              element={<CityList isLoading={isLoading} cityList={cityList} />}
            />
            <Route
              path="cities"
              element={<CityList isLoading={isLoading} cityList={cityList} />}
            />
            <Route path="countries" element={<h1>2</h1>} />
            <Route path="form" element={<h1>3</h1>} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
