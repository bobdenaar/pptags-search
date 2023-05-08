import { useEffect, useState } from "react";

import "./DateControls.css";

export function DateControls({ onDateChange, datesQuery, initialDates }) {
  // console.log({ datesQuery, initialDates });

  return (
    <div className="date-controls">
      <label htmlFor="start">
        Start date:{" "}
        <input
          type="date"
          id="start"
          name="start-date"
          // defaultValue={timestampToISODate(initialDates.minDate)}
          value={timestampToISODate(datesQuery.minDate) || ""}
          onChange={(e) =>
            onDateChange((previousDatesQuery) => ({
              ...previousDatesQuery,
              minDate: +new Date(e.target.value),
            }))
          }
          min={timestampToISODate(initialDates?.minDate) || ""}
          max={timestampToISODate(initialDates?.maxDate) || ""}
        />
      </label>{" "}
      <label htmlFor="end">
        End date:{" "}
        <input
          type="date"
          id="end"
          name="end-date"
          // defaultValue={timestampToISODate(initialDates.maxDate)}
          value={timestampToISODate(datesQuery.maxDate) || ""}
          onChange={(e) =>
            onDateChange((previousDatesQuery) => ({
              ...previousDatesQuery,
              maxDate: +new Date(e.target.value),
            }))
          }
          min={timestampToISODate(initialDates?.minDate) || ""}
          max={timestampToISODate(initialDates?.maxDate) || ""}
        />
      </label>
    </div>
  );
}

function timestampToISODate(timestamp) {
  if (timestamp) return new Date(timestamp).toISOString().split("T")[0];
}
