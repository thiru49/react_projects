import { useState } from "preact/hooks";
import preactLogo from "./assets/preact.svg";
import viteLogo from "/vite.svg";
import "./app.css";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Rating />
    </>
  );
}

const Rating = () => {
  const [value, setValue] = useState(0);
  const [mouse, setMouse] = useState(0);
  return (
    <div className="m-4 flex items-center">
      {Array.from({ length: 10 }, (_, i) => (
        <Rate
          key={i + 1}
          rating={() => setValue(i + 1)}
          full={mouse ? mouse >= i + 1 : value >= i + 1}
          onMoveon={() => setMouse(i + 1)}
          onMoveOff={() => setMouse(0)}
        />
      ))}

      <p className="ml-4 text-xl">{mouse || value || ""}</p>
    </div>
  );
};

const Rate = ({ rating, full, onMoveon, onMoveOff }) => {
  return (
    <>
      {full ? (
        <div
          className="size-5 bg-yellow-300 mr-1"
          onClick={rating}
          onMouseEnter={onMoveon}
          onMouseLeave={onMoveOff}
        ></div>
      ) : (
        <div
          className="size-5 bg-black mr-1"
          onClick={rating}
          onMouseEnter={onMoveon}
          onMouseLeave={onMoveOff}
        ></div>
      )}
    </>
  );
};
