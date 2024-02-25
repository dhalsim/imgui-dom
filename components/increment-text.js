import { getInputId } from '../gui-helpers.js';

export const incrementTextInputBuilder = ({ loop, log, resetFn, appState }) => {
  return (initVal, updateFn) => {
    const numberInput = document.createElement('input');
    
    numberInput.id = getInputId({ appState });
    numberInput.type = 'number';
    
    numberInput.min = '1';
    numberInput.max = '5';
    
    numberInput.classList = "px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
    numberInput.style = "width: auto;"
    numberInput.value = initVal;

    const label = document.createElement('label');

    label.classList = "text-sm font-medium text-gray-700 mr-3";
    label.setAttribute('for', numberInput.id);
    label.textContent = "Increment Value";

    numberInput.addEventListener("change", (event) => {
      const newVal = event.target.value;

      log("increment new value", newVal);
  
      updateFn(parseInt(newVal));
      
      resetFn({ app, appState, log });
      
      requestAnimationFrame(loop);
    });

    return [label, numberInput];
  }
}
