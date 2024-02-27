import { useState } from "react";

export const Form = ({ onAddItems }) => {
  const [description, setDes] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDes("");
    setQuantity(1);
  };
  return (
    <form
      className="bg-amber-600 flex justify-center gap-4  items-center"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p className="text-xl">what do you need for your trip?</p>
      <div className="flex items-center justify-center gap-2">
        <select
          className="bg-amber-200 px-4 rounded-md py-2"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          className="bg-amber-200 text-black px-4 py-2 rounded-md"
          value={description}
          onChange={(e) => setDes(e.target.value)}
        />
        <button className="bg-blue-600 px-4 py-2 rounded-lg ">Add</button>
      </div>
    </form>
  );
};
