export function getMinMaxDates(data) {
  if (!data || data.length === 0) return [];

  // get min and max date
  let minDate, maxDate;
  const oldest = data.reduce((a, b) => {
    const timeA = a.liveDate ? a.liveDate._seconds : Infinity;
    const timeB = b.liveDate ? b.liveDate._seconds : Infinity;
    if (Math.min(timeA, timeB) === timeA) {
      return a;
    }
    return b;
  });
  const latest = data.reduce((a, b) => {
    const timeA = a.liveDate ? a.liveDate._seconds : -Infinity;
    const timeB = b.liveDate ? b.liveDate._seconds : -Infinity;
    if (Math.max(timeA, timeB) === timeA) {
      return a;
    }
    return b;
  });
  minDate = timestampZeroSeconds(oldest.liveDate._seconds * 1000);
  maxDate = timestampBeforeMidnight(latest.liveDate._seconds * 1000);

  return { minDate, maxDate };
}

export function timestampZeroSeconds(timestamp) {
  // take timestamp and return timestamp of the same day at 00:00:00
  const date = new Date(timestamp);
  date.setUTCHours(0, 0, 0, 0);
  return date.getTime();
}

export function timestampBeforeMidnight(timestamp) {
  // take timestamp and return timestamp of the day before midnight
  const date = new Date(timestamp);
  date.setUTCHours(23, 59, 59, 999);
  return date.getTime();
}

export function timestampToISODate(timestamp) {
  if (timestamp) return new Date(timestamp).toISOString().split("T")[0];
}
