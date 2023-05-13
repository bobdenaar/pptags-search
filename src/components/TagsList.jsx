import { useState } from "react";

import { Spinner } from "./Spinner";

import { filterByDates } from "../utils/filter";
import { getGroupedByProperty } from "../utils/group";
import { alphabeticalSort, tagsAlphabeticalSort } from "../utils/sort";
import { titleCase } from "../utils/string";

import "./TagsList.css";

export function TagsList({ tags, dates, categories, owners, groupDisplayed }) {
  if (!tags) return null;

  const startTime = Date.now();

  const filteredTags = filterByDates(tags, dates).sort(tagsAlphabeticalSort);

  const tagsMap = new Map();
  for (const tag of tags) {
    tagsMap.set(tag.id, tag);
  }

  let groups = [];

  switch (groupDisplayed) {
    case "owner": {
      const tagIdsByOwner = getGroupedByProperty(filteredTags, "ownerUsername");
      groups = makeOwnerLists(owners, tagIdsByOwner, tagsMap);
      break;
    }

    case "category":
    default: {
      const tagIdsByCategory = getGroupedByProperty(filteredTags, "category");
      groups = makeCategoryLists(categories, tagIdsByCategory, tagsMap);
    }
  }

  const elapsed = Date.now() - startTime;
  console.log(`TagsList took ${elapsed}ms to render.`);

  // const tagIdsByOwner = getGroupedByProperty(filteredTags, "ownerUsername");

  return filteredTags.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <p>Displaying {filteredTags?.length} tags.</p>
      <ul>{groups}</ul>
    </>
  );
}

function makeOwnerLists(owners, tagIdsByOwner, tagsMap) {
  return owners
    .map((owner) => {
      let ownerName = owner;
      if (owner === "") ownerName = "-- anonymous --";

      const tagIds = tagIdsByOwner[owner] || [];
      const tags = tagIds.map((tagId) => tagsMap.get(tagId));

      if (tags.length === 0) return null;

      return <Group key={ownerName} groupName={ownerName} tags={tags} />;
    })
    .filter((owner) => owner !== null)
    .sort((a, b) => {
      const aName = a.key.toLowerCase();
      const bName = b.key.toLowerCase();
      return alphabeticalSort(aName, bName);
    });
}

function makeCategoryLists(categories, tagIdsByCategory, tagsMap) {
  return categories
    .map((category) => {
      let categoryName = category;
      if (category === "environment") categoryName = "setting";
      else if (category === "tags") categoryName = "body";

      const tagIds = tagIdsByCategory[category] || [];
      const tags = tagIds.map((tagId) => tagsMap.get(tagId));

      if (tags.length === 0) return null;

      return <Group key={categoryName} groupName={titleCase(categoryName)} tags={tags} />;
    })
    .filter((category) => category !== null)
    .sort((a, b) => {
      const aName = a.key.toLowerCase();
      const bName = b.key.toLowerCase();
      return alphabeticalSort(aName, bName);
    });
}

function Group({ groupName, tags }) {
  const [show, setShow] = useState(true);

  return (
    <li className="group">
      <h2 onClick={() => setShow(!show)}>{`${groupName} (${
        tags.length
      })`}</h2>
      {show && (
        <ul className="tagsList">
          {tags.map((tag) => (
            <li key={tag.id} className="tag">
              <a
                href={`https://pornpen.art/tags/view/${tag.id}`}
                target="_blank"
              >
                {titleCase(tag.name)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
