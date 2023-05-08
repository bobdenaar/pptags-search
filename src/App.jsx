import { useEffect, useState } from "react";

import { useData } from "./hooks/useData";
import { useDb } from "./hooks/useDb";

import { ControlsDialog } from "./components/ControlsDialog";

import "./App.css";

function App() {
  // download tags data from pp
  const { data, error, isLoading } = useData();

  const [datesQuery, setDatesQuery] = useState({});

  // TODO: compute groups for select options

  let initialDates;
  useEffect(() => {
    // dates selection
    if (data && data.length !== 0) {
      const [minDate, maxDate] = getMinMaxDates(data);
      initialDates = { minDate, maxDate };
      setDatesQuery(initialDates);
    }
  }, [data]);

  // console.log(datesQuery);

  let filteredData;
  if (data) {
    filteredData = data.filter((tag) => {
      let tagTimestamp = datesQuery.minDate;
      if (tag.liveDate) {
        tagTimestamp = tag.liveDate._seconds * 1000;
      }
      // console.log("tag timestamp:", tagTimestamp);
      return (
        tagTimestamp >= datesQuery.minDate && tagTimestamp <= datesQuery.maxDate
      );
    });
    filteredData.sort((tagA, tagB) => {
      const nameA = tagA.name.trim().toLowerCase();
      const nameB = tagB.name.trim().toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  return (
    <>
      <h1>Pornpen Community Tags Search Tool</h1>
      {/* controls */}
      <ControlsDialog
        onDateChange={setDatesQuery}
        datesQuery={datesQuery}
        initialDates={initialDates}
      />
      {/* tags list */}
      {!isLoading && (<><p>Displaying {filteredData?.length} tags.</p>
        <ul>
          {filteredData.map((tag) => (
            <li key={tag.id}>
              <a href={`https://pornpen.art/tags/view/${tag.id}`}>{titleCase(tag.name)}</a>
            </li>
          ))}
        </ul></>)}
    </>
  );
}

export default App;

function getMinMaxDates(data) {
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
  minDate = Date.parse(new Date(oldest.liveDate._seconds * 1000));
  maxDate = Date.parse(
    new Date(latest.liveDate._seconds * 1000 + 24 * 3600 * 1000 - 1)
  );

  // console.log({ minDate, maxDate });
  return [minDate, maxDate];
}

function titleCase(tagname) {
  // remove underscore, split words
  const words = tagname.trim().split(/[\s_]+/);

  // title case
  words.forEach((word, index) => {
    try {
      const titleCased = word[0].toUpperCase() + word.slice(1);
      words[index] = titleCased;
    } catch (error) {
      console.log("error parsing word", word, "in string'", tagname, "':");
    }
  });

  return words.join(" ");
}
