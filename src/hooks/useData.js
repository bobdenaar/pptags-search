import { useEffect, useState } from "react";
import { fetchAllTags } from "../utils/fetch";

export function useData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // fetch most recent tags data
    const fetchData = async () => {
      const tagsData = await fetchAllTags();
      if (!ignore) {
        setData(tagsData);
      }
    };

    let ignore = false;
    fetchData();

    return () => (ignore = true);
  }, []);

  return data;
}
