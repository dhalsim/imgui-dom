export const addButtonBuilder = (
  { loop, resetFn, log, getInputIdFn },
  classList,
) => {
  return ({ updateFn }) => {
    const button = document.createElement("button");
    button.id = getInputIdFn();
    button.classList = classList;
    button.textContent = "Add";

    button.addEventListener("click", () => {
      updateFn();

      log("Add button clicked");

      resetFn();

      requestAnimationFrame(loop);
    });

    return button;
  };
};
