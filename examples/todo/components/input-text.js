export const inputTextBuilder = ({
  log,
  getInputIdFn,
  resetFn,
  loop,
  state,
}) => {
  return ({ value, updateFn, addTodoFn }) => {
    const input = document.createElement("input");
    input.type = "text";
    input.id = getInputIdFn();
    input.placeholder = "Add Todo";
    input.classList =
      "shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker";
    input.value = value;

    input.addEventListener("change", (event) => {
      if (!state.isResetting) {
        const newVal = updateFn(event.target.value);

        log("updated todo input to", newVal);
      } else {
        log("skipped updating text input because of reset");
      }
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        if (event.target.value) {
          addTodoFn(event.target.value);

          log("pressed enter todo input to", event.target.value);

          resetFn();

          requestAnimationFrame(loop);
        }
      }
    });

    return input;
  };
};
