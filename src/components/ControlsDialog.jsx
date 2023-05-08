import { useState } from "react";

import { DateControls } from "./DateControls";

import "./ControlsDialog.css";

export function ControlsDialog({ onDateChange, datesQuery, initialDates }) {
  const [show, setShow] = useState(false);

  if (!show) {
    return <button onClick={() => setShow(true)}>Show search controls</button>;
  }

  return (
    <dialog open>
      <p>Greetings, one and all!</p>
      {/* date pickers */}
      <DateControls
        onDateChange={onDateChange}
        datesQuery={datesQuery}
        initialDates={initialDates}
      />
      <button onClick={() => setShow(false)}>OK</button>
    </dialog>
  );
}
