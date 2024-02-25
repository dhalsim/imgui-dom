import { focus, reset } from './gui-helpers.js';

import { counterButtonBuilder } from './counter-button.js';
import { resetButtonBuilder } from './reset-button.js';
import { incrementTextInputBuilder } from './increment-text.js';

const appId = "app";

let appState = {
  loopCounter: 0,
  counterValue: 0,
  incrementValue: 1,
  appSelector: "My-App",
  htmlElementOrderId: 0,
  focusedElementId: null,
  isResetting: false
};

document.addEventListener('focus', function(event) {
  if (!appState.isResetting) {
    console.log('focused element', event.target);

    appState.focusedElementId = event.target.id;
  }  
}, true);

document.addEventListener('blur', function(event) {
  if (!appState.isResetting) {
    console.log('blur element', event.target);

    appState.focusedElementId = null;
  }
}, true);

async function loop() {
  console.log("loop", appState.loopCounter++);

  const app = document.getElementById(appId);
  const appContext = { app, loop, reset, appState };
  
  const counterButton = counterButtonBuilder(appContext);
  const resetButton = resetButtonBuilder(appContext);
  const incrementTextInput = incrementTextInputBuilder(appContext);

  counterButton(appState.counterValue, () => {
    if (appState.counterValue < 5) {
      appState.counterValue = appState.counterValue + appState.incrementValue;
    
      console.log("counterValue", appState.counterValue);
    }
  });

  resetButton(() => {    
    appState.counterValue = 0;
    
    console.log("counterValue", appState.counterValue);
  });

  incrementTextInput(appState.incrementValue, (newVal) => appState.incrementValue = newVal);

  if (appState.counterValue >= 5) {
    console.log('reached counter limit');

    const h1 = document.createElement("h1");
    h1.textContent = 'You reached your counter limit. Please reset';

    app.appendChild(h1);
  }

  focus({ app, appState });
}

requestAnimationFrame(loop);
