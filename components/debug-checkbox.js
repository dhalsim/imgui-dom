import { labelFor } from "../helpers/html.js";

export const debugCheckboxBuilder = ({ loop, log, resetFn, getInputIdFn }) => {
  return (checked, updateFn) => {
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';

    checkbox.id = getInputIdFn();
    checkbox.classList = "h-5 w-5 text-blue-600";
    checkbox.checked = checked;

    checkbox.addEventListener("change", (event) => {  
      const newVal = updateFn(event.target.checked);

      log("debug is", newVal);
      
      resetFn();
      
      requestAnimationFrame(loop);
    });

    return labelFor({ 
      input: checkbox, 
      classList: "text-sm font-medium text-gray-900 mr-2", 
      text: "Debug Logs" 
    });
  }
}