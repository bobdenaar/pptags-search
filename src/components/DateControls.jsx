import { timestampBeforeMidnight, timestampToISODate, timestampZeroSeconds } from "../utils/date";

export function DateControls({ onDateChange, datesQuery, initialDates }) {
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
              minDate: timestampZeroSeconds(+new Date(e.target.value)),
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
              maxDate: timestampBeforeMidnight(+new Date(e.target.value)),
            }))
          }
          min={timestampToISODate(initialDates?.minDate) || ""}
          max={timestampToISODate(initialDates?.maxDate) || ""}
        />
      </label>
    </div>
  );
}
