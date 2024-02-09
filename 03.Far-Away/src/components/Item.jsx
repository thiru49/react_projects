import React from "react";

const Item = ({ item, onDeleteItems, onToggle }) => {
  return (
    <li className="flex gap-4">
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggle(item.id)}
      />
      <span className={`${!item.packed && "line-through"}`}>
        {item.quantity}:{item.description}
      </span>

      <button className="bg-red-600" onClick={() => onDeleteItems(item.id)}>
        D
      </button>
    </li>
  );
};

export default Item;
