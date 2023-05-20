export function GroupControls({ displayedGroup, onGroupChange }) {
  // React component for the group controls
  // two buttons radio input, one for category, one for owners

  return (
    <div className="group-controls">
      Group by:{" "}
      <label htmlFor="group-date">
        <input
          type="radio"
          name="group"
          id="group-date"
          value="date"
          checked={displayedGroup === "date"}
          onChange={() => onGroupChange("date")}
        />
        Release Date
      </label>
      <label htmlFor="group-category">
        <input
          type="radio"
          name="group"
          id="group-category"
          value="category"
          checked={displayedGroup === "category"}
          onChange={() => onGroupChange("category")}
        />
        Category
      </label>
      <label htmlFor="group-owner">
        <input
          type="radio"
          name="group"
          id="group-owner"
          value="owner"
          checked={displayedGroup === "owner"}
          onChange={() => onGroupChange("owner")}
        />
        Tag Artist
      </label>
      <label htmlFor="group-none">
        <input
          type="radio"
          name="group"
          id="group-none"
          value="none"
          checked={displayedGroup === "none"}
          onChange={() => onGroupChange("none")}
        />
        Don't group
      </label>
    </div>
  );
}
