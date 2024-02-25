export const debugCheckboxBuilder = ({ loop, log, resetFn, getInputIdFn, state }) => {
  return () => {
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';

    checkbox.id = getInputIdFn();
    checkbox.classList = "h-5 w-5 text-blue-600";
    checkbox.checked = state.debug;

    checkbox.addEventListener("change", (event) => {  
      if (event.target.checked) {
        state.debug = true;
      } else {
        state.debug = false;
      }

      log("debug is", state.debug);
      
      resetFn();
      
      requestAnimationFrame(loop);
    });

    const label = document.createElement('label');
    label.classList = "text-sm font-medium text-gray-900 mr-2";
    label.setAttribute('for', checkbox.id);
    label.textContent = "Debug Logs";

    return [label, checkbox];
  }
}