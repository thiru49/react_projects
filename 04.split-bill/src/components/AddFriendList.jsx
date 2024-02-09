import { useState } from "react";
import { Button } from "./Button";
export const AddFriendList = ({ addFriends, close, setclose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=118836");
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = crypto.randomUUID();
    const newName = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    addFriends(newName);
  };
  return (
    <>
      {!close && (
        <form
          className="mt-6 bg-red-200 grid grid-cols-2 gap-4 p-2 rounded-md shadow-md"
          onSubmit={handleSubmit}
        >
          <label className="text-end text-xl">FriendName:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-200 col-span-1.5"
          />
          <label className="text-end text-xl">Image Url:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="bg-slate-200 col-span-1.5"
          />
          <div />
          <Button>Add</Button>
        </form>
      )}
      <Button onClick={() => setclose(!close)}>
        {close ? "Add Friend" : "Close"}
      </Button>
    </>
  );
};
