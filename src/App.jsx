import { useTags } from "./hooks/useTags";
import { useDates } from "./hooks/useDates";

import { ControlsDialog } from "./components/ControlsDialog";
import { ErrorMessage } from "./components/ErrorMessage";
import { Spinner } from "./components/Spinner";
import { TagsList } from "./components/TagsList";

import "./App.css";

function App() {
  // download tags data from pp
  const { tags, error, isLoading } = useTags();

  const { datesQuery, setDatesQuery, initialDates } = useDates(tags);

  // TODO: compute groups for select options

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
        />
        {/* tags list */}
        {!isLoading && (
          <TagsList key="tagsList" tags={tags} dates={datesQuery} />
        )}
      </>
    );

  return (
    <>
      <h1>Pornpen Community Tags Search Tool</h1>
      {content}
    </>
  );
}

export default App;
