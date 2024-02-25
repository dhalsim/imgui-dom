import { refocus, reset, focusBlurListeners } from './gui-helpers.js';
import { logger } from './helpers/logger.js';
import { buildApp, div, p } from './helpers/html.js';

import { counterButtonBuilder } from './components/counter-button.js';
import { resetButtonBuilder } from './components/reset-button.js';
import { incrementTextInputBuilder } from './components/increment-text.js';
import { debugCheckboxBuilder } from './components/debug-checkbox.js';

const appId = "app";

let appState = {
  debug: true,
  loopCounter: 0,
  counterValue: 0,
  incrementValue: 1,
  appSelector: "My-App",
  htmlElementOrderId: 0,
  focusedElementId: null,
  isResetting: false,
};

const log = logger({ appState })

focusBlurListeners({ appState, log });

async function loop() {
  log("loop", appState.loopCounter++);

  const app = buildApp({ 
    appId,
    classList: "w-52 mx-auto py-6",
    children: []
  });

  const resetFn = () => reset({ app, appState, log });
  
  const appContext = { loop, resetFn, log, appState };
  
  const counterButton = counterButtonBuilder(appContext);
  const resetButton = resetButtonBuilder(appContext);
  const incrementTextInput = incrementTextInputBuilder(appContext);
  const debugCheckbox = debugCheckboxBuilder(appContext);

  const buttonContainer = div({
    classList: "flex justify-between items-center mb-4", 
    children: [
      counterButton(appState.counterValue, () => {
        if (appState.counterValue < 5) {
          appState.counterValue = appState.counterValue + appState.incrementValue;
        
          appContext.log("counterValue", appState.counterValue)
        }
      }),
      resetButton(() => {    
        appState.counterValue = 0;
        
        appContext.log("counterValue", appState.counterValue);
      })
    ]
  });

  const incrementContainer = div({
    classList: "flex items-center justify-between mb-4",
    children: incrementTextInput(appState.incrementValue, (newVal) => appState.incrementValue = newVal)
  })

  const checkboxContainer = div({
    classList: "flex items-center mb-4",
    children: debugCheckbox()
  });

  const warningTextContainer = div({
    classList: "flex items-center mb-4",
    children: appState.counterValue >= 5 
      ? [
          p({
            classList: "text-red-500 text-xl",
            text: "You reached your counter limit. Please reset"
          })
        ] 
      : []
  });

  app.appendChild(buttonContainer);
  app.appendChild(incrementContainer);
  app.appendChild(checkboxContainer);
  app.appendChild(warningTextContainer);

  refocus({ app, appState, log });
}

requestAnimationFrame(loop);
