import { TagsGroup } from "./TagsGroup";

import { filterByDates } from "../utils/filter";
import { getGroupedByProperty } from "../utils/group";
import { alphabeticalSort, tagsAlphabeticalSort } from "../utils/sort";
import { titleCase } from "../utils/string";

import "./TagsList.css";

export function TagsList({ tags, initialDates, datesQuery, displayedGroup }) {
  if (!tags) return null;

  const startTime = Date.now();

  const filteredTags = filterByDates(tags, datesQuery, initialDates).sort(tagsAlphabeticalSort);
  if (filteredTags.length === 0) return null;

  const groups = makeGroupLists(filteredTags, displayedGroup);

  const elapsed = Date.now() - startTime;
  console.log(`TagsList took ${elapsed}ms to render.`);

  return (
    <>
      <p>Displaying {filteredTags?.length} tags.</p>
      <ul>{groups}</ul>
    </>
  );
}

// takes a list of tags and a group name
// returns a list of tag groups sorted alphabetically

function makeGroupLists(tags, groupName) {
  if (groupName === "none")
    return <TagsGroup groupName={"All tags"} tags={tags} />;

  const tagsMap = new Map();
  for (const tag of tags) {
    tagsMap.set(tag.id, tag);
  }

  if (groupName === "owner") groupName = "ownerUsername";
  const tagIdsByGroup = getGroupedByProperty(tags, groupName);

  return Object.entries(tagIdsByGroup)
    .filter((group) => group !== null)
    .map(([group, tagIds]) => {
      const tags = tagIds.map((tagId) => tagsMap.get(tagId));

      if (tags.length === 0) return null;
      // handle ownerUsername being empty
      if (groupName === "ownerUsername" && group === "")
        group = "-- anonymous --";
      // handle category special cases
      if (groupName === "category" && group === "environment")
        group = "setting";
      if (groupName === "category" && group === "tags") group = "body";
      // handle capitalization
      if (groupName === "category") group = titleCase(group);

      return <TagsGroup key={group} groupName={group} tags={tags} />;
    })
    .sort((a, b) => {
      const aName = a.key.toLowerCase();
      const bName = b.key.toLowerCase();
      return alphabeticalSort(aName, bName);
    });
}
