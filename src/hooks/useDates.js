import { useState, useEffect } from "react";
import { getMinMaxDates } from "../utils/date";

export function useDates(tags) {
  const [datesQuery, setDatesQuery] = useState({});
  const [initialDates, setInitialDates] = useState({});

  useEffect(() => {
    // dates selection
    if (tags && tags.length !== 0) {
      const computedDates = getMinMaxDates(tags);
      setInitialDates(computedDates);
      setDatesQuery(computedDates);
    }
  }, [tags]);

  return { datesQuery, setDatesQuery, initialDates };
}
