export function warningTextBuilder({ app, log, appState }) {
  return () => {
    if (appState.counterValue >= 5) {
      log('reached counter limit');
    
      const h1 = document.createElement("h1");
      h1.textContent = 'You reached your counter limit. Please reset';
    
      app.appendChild(h1);
    }
  }
}
