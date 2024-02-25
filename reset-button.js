
import { getInputId } from './gui-helpers.js';

export const resetButtonBuilder = ({ app, loop, reset, appState }) => {
  return (updateFn) => {
    let button = document.createElement("button");
    button.id = getInputId({ appState });

    button.textContent = "Reset Counter";
  
    button.addEventListener("click", () => {
      console.log("reset button click");
  
      updateFn();
      reset({ app, appState });
      
      requestAnimationFrame(loop);
    });
  
    app.appendChild(button);
  }
}
