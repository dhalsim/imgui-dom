export const doneToggleButtonBuilder = ({ loop, resetFn, log, getInputIdFn }, classList) => {
  return (alreadyDone, updateFn) => {
    const button = document.createElement('button');
    button.id = getInputIdFn();
    button.classList = classList;
    button.textContent = alreadyDone ? "Undone" : "Done";

    button.addEventListener("click", () => {
      updateFn();

      log(`${button.textContent} button clicked`);
  
      resetFn();
      
      requestAnimationFrame(loop);
    });

    return button;
  }
};
