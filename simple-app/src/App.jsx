import { useState } from "react";
import "./App.css";
import Simple from "./compents/Simple";

function App() {
  return (
    <>
      <Simple />
      <Bill />
    </>
  );
}

const Bill = () => {
  const [bill, setBill] = useState("");
  const [tip1, SetTip1] = useState("");
  const [tip2, SetTip2] = useState("");
  let average = Math.round((tip1 + tip2) / 2);
  let Tip = Math.round((bill / 100) * average);
  let Total = Tip + bill;

  return (
    <div className="text-center bg-slate-200">
      <p>
        How much was the bill?
        <input
          type="number"
          className="border-2 border-black "
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </p>
      <div>
        <p>How did you like the service?</p>
        <select value={tip1} onChange={(e) => SetTip1(Number(e.target.value))}>
          <option value={10}>It was Good (10%)</option>
          <option value={20}>Absolutly amazing (20%)</option>
          <option value={0}>Its not enough (10%)</option>
        </select>
      </div>
      <div>
        <p>How did your friend like the service?</p>
        <select value={tip2} onChange={(e) => SetTip2(Number(e.target.value))}>
          <option value={10}>It was Good (10%)</option>
          <option value={20}>Absolutly amazing (20%)</option>
          <option value={0}>Its not enough (10%)</option>
        </select>
      </div>
      <h1>
        Total Bill: ${Total}{" "}
        <span className="mx-4">( {bill ? `$${bill}+$${Tip} tip` : 0})</span>
      </h1>
      <button
        className=" bg-gray-500 p-1 text-white"
        onClick={() => {
          setBill("");
          SetTip1("");
          SetTip2("");
        }}
      >
        Reset
      </button>
    </div>
  );
};
export default App;
