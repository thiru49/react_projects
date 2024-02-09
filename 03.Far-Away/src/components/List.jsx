import { useState } from "react";

import Item from "./Item";

export const List = ({ items, onDeleteItems, onToggle, clearList }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="row-span-5 bg-amber-950 text-amber-300 p-8 flex flex-col items-center justify-between">
      <ul className="grid grid-cols-3 gap-4">
        {sortedItems.map((item, index) => (
          <Item
            item={item}
            key={index}
            onDeleteItems={onDeleteItems}
            onToggle={onToggle}
          />
        ))}
      </ul>
      <div className="flex gap-2">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-amber-200 px-4 rounded-md py-2 text-black transition-all"
        >
          <option value="input">Sort By Input</option>
          <option value="description">Sort By Items</option>
          <option value="packed">Sort By PackedItems</option>
        </select>
        <button
          onClick={clearList}
          className="bg-amber-200 px-4 rounded-md py-2 text-black transition-all"
        >
          Clear List
        </button>
      </div>
    </div>
  );
};
