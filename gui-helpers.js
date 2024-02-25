export function reset({ app, appState }) {
  console.log('reset called');
  
  appState.isResetting = true;
  
  let clonedApp = app.cloneNode();

  app.parentNode.replaceChild(clonedApp, app);

  appState.isResetting = false;
  appState.htmlElementOrderId = 0;
}

export function focus({ app, appState }) {
  if (appState.focusedElementId) {
    console.log('re-setting focus to', appState.focusedElementId);

    app.querySelector(`#${appState.focusedElementId}`).focus();
  }
}

export function getInputId({ appState }) {
  appState.htmlElementOrderId++;

  return '__' + appState.appSelector + '_' + appState.htmlElementOrderId;
}