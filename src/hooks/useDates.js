import { useState, useEffect } from "react";
import { getMinMaxDates, timestampZeroSeconds } from "../utils/date";

export function useDates(tags) {
  const [datesQuery, setDatesQuery] = useState({});
  const [initialDates, setInitialDates] = useState({});

  useEffect(() => {
    // dates selection
    if (tags && tags.length !== 0) {
      const { minDate, maxDate } = getMinMaxDates(tags);
      setInitialDates({ minDate, maxDate });
      setDatesQuery({ minDate: timestampZeroSeconds(maxDate), maxDate });
    }
  }, [tags]);

  return { datesQuery, setDatesQuery, initialDates };
}
