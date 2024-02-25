import { getInputId } from './gui-helpers.js';

export const incrementTextInputBuilder = ({ app, loop, reset, appState }) => {
  return (initVal, updateFn) => {
    const numberInput = document.createElement('input');
    numberInput.id = getInputId({ appState });

    // Step 2: Set the type to 'number'
    numberInput.type = 'number';
    
    // Step 3: Set the minimum and maximum values
    numberInput.min = '1';
    numberInput.max = '5';
    
    // Optionally, set a default value
    numberInput.value = initVal;
  
    numberInput.addEventListener("change", (event) => {
      const newVal = event.target.value;

      console.log("increment new value", newVal);
  
      updateFn(parseInt(newVal));
      
      reset({ app, appState });
      
      requestAnimationFrame(loop);
    });
  
    app.appendChild(numberInput);
  }
}
