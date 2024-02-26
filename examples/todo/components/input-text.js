export const inputTextBuilder = ({ log, getInputIdFn, resetFn, loop }) => {
  return (val, updateFn, addTodoFn) => {
    const input = document.createElement('input');
    input.type = "text";
    input.id = getInputIdFn();
    input.placeholder = "Add Todo";
    input.classList = "shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker";
    input.value = val;

    input.addEventListener("change", (event) => {
      const newVal = updateFn(event);

      log("updated todo input to", newVal);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === 'Enter') {
        if (event.target.value) {
          addTodoFn(event.target.value);

          log("pressed enter todo input to", event.target.value);

          resetFn();

          requestAnimationFrame(loop);
        }
      }
    });

    return input;
  }
};
