export function filterByDates(data, datesQuery) {
  if (!data || !datesQuery.minDate) return [];

  // sanity check
  // log minDate and maxDate to console, convert to ISO string
  console.log(
    "minDate:",
    new Date(datesQuery.minDate).toISOString()
  );
  console.log(
    "maxDate:",
    new Date(datesQuery.maxDate).toISOString()
  );

  const minDateSeconds = datesQuery.minDate / 1000;
  let filteredData = [];

  if (data) {
    filteredData = data.filter((tag) => {
      // handle unknown dates: if no liveDate, use minDate
      if (!tag.liveDate) {
        tag.liveDate = { _seconds: minDateSeconds };
      }
      const tagTimestamp = tag.liveDate._seconds * 1000;
      return (
        tagTimestamp >= datesQuery.minDate && tagTimestamp <= datesQuery.maxDate
      );
    });
  }

  return filteredData;
}
