export function alphabeticalSort(tagA, tagB) {
  const nameA = tagA.name.trim().toLowerCase();
  const nameB = tagB.name.trim().toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}
