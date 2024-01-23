import { useState } from "react";

export const Rating = () => {
  const [value, setValue] = useState(0);
  const [mouse, setMouse] = useState(0);
  return (
    <div className="m-2 flex items-center justify-center">
      {Array.from({ length: 10 }, (_, i) => (
        <Rate
          key={i + 1}
          rating={() => setValue(i + 1)}
          full={mouse ? mouse >= i + 1 : value >= i + 1}
          onMoveon={() => setMouse(i + 1)}
          onMoveOff={() => setMouse(0)}
        />
      ))}

      <p className="ml-2 text-xl text-bold text-yellow-400">
        {mouse || value || ""}
      </p>
    </div>
  );
};

const Rate = ({ rating, full, onMoveon, onMoveOff }) => {
  return (
    <>
      {full ? (
        <svg
          class="size-8 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={rating}
          onMouseEnter={onMoveon}
          onMouseLeave={onMoveOff}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M9.05 11.293l-3.316 2.053.558-3.254L3.5 7.36l3.263-.474L9.05 3.5l1.447 3.386 3.263.474-2.397 2.732.558 3.254-3.316-2.053z"
          ></path>
        </svg>
      ) : (
        <svg
          class="size-8 text-yello-600"
          fill="full"
          stroke="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={rating}
          onMouseEnter={onMoveon}
          onMouseLeave={onMoveOff}
        >
          <path
            className=""
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M9.05 11.293l-3.316 2.053.558-3.254L3.5 7.36l3.263-.474L9.05 3.5l1.447 3.386 3.263.474-2.397 2.732.558 3.254-3.316-2.053z"
          ></path>
        </svg>
      )}
    </>
  );
};
