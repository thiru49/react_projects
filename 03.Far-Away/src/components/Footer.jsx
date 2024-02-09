import React from "react";

const Footer = ({ Items }) => {
  const numOfItems = Items.length;
  if (!numOfItems) {
    return (
      <footer className="bg-blue-300 p-4 flex justify-center items-center text-xl font-mono">
        <em>{!numOfItems && `Start adding items to your packing list`}</em>
      </footer>
    );
  }
  const packedItems = Items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numOfItems) * 100);
  return (
    <footer className="bg-blue-300 p-4 flex justify-center items-center text-xl font-mono">
      <em>
        {percentage === 100
          ? `You got everthing! Ready to go ->`
          : `You have ${numOfItems} item on your cart list, and you already packed ${packedItems}(${percentage}%)`}
      </em>
    </footer>
  );
};

export default Footer;
