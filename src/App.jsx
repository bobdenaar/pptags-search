import { useTags } from "./hooks/useTags";
import { useDates } from "./hooks/useDates";

import { ControlsDialog } from "./components/ControlsDialog";
import { ErrorMessage } from "./components/ErrorMessage";
import { Spinner } from "./components/Spinner";
import { TagsList } from "./components/TagsList";

import { getUniquePropertyValues } from "./utils/group";
import { alphabeticalSort } from "./utils/sort";

import "./App.css";

function App() {
  // download tags data from pp
  const { tags, error, isLoading } = useTags();

  const { datesQuery, setDatesQuery, initialDates } = useDates(tags);

  // TODO: compute groups for select options
  let categories, owners;
  if (tags) {
    categories = getUniquePropertyValues(tags, "category");
    categories.sort(alphabeticalSort);

    owners = getUniquePropertyValues(tags, "ownerUsername");
    owners = formatOwnersUsernames(owners);
  }
  // console.log(categories);
  // console.log(owners);

  let content = null;
  if (error) content = <ErrorMessage />;
  else if (isLoading) content = <Spinner />;
  else
    content = (
      <>
        {/* controls */}
        <ControlsDialog
          onDateChange={setDatesQuery}
          datesQuery={datesQuery}
          initialDates={initialDates}
          categories={categories}
          owners={owners}
        />
        {/* tags list */}
        <TagsList
          key="tagsList"
          tags={tags}
          dates={datesQuery}
          categories={categories}
          owners={owners}
          isLoading={isLoading}
        />
      </>
    );

  return (
    <>
    <header>
      <h1>Pornpen Community Tags Search Tool</h1>
    </header>
      {content}
    </>
  );
}

export default App;
function formatOwnersUsernames(owners) {
  owners = owners.map((owner) => {
    if (owner === "") owner = "-- author unknown --";
    return owner;
  });
  owners.sort((a, b) => {
    return alphabeticalSort(a.toLowerCase(), b.toLowerCase());
  });
  return owners;
}

