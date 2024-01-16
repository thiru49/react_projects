import { useState } from "react";
import "./App.css";

function App() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(true);
  const data = [
    "welcome",
    "Learn the React",
    "Develop single page appliaction",
  ];
  return (
    <>
      <button
        className="bg-slate-200 hover:bg-red-500 p-2 block mx-auto my-5 rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? "close" : "open"}
      </button>
      {open && (
        <div className="flex flex-col justify-center items-center  w-[300px] shadow-xl rounded-lg sm:w-[600px] my-20 mx-auto bg-slate-100 p-1 gap-4">
          <ul className="flex justify-between w-full p-4 border-b-4">
            <li
              className={`${
                step === 1 ? "bg-purple-500" : "bg-slate-200"
              } p-4 flex justify-center items-center rounded-full`}
            >
              1
            </li>
            <li
              className={`${
                step === 2 ? "bg-purple-500" : "bg-slate-200"
              } p-4 flex justify-center items-center rounded-full`}
            >
              2
            </li>
            <li
              className={`${
                step === 3 ? "bg-purple-500" : "bg-slate-200"
              } p-4 flex justify-center items-center rounded-full`}
            >
              3
            </li>
          </ul>
          <p className="text-xl font-mono font-semibold">
            Step {step}: {data[step == 1 ? 0 : step]}
          </p>
          <div className="flex justify-between w-full mt-4 p-4">
            <button
              onClick={() => {
                if (step > 0) return setStep((p) => p - 1);
              }}
              className={`p-2 hover:bg-red-200 bg-purple-600 text-white rounded-xl`}
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (step < 3) return setStep((p) => p + 1);
              }}
              className={`p-2 hover:bg-red-200 bg-purple-600 text-white rounded-xl`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
