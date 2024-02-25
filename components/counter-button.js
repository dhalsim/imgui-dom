
import { getInputId } from '../gui-helpers.js';

export const counterButtonBuilder = ({ loop, resetFn, log, appState }) => {
  return (val, updateFn) => {
    let button = document.createElement("button");
    button.id = getInputId({ appState });
    button.classList = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

    button.textContent = val;
  
    button.addEventListener("click", () => {
      log("counter button click");
  
      updateFn();
      resetFn();
      
      requestAnimationFrame(loop);
    });
  
    return button;
  }
}
