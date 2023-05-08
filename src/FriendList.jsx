import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./db";

export function FriendList({ minAge, maxAge }) {
  const friends = useLiveQuery(async () => {
    const friends = await db.friends
      .where("age")
      .between(minAge, maxAge)
      .toArray();

    return friends;
  }, [minAge, maxAge]);

  return (
    <ul>
      {friends?.map((friend) => (
        <li key={friend.id}>
          {friend.name}, {friend.age}
        </li>
      ))}
    </ul>
  );
}
