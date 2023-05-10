import { useState } from "react";
import useSWR, { preload } from "swr";
import { fetchAllTags } from "../utils/fetch";

const fetchUrl =
  "https://us-central1-dreampen-2273f.cloudfunctions.net/getLiveTagsCached";

preload(fetchUrl, fetchAllTags);

export function useTags() {
  const [tags, setTags] = useState([]);
  
  const { data, error, isLoading } = useSWR(fetchUrl, fetchAllTags);
  const [previousData, setPreviousData] = useState([]);
  if (data !== previousData) {
    setTags(data);
    setPreviousData(data);
  }

  return { tags, error, isLoading };
}
