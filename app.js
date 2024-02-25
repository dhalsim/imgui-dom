import { getInputId, refocus, reset, focusBlurListeners } from './gui-helpers.js';
import { logger } from './helpers/logger.js';
import { buildApp, div, p } from './helpers/html.js';


import { counterButtonBuilder } from './components/counter-button.js';
import { resetButtonBuilder } from './components/reset-button.js';
import { incrementTextInputBuilder } from './components/increment-text.js';
import { debugCheckboxBuilder } from './components/debug-checkbox.js';

const appId = "my-app";

const state = {
  debug: true,
  loopCounter: 0,
  counterValue: 0,
  incrementValue: 1,
  htmlElementOrderId: 0,
  focusedElementId: null,
  isResetting: false,
};

const log = logger({ state });
const getInputIdFn = () => getInputId({ state, appId });

focusBlurListeners({ state, log });

async function loop() {
  log("loop", state.loopCounter++);

  const app = buildApp({ 
    appId,
    classList: "w-52 mx-auto py-6",
    children: []
  });

  const resetFn = () => reset({ app, state, log });
  
  const appContext = { loop, resetFn, getInputIdFn, log, state };
  
  const counterButton = counterButtonBuilder(appContext);
  const resetButton = resetButtonBuilder(appContext);
  const incrementTextInput = incrementTextInputBuilder(appContext);
  const debugCheckbox = debugCheckboxBuilder(appContext);

  const htmlElements = [
    div({
      description: "Container for counter and reset buttons",
      classList: "flex justify-between items-center mb-4", 
      children: [
        counterButton(state.counterValue, () => {
          if (state.counterValue < 5) {
            state.counterValue = state.counterValue + state.incrementValue;
          
            log("counterValue", state.counterValue)
          }
        }),
        resetButton(() => {    
          state.counterValue = 0;
          
          log("counterValue", state.counterValue);
        })
      ]
    }),
    div({
      description: "Container for increment number input and its label",
      classList: "flex items-center justify-between mb-4",
      children: incrementTextInput(state.incrementValue, (newVal) => state.incrementValue = newVal)
    }),
    div({
      description: "Container for debug checkbox and its label",
      classList: "flex items-center mb-4",
      children: debugCheckbox()
    }),
    div({
      description: "Container for counter limit warning text",
      classList: "flex items-center mb-4",
      children: state.counterValue >= 5 
        ? [
            p({
              classList: "text-red-500 text-xl",
              text: "You reached your counter limit. Please reset"
            })
          ] 
        : []
    })
  ];

  htmlElements.forEach((el) => app.appendChild(el));

  refocus({ app, state, log });
}

requestAnimationFrame(loop);
