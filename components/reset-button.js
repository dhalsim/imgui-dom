
import { getInputId } from '../gui-helpers.js';

export const resetButtonBuilder = ({ app, loop, log, reset, appState }) => {
  return (updateFn) => {
    let button = document.createElement("button");
    button.id = getInputId({ appState });

    button.textContent = "Reset Counter";
  
    button.addEventListener("click", () => {
      log("reset button click");
  
      updateFn();
      reset({ app, appState, log });
      
      requestAnimationFrame(loop);
    });
  
    app.appendChild(button);
  }
}
