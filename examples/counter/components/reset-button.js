export const resetButtonBuilder = ({ loop, log, resetFn, getInputIdFn }) => {
  return (updateFn) => {
    let button = document.createElement("button");
    button.id = getInputIdFn();
    button.classList =
      "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded";

    button.textContent = "Reset Counter";

    button.addEventListener("click", () => {
      const newVal = updateFn();

      log("reset counter to", newVal);

      resetFn();

      requestAnimationFrame(loop);
    });

    return button;
  };
};
