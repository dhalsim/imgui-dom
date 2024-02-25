import { getInputId, refocus, reset, focusBlurListeners } from './gui-helpers.js';
import { logger } from './helpers/logger.js';
import { buildApp, div, p } from './helpers/html.js';


import { counterButtonBuilder } from './components/counter-button.js';
import { resetButtonBuilder } from './components/reset-button.js';
import { incrementTextInputBuilder } from './components/increment-text.js';
import { debugCheckboxBuilder } from './components/debug-checkbox.js';

const appId = "app";

const appState = {
  debug: true,
  loopCounter: 0,
  counterValue: 0,
  incrementValue: 1,
  appSelector: "My-App",
  htmlElementOrderId: 0,
  focusedElementId: null,
  isResetting: false,
};

const log = logger({ appState });
const getInputIdFn = () => getInputId({ appState });

focusBlurListeners({ appState, log });

async function loop() {
  log("loop", appState.loopCounter++);

  const app = buildApp({ 
    appId,
    classList: "w-52 mx-auto py-6",
    children: []
  });

  const resetFn = () => reset({ app, appState, log });
  
  const appContext = { loop, resetFn, getInputIdFn, log, appState };
  
  const counterButton = counterButtonBuilder(appContext);
  const resetButton = resetButtonBuilder(appContext);
  const incrementTextInput = incrementTextInputBuilder(appContext);
  const debugCheckbox = debugCheckboxBuilder(appContext);

  const htmlElements = [
    div({
      description: "Container for counter and reset buttons",
      classList: "flex justify-between items-center mb-4", 
      children: [
        counterButton(appState.counterValue, () => {
          if (appState.counterValue < 5) {
            appState.counterValue = appState.counterValue + appState.incrementValue;
          
            log("counterValue", appState.counterValue)
          }
        }),
        resetButton(() => {    
          appState.counterValue = 0;
          
          log("counterValue", appState.counterValue);
        })
      ]
    }),
    div({
      description: "Container for increment number input and its label",
      classList: "flex items-center justify-between mb-4",
      children: incrementTextInput(appState.incrementValue, (newVal) => appState.incrementValue = newVal)
    }),
    div({
      description: "Container for debug checkbox and its label",
      classList: "flex items-center mb-4",
      children: debugCheckbox()
    }),
    div({
      description: "Container for counter limit warning text",
      classList: "flex items-center mb-4",
      children: appState.counterValue >= 5 
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

  refocus({ app, appState, log });
}

requestAnimationFrame(loop);
