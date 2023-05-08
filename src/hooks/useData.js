import useSWR from "swr";
import { fetchAllTags } from "../utils/fetch";

const fetchUrl =
  "https://us-central1-dreampen-2273f.cloudfunctions.net/getLiveTagsCached";

export function useData() {
  const { data, error, isLoading } = useSWR(fetchUrl, fetchAllTags)

  return { data, error, isLoading }
}
