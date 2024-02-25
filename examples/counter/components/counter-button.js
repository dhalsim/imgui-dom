
export const counterButtonBuilder = ({ loop, resetFn, log, getInputIdFn }) => {
  return (val, updateFn, disabled) => {
    let button = document.createElement("button");
    button.id = getInputIdFn();
    button.classList = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    button.disabled = disabled;

    button.textContent = val;
  
    button.addEventListener("click", () => {
      const newVal = updateFn();

      log("new counter", newVal);
  
      resetFn();
      
      requestAnimationFrame(loop);
    });
  
    return button;
  }
}
