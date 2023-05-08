import { useEffect } from "react";
import { db } from "../utils/db";

export function useDb(data) {
  useEffect(() => {
    if (data && data.length !== 0) {
      const updateDb = async () => {
        try {
          if (!ignore) {
            const updates = await db.tags.bulkPut(data, { allKeys: true });
            console.log(
              `Database bulk update result: ${updates.length} tags updated.`
            );
          }
        } catch (error) {
          console.log(`Database bulk update failed: ${error}.`);
          throw error;
        }
      };

      // update dexie database
      let ignore = false;
      updateDb();

      return () => (ignore = true);
    }
  }, [data]);

  return db;
}
