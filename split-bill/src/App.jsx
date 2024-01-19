import { useState } from "react";
import { FriendsList } from "./components/FriendList";
import { AddFriendList } from "./components/AddFriendList";
import { SplitAmount } from "./components/SplitAmount";

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

  const splitAmount = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === showSelectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
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
        <SplitAmount
          showSelectedFriend={showSelectedFriend}
          splitAmount={splitAmount}
          key={showSelectedFriend.id}
        />
      )}
    </div>
  );
}

export default App;
