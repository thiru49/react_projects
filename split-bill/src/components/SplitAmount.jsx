import { useState } from "react";
import { Button } from "./Button";

export const SplitAmount = ({ showSelectedFriend, splitAmount }) => {
  const [bill, setBill] = useState(0);
  const [paidByuser, setPaid] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const expence = bill ? bill - paidByuser : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const split = whoIsPaying === "user" ? expence : -paidByuser;

    splitAmount(split);
  };
  return (
    <form
      className=" bg-red-200 basis-1/2 flex flex-col gap-4 h-[300px] shadow rounded-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="font-bold text-center p-2 text-xl">
        Split a bill with {showSelectedFriend.name}
      </h2>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">Bill Value</label>
        <input
          type="text"
          className="basis-1/3 text-center"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">Your expense</label>
        <input
          type="text"
          className="basis-1/3 text-center"
          value={paidByuser}
          onChange={(e) =>
            setPaid((c) =>
              Number(e.target.value) > bill ? c : Number(e.target.value)
            )
          }
        />
      </div>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">
          <span className="font-bold text-center">
            {showSelectedFriend.name}'s
          </span>{" "}
          expense
        </label>
        <input
          type="text"
          className="basis-1/3 text-center"
          disabled
          value={expence}
        />
      </div>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">who is paying the bill</label>
        <select
          type="text"
          className="basis-1/3 shadow rounded-sm text-center"
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value={`${showSelectedFriend.name}`}>
            {showSelectedFriend.name}
          </option>
        </select>
      </div>
      <div className="flex justify-end items-center px-6">
        <Button>Split-bill</Button>
      </div>
    </form>
  );
};
