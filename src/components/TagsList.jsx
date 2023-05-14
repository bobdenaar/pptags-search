import { Spinner } from "./Spinner";
import { TagsGroup } from "./TagsGroup";

import { filterByDates } from "../utils/filter";
import { getGroupedByProperty } from "../utils/group";
import { alphabeticalSort, tagsAlphabeticalSort } from "../utils/sort";
import { titleCase } from "../utils/string";

import "./TagsList.css";

export function TagsList({ tags, dates, displayedGroup }) {
  if (!tags) return null;

  const startTime = Date.now();

  const filteredTags = filterByDates(tags, dates).sort(tagsAlphabeticalSort);

  const groups = makeGroupLists(filteredTags, displayedGroup);

  const elapsed = Date.now() - startTime;
  console.log(`TagsList took ${elapsed}ms to render.`);

  return filteredTags.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <p>Displaying {filteredTags?.length} tags.</p>
      <ul>{groups}</ul>
    </>
  );
}

// takes a list of tags and a group name
// returns a list of tag groups sorted alphabetically

function makeGroupLists(tags, groupName) {
  const tagsMap = new Map();
  for (const tag of tags) {
    tagsMap.set(tag.id, tag);
  }

  if (groupName === "owner") groupName = "ownerUsername";
  const tagIdsByGroup = getGroupedByProperty(tags, groupName);

  return Object.entries(tagIdsByGroup)
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
    .filter((group) => group !== null)
    .sort((a, b) => {
      const aName = a.key.toLowerCase();
      const bName = b.key.toLowerCase();
      return alphabeticalSort(aName, bName);
    });
}
