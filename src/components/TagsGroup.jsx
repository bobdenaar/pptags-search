import { useState } from "react";
import { titleCase } from "../utils/string";

export function TagsGroup({ groupName, tags }) {
  const [show, setShow] = useState(true);

  return (
    <li className="group">
      <h2 className="groupTitle" onClick={() => setShow(!show)}>
        {`${groupName} (${tags.length}) `}
        <div className="arrow">{show ? "\u0000\u25B3" : "\u0000\u25BD"}</div>
      </h2>
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
