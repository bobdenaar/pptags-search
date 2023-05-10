export function filterByDates(data, datesQuery) {
  let filteredData = [];
  if (data) {
    filteredData = data.filter((tag) => {
      if (!tag.liveDate) return false; // TODO: handle null case
      const tagTimestamp = tag.liveDate._seconds * 1000;
      // console.log("tag timestamp:", tagTimestamp);
      return (
        tagTimestamp >= datesQuery.minDate && tagTimestamp <= datesQuery.maxDate
      );
    });
  }

  return filteredData;
}
