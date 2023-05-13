export function GroupControls({ onGroupChange }) {
  // React component for the group controls
  // two buttons radio input, one for category, one for owners

  return (
    <div className="group-controls">
      Group by:{" "}
      <label htmlFor="group-category">
        <input
          type="radio"
          name="group"
          id="group-category"
          value="category"
          onChange={() => onGroupChange("category")}
        />
        Categories
      </label>
      <label htmlFor="group-owner">
        <input
          type="radio"
          name="group"
          id="group-owner"
          value="owner"
          onChange={() => onGroupChange("owner")}
        />
        Tag Artists
      </label>
    </div>
  );
}
