import Dexie from "dexie";

export const db = new Dexie("ppTags");
db.version(1).stores({
  tags: "id, name, category, description, numSaves, imageUrl, ownerUsername, liveData, featured",
});
