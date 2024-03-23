export function div({ classList, children }) {
  const containerDiv = document.createElement("div");

  if (classList) {
    containerDiv.classList = classList;
  }

  children.forEach((element) => {
    containerDiv.appendChild(element);
  });

  return containerDiv;
}

export function p({ classList, text }) {
  const pElement = document.createElement("p");

  pElement.classList = classList;
  pElement.textContent = text;

  return pElement;
}

export function h1({ classList, text }) {
  const h1Element = document.createElement("h1");

  h1Element.classList = classList;
  h1Element.textContent = text;

  return h1Element;
}

export function labelFor({ input, classList, text }) {
  const label = document.createElement("label");

  label.classList = classList;
  label.setAttribute("for", input.id);
  label.textContent = text;

  return [label, input];
}

export function buildApp({ appId, classList, children = [] }) {
  const appDiv = document.getElementById(appId);

  appDiv.classList = classList;

  children.forEach((element) => {
    appDiv.appendChild(element);
  });

  return appDiv;
}
