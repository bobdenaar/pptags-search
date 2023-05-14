import { useState } from "react";

import { DateControls } from "./DateControls";
import { GroupControls } from "./GroupControls";

import "./ControlsDialog.css";

export function ControlsDialog({
  onDateChange,
  datesQuery,
  initialDates,
  displayedGroup,
  onGroupChange,
}) {
  const [show, setShow] = useState(false);

  if (!show) {
    return <button onClick={() => setShow(true)}>Show search controls</button>;
  }

  return (
    <dialog open>
      <DateControls
        onDateChange={onDateChange}
        datesQuery={datesQuery}
        initialDates={initialDates}
      />
      <GroupControls
        displayedGroup={displayedGroup}
        onGroupChange={onGroupChange}
      />
      <button onClick={() => setShow(false)}>OK</button>
    </dialog>
  );
}
