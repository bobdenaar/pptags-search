import { useTags } from "./hooks/useTags";

import { ControlledList } from "./components/ControlledList";
import { ErrorMessage } from "./components/ErrorMessage";

import "./App.css";

function App() {
  // download tags data from pp
  const { tags, error, isLoading } = useTags();

  let content = null;
  if (error) content = <ErrorMessage />;
  else content = <ControlledList tags={tags} isLoading={isLoading} />;

  return (
    <>
      <header>
        <h1>Pornpen Community Tags Search Tool</h1>
      </header>
      {content}
      <footer>
        <em>Made with 😅 by dachshunds</em>
      </footer>
    </>
  );
}

export default App;
