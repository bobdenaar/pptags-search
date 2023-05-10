import { filterByDates } from "../utils/filter";
import { alphabeticalSort } from "../utils/sort";

export function TagsList({ tags, dates }) {
  if (!tags) return null;

  const filteredTags = filterByDates(tags, dates).sort(alphabeticalSort);

  return (
    <>
      <p>Displaying {filteredTags?.length} tags.</p>
      <ul>
        {filteredTags.map((tag) => (
          <li key={tag.id}>
            <a href={`https://pornpen.art/tags/view/${tag.id}`} target="_blank">
              {titleCase(tag.name)}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

function titleCase(tagname) {
  // remove underscore, split words
  const words = tagname.trim().split(/[\s_]+/);

  // title case
  words.forEach((word, index) => {
    try {
      const titleCased = word[0].toUpperCase() + word.slice(1);
      words[index] = titleCased;
    } catch (error) {
      console.log("error parsing word", word, "in string'", tagname, "':");
    }
  });

  return words.join(" ");
}
