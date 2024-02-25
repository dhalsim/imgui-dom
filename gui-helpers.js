export function reset({ app, appState, log }) {
  log('reset called');
  
  appState.isResetting = true;
  
  let clonedApp = app.cloneNode();

  app.parentNode.replaceChild(clonedApp, app);

  appState.isResetting = false;
  appState.htmlElementOrderId = 0;
}

export function refocus({ app, appState, log }) {
  if (appState.focusedElementId) {
    log('refocus to', appState.focusedElementId);

    app.querySelector(`#${appState.focusedElementId}`).focus();
  }
}

export function getInputId({ appState }) {
  appState.htmlElementOrderId++;

  return '__' + appState.appSelector + '_' + appState.htmlElementOrderId;
}

export function focusBlurListeners({ appState, log }) {
  document.addEventListener('focus', function(event) {
    if (!appState.isResetting) {
      log('focused element', event.target);
  
      appState.focusedElementId = event.target.id;
    }  
  }, true);
  
  document.addEventListener('blur', function(event) {
    if (!appState.isResetting) {
      log('blur element', event.target);
  
      appState.focusedElementId = null;
    }
  }, true);
}