/*
Sample tag JSON:
{
  "id": "01xZwX57FwpO8mURSnJc",
  "name": "Chained to the wall",
  "category": "tags",
  "description": "Chained and suspended. Without any context, the picture can sometimes be very zoomed out. Body and face tags will fix this issue.",
  "numSaves": 12290,
  "imageUrl": "https://cdn.pornpen.ai/486d65d8-8af4-464c-ab30-7b2c2500b08d.jpg",
  "ownerUsername": "TheBiologist",
  "liveDate": { "_seconds": 1679126790, "_nanoseconds": 350000000 },
  "featured": false
}
 */

// get arrays of tag ids grouped by category from a tag array
export function getCategories(tags) {
  const categories = {};
  tags.forEach((tag) => {
    if (categories[tag.category]) {
      categories[tag.category].push(tag.id);
    } else {
      categories[tag.category] = [tag.id];
    }
  });
  return categories;
}

// get arrays of tag ids grouped by ownerUsername from a tag array
export function getOwnerUsernames(tags) {
  const ownerUsernames = {};
  tags.forEach((tag) => {
    if (ownerUsernames[tag.ownerUsername]) {
      ownerUsernames[tag.ownerUsername].push(tag.id);
    } else {
      ownerUsernames[tag.ownerUsername] = [tag.id];
    }
  });
  return ownerUsernames;
}

// get arrays of tag ids grouped by property from a tag array
// property can be any property of a tag
export function getGroupedByProperty(tags, property) {
  const grouped = {};
  tags.forEach((tag) => {
    if (grouped[tag[property]]) {
      grouped[tag[property]].push(tag.id);
    } else {
      grouped[tag[property]] = [tag.id];
    }
  });
  return grouped;
}

// get an array of unique property values from a tag array
// property can be any property of a tag
export function getUniquePropertyValues(tags, property) {
  const unique = [];
  tags.forEach((tag) => {
    if (!unique.includes(tag[property])) {
      unique.push(tag[property]);
    }
  });
  return unique;
}
