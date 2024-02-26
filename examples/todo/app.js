import { getInputId, refocus, reset, focusBlurListeners } from '../../src/gui.js';
import { buildApp, div, h1, p } from '../../src/html.js';

import { logger } from '../helpers/logger.js';

import { inputTextBuilder } from './components/input-text.js';
import { addButtonBuilder } from './components/add-button.js';
import { doneToggleButtonBuilder } from './components/done-button.js';
import { removeButtonBuilder } from './components/remove-button.js';

const appId = "todo-app";

const state = {
  debug: true,
  loopCounter: 0,
  htmlElementOrderId: 0,
  focusedElementId: null,
  isResetting: false,
  inputText: "",
  todoItems: []
};

const log = logger({ state });
const getInputIdFn = () => getInputId({ state, appId });
const buttonClassList = "py-2 px-3 mr-3 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-md shadow focus:outline-none";

focusBlurListeners({ state, log });

async function loop() {
  if (state.debug) {
    window.state = state;
  }

  log("loop", state.loopCounter++);
  
  const app = buildApp({ 
    appId,
    classList: "h-100 w-full flex items-center justify-center bg-teal-lightest font-sans"
  });

  const resetFn = () => reset({ app, state, log });
  const appContext = { loop, resetFn, log, getInputIdFn };

  const inputText = inputTextBuilder(appContext);
  const addButton = addButtonBuilder(appContext, buttonClassList);
  const doneToggleButton = doneToggleButtonBuilder(appContext, buttonClassList);
  const removeButton = removeButtonBuilder(appContext, buttonClassList);

  const htmlElements = [
    div({
      classList: "bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg",
      children: [
        div({
          description: "Container for text input and add button",
          classList: "mb-4",
          children: [
            h1({
              classList: "text-grey-darkest",
              text: "Todo List"
            }),
            div({
              classList: "flex mt-4",
              children: [
                inputText(
                  state.inputText, 
                  (event) => state.inputText = event.target.value,
                  (newVal) => {
                    state.todoItems.push({ title: newVal, done: false })
    
                    // TODO: not exactly working
                    state.inputText = "";
                  }),
                addButton(() => {
                  if (state.inputText) {
                    state.todoItems.push({ title: state.inputText, done: false })
    
                    state.inputText = "";
                  }
                })
              ]
            })
          ]
        }),
        div({ 
          children: state.todoItems.map((item, i) => 
            div({
              classList: "flex mb-4 items-center",
              children: [
                p({
                  classList: "w-full text-grey-darkest" + (item.done ? " line-through" : ""),
                  text: item.title
                }),
                doneToggleButton(item.done, () => item.done = !item.done),
                removeButton(() => state.todoItems.splice(i, 1))
              ]
            })
          ) 
        })
      ]
    })
  ];

  htmlElements.forEach((el) => app.appendChild(el));

  refocus({ app, state, log });
}

requestAnimationFrame(loop);