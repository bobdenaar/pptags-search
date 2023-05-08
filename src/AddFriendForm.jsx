import { useState } from "react";
import { db } from "./db";

export function AddFriendForm({ defaultAge } = { defaultAge: 21 }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState(defaultAge);
  const [status, setStatus] = useState("");

  async function addFriend() {
    try {
      const id = await db.friends.add({
        name,
        age,
      });

      setStatus(`Friend ${name} successfully added. Got id ${id}.`);
      setName("");
      setAge(defaultAge);
    } catch (error) {
      setStatus(`Failed to add ${name}: ${error}.`);
    }
  }

  return (
    <>
      <p>{status}</p>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="text"
          value={age}
          onChange={(ev) => setAge(Number(ev.target.value))}
        />
      </label>
      <button onClick={addFriend}>Add</button>
    </>
  );
}
