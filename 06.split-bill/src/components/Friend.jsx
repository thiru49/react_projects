import { Button } from "./Button";

export const Friend = ({ friend, SelectFriend, selectedFriend }) => {
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
            You Owe {friend.name} RS:{Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="text-green-600">
            {friend.name} owns you RS:{Math.abs(friend.balance)}
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
