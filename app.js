import { refocus, reset, focusBlurListeners } from './gui-helpers.js';
import { logger } from './helpers/index.js';

import { counterButtonBuilder } from './components/counter-button.js';
import { resetButtonBuilder } from './components/reset-button.js';
import { incrementTextInputBuilder } from './components/increment-text.js';
import { debugCheckboxBuilder } from './components/debug-checkbox.js';
import { warningTextBuilder } from './components/warning-text.js';

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

  const app = document.getElementById(appId);
  const appContext = { app, loop, reset, log, appState };
  
  const counterButton = counterButtonBuilder(appContext);
  const resetButton = resetButtonBuilder(appContext);
  const incrementTextInput = incrementTextInputBuilder(appContext);
  const debugCheckbox = debugCheckboxBuilder(appContext);
  const warningText = warningTextBuilder(appContext);

  counterButton(appState.counterValue, () => {
    if (appState.counterValue < 5) {
      appState.counterValue = appState.counterValue + appState.incrementValue;
    
      appContext.log("counterValue", appState.counterValue)
    }
  });

  resetButton(() => {    
    appState.counterValue = 0;
    
    appContext.log("counterValue", appState.counterValue);
  });

  incrementTextInput(appState.incrementValue, (newVal) => appState.incrementValue = newVal);
  debugCheckbox();
  warningText();

  refocus({ app, appState, log });
}

requestAnimationFrame(loop);
