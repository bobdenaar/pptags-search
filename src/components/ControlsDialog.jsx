import { useState } from "react";

import { DateControls } from "./DateControls";

import { titleCase } from "../utils/string";

import "./ControlsDialog.css";

export function ControlsDialog({
  onDateChange,
  datesQuery,
  initialDates,
  categories,
  owners,
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
      
      <label htmlFor="category">
        Categories{" "}
        <select id="category" name="category">
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {titleCase(category)}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="owner">
        Tag Artists{" "}
        <select name="owner">
          <option value="All">All</option>
          {owners.map((owner) => (
            <option key={owner} value={owner}>
              {owner}
            </option>
          ))}
        </select>
      </label>

      <button onClick={() => setShow(false)}>OK</button>
    </dialog>
  );
}
