import { Friend } from "./Friend";

export const FriendsList = ({ friends, SelectFriend, selectedFriend }) => {
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
