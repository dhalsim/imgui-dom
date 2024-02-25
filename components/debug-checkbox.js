import { getInputId } from '../gui-helpers.js';

export const debugCheckboxBuilder = ({ app, loop, log, reset, appState }) => {
  return () => {
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';

    checkbox.id = getInputId({ appState });
    checkbox.name = "debug-toggle";
    checkbox.checked = appState.debug;

    checkbox.addEventListener("change", (event) => {  
      if (event.target.checked) {
        appState.debug = true;
      } else {
        appState.debug = false;
      }

      log("debug is", appState.debug);
      
      reset({ app, appState, log });
      
      requestAnimationFrame(loop);
    });

    const label = document.createElement('label');
    label.setAttribute('for', checkbox.name);
    label.textContent = "Debug Logs";

    app.appendChild(checkbox);
    app.appendChild(label);
  }
}