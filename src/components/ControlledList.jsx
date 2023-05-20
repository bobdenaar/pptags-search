import { useState } from "react";
import { useDates } from "../hooks/useDates";

import { ControlsDialog } from "./ControlsDialog";
import { Spinner } from "./Spinner";
import { TagsList } from "./TagsList";

export function ControlledList({ tags, isLoading }) {
  const { datesQuery, setDatesQuery, initialDates } = useDates(tags);
  const [displayedGroup, setDisplayedGroup] = useState("date");

  return (
    <>
      <ControlsDialog
        onDateChange={setDatesQuery}
        datesQuery={datesQuery}
        initialDates={initialDates}
        displayedGroup={displayedGroup}
        onGroupChange={setDisplayedGroup}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <TagsList
          key="tagsList"
          tags={tags}
          initialDates={initialDates}
          datesQuery={datesQuery}
          displayedGroup={displayedGroup}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
