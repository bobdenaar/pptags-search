import { Spinner } from "./Spinner";

import { filterByDates } from "../utils/filter";
import { getGroupedByProperty } from "../utils/group";
import { alphabeticalSort, tagsAlphabeticalSort } from "../utils/sort";
import { titleCase } from "../utils/string";

import "./TagsList.css";

export function TagsList({ tags, dates, categories }) {
  if (!tags) return null;

  const filteredTags = filterByDates(tags, dates).sort(tagsAlphabeticalSort);

  const tagsMap = new Map();
  for (const tag of tags) {
    tagsMap.set(tag.id, tag);
  }

  const tagIdsByCategory = getGroupedByProperty(filteredTags, "category");
  const categoryLists = makeCategoryLists(
    categories,
    tagIdsByCategory,
    tagsMap
  );

  // const tagIdsByOwner = getGroupedByProperty(filteredTags, "ownerUsername");

  return filteredTags.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <p>Displaying {filteredTags?.length} tags.</p>
      <ul>{categoryLists}</ul>
    </>
  );
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

      return (
        <li key={categoryName} className="category">
          <h2>{`${titleCase(categoryName)} (${tags.length})`}</h2>
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
        </li>
      );
    })
    .filter((category) => category !== null)
    .sort((a, b) => {
      const aName = a.key.toLowerCase();
      const bName = b.key.toLowerCase();
      return alphabeticalSort(aName, bName);
    });
}
