import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [close, setclose] = useState(false);
  const [showSelectedFriend, setSelectedFriend] = useState(null);

  const addFriends = (newfriend) => {
    setFriends((friends) => [...friends, newfriend]);
    setclose(!close);
  };

  const handleSelectFriend = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  };

  return (
    <div
      className="flex flex-col sm:flex-row justify-start
    items-start m-4 sm:m-10 gap-4"
    >
      <div className="basis-1/2 flex flex-col justify-end items-end gap-4">
        <FriendsList
          friends={friends}
          SelectFriend={handleSelectFriend}
          selectedFriend={showSelectedFriend}
        />
        <AddFriendList
          addFriends={addFriends}
          close={close}
          setclose={setclose}
        />
      </div>

      {showSelectedFriend && (
        <SplitAmount showSelectedFriend={showSelectedFriend} />
      )}
    </div>
  );
}
const FriendsList = ({ friends, SelectFriend, selectedFriend }) => {
  return (
    <ul className="flex flex-col gap-2">
      {friends.map((friend) => (
        <Friend
          friend={friend}
          SelectFriend={SelectFriend}
          key={friend.id}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};
const Friend = ({ friend, SelectFriend, selectedFriend }) => {
  const selected = friend.id === selectedFriend?.id;
  return (
    <li
      key={friend.id}
      className={`flex justify-between items-center gap-4 bg-slate-200 p-2 rounded-md shadow-md px-4 ${
        selected ? "bg-red-200" : ""
      }`}
    >
      <img src={friend.image} alt={`${friend.name}`} className="rounded-full" />
      <div>
        <h3 className="font-bold">{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="text-red-700">
            You Owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance > 0 && (
          <p className="text-green-600">
            {friend.name} owns you {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      </div>
      <Button onClick={() => SelectFriend(friend)}>
        {selected ? "Close" : "Select"}
      </Button>
    </li>
  );
};
const Button = ({ children, onClick }) => {
  return (
    <button
      className="p-1.5 bg-amber-600 font-serif font-bold rounded-md text-sm hover:bg-amber-300 transition-all "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
const AddFriendList = ({ addFriends, close, setclose }) => {
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

const SplitAmount = ({ showSelectedFriend }) => {
  return (
    <form className=" bg-red-200 basis-1/2 flex flex-col gap-4 h-[300px] shadow rounded-sm">
      <h2 className="font-bold text-center p-2 text-xl">
        Split a bill with {showSelectedFriend.name}
      </h2>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">Bill Value</label>
        <input type="text" className="basis-1/3" />
      </div>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">Your expense</label>
        <input type="text" className="basis-1/3" />
      </div>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">
          <span className="font-bold">{showSelectedFriend.name}'s</span> expense
        </label>
        <input type="text" className="basis-1/3" disabled />
      </div>
      <div className="flex flex-row px-3">
        <label className="basis-2/3">who is paying the bill</label>
        <select type="text" className="basis-1/3 shadow rounded-sm text-center">
          <option value="user">You</option>
          <option value="friend">X</option>
        </select>
      </div>
      <div className="flex justify-end items-center px-6">
        <Button>Split-bill</Button>
      </div>
    </form>
  );
};

export default App;
