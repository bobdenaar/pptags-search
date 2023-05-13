import loadingUrl from "../assets/loading.gif";

export function Spinner() {
  return (
    <>
      <h2>Loading...</h2>
      <img
        className="dachshund"
        src={loadingUrl}
        alt="A dachshund, going nowhere"
      />
    </>
  );
}
