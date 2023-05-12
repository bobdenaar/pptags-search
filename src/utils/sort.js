export function alphabeticalSort(nameA, nameB) {
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

export function tagsAlphabeticalSort(tagA, tagB) {
  const nameA = tagA.name.trim().toLowerCase();
  const nameB = tagB.name.trim().toLowerCase();
  return alphabeticalSort(nameA, nameB);
}
