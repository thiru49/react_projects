import React from "react";
import { pizzaData } from "../data/data";
const Menu = () => {
  return (
    <div className="mt-8 text-center flex flex-col items-center justify-center">
      <h1 className="border-y-2 border-black p-2 text-2xl">Our Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {pizzaData.map((data, index) => (
          <Pizzo dataObj={data} key={index} />
        ))}
      </div>
    </div>
  );
};

const Pizzo = (props) => {
  return (
    <div className="mt-8 flex flex-row p-2 gap-2">
      <img
        src={props.dataObj.photoName}
        alt=""
        className="w-[120px] h-[120px]"
      />

      <div className="flex flex-col gap-2 justify-start w-[100px]">
        <h3 className="text-xl font-semibold">{props.dataObj.name}</h3>
        <p>{props.dataObj.ingredients}</p>
        <span className="mt-6 ">`price:${props.dataObj.price}`</span>
        <input type="checkbox" value={props.dataObj.soldOut} />
      </div>
    </div>
  );
};
export default Menu;
