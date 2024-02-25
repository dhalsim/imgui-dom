
import { getInputId } from '../gui-helpers.js';

export const counterButtonBuilder = ({ app, loop, reset, log, appState }) => {
  return (val, updateFn) => {
    let button = document.createElement("button");
    button.id = getInputId({ appState });

    button.textContent = val;
  
    button.addEventListener("click", () => {
      log("counter button click");
  
      updateFn();

      reset({ app, appState, log });
      
      requestAnimationFrame(loop);
    });
  
    app.appendChild(button);
  }
}
