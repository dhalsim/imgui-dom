export function logger({ appState }) {
  return (...text) => {
    if (appState.debug) {
      console.log(...text);
    }
  }
}
