export function onError(error, setCheckStatus) {
  setCheckStatus("error");
  console.log("Fehler:", error);
}
