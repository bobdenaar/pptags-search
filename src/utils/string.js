export function titleCase(string) {
  // remove underscore, split words
  const words = string.trim().split(/[\s_]+/);

  // title case
  words.forEach((word, index) => {
    try {
      const titleCased = word[0].toUpperCase() + word.slice(1);
      words[index] = titleCased;
    } catch (error) {
      console.log("error parsing word", word, "in string'", string, "':");
    }
  });

  return words.join(" ");
}
