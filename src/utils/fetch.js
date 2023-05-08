// get all tags from pp.art
async function fetchAllTags(fetchUrl) {

  const requestBody = { data: null };
  try {
    const startTime = Date.now();
    console.log("Fetching all tags data...");

    const response = await fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    console.log(response);
    if (response.status !== 200) {
      throw new Error(`Response status text: ${response.status}.`);
    }

    const timeElapsed = Date.now() - startTime;
    console.log("Success (time elapsed:", timeElapsed, "ms.)");

    const { result } = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export { fetchAllTags };
