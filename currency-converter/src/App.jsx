import { useEffect, useState } from "react";

import "./App.css";

function App() {
  return (
    <div>
      <Converter />
    </div>
  );
}

const Converter = () => {
  const [fromname, setFromName] = useState("USD");
  const [toname, setToName] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const host = "api.frankfurter.app";
        const res = await fetch(
          `https://${host}/latest?amount=${amount}&from=${fromname}&to=${toname}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setValue(data.rates[toname]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [amount, fromname, toname]);

  return (
    <>
      <div>
        {fromname === toname && <h1>currency are same</h1>}
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <select value={fromname} onChange={(e) => setFromName(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={toname} onChange={(e) => setToName(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <h1>{isLoading ? "loading" : value}</h1>
      </div>
    </>
  );
};
export default App;
