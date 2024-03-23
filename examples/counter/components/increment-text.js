import { labelFor } from "../../../src/html.js";

export const incrementTextInputBuilder = ({
  loop,
  log,
  resetFn,
  getInputIdFn,
}) => {
  return (initVal, updateFn) => {
    const numberInput = document.createElement("input");

    numberInput.id = getInputIdFn();
    numberInput.type = "number";

    numberInput.min = "1";
    numberInput.max = "5";

    numberInput.classList =
      "px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";
    numberInput.style = "width: auto;";
    numberInput.value = initVal;

    numberInput.addEventListener("change", (event) => {
      const currentVal = event.target.value;
      const newVal = updateFn(parseInt(currentVal));

      log("increment set to", newVal);

      resetFn();
      requestAnimationFrame(loop);
    });

    return labelFor({
      input: numberInput,
      classList: "text-sm font-medium text-gray-700 mr-3",
      text: "Increment Value",
    });
  };
};
