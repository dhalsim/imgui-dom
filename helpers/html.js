export function div({ classList, children, description }) {
  const containerDiv = document.createElement('div');

  containerDiv.classList = classList;

  children.forEach(element => {
    containerDiv.appendChild(element);
  });

  return containerDiv;
}

export function p({ classList, text, description }) {
  const pElement = document.createElement('p');

  pElement.classList = classList;
  pElement.textContent = text;

  return pElement;
}

export function labelFor({ input, classList, text }) {
  const label = document.createElement('label');

  label.classList = classList;
  label.setAttribute('for', input.id);
  label.textContent = text;

  return [label, input];
}

export function buildApp({ appId, classList, children, description }) {
  const appDiv = document.getElementById(appId);

  appDiv.classList = classList;// "max-w-md mx-auto py-6";

  children.forEach(element => {
    appDiv.appendChild(element);
  });

  return appDiv;
}