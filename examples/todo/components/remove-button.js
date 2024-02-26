export const removeButtonBuilder = ({ loop, resetFn, log, getInputIdFn }, classList) => {
  return (updateFn) => {
    const button = document.createElement('button');
    button.id = getInputIdFn();
    button.classList = classList;
    button.textContent = "Remove";

    button.addEventListener("click", () => {
      updateFn();

      log("Remove button clicked");
  
      resetFn();
      
      requestAnimationFrame(loop);
    });

    return button;
  }
};
