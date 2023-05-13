import sleepUrl from "../assets/sleep.gif";

export function ErrorMessage() {
  return (
    <>
      <h2>An error occurred. We're working hard at fixing it.</h2>
      <img
        className="dachshund"
        src={sleepUrl}
        alt="A dachshund, sleeping"
      />
    </>
  );
}
