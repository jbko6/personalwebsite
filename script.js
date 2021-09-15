import {addLine, addColoredLine, coloredSection, getTerminalLines, changeTextAtLine, getTextAtLine, queryInput, interpretCommand, addLoadingBar} from "./utils.js";


let terminal = document.getElementById("terminal");
let terminalContainer = document.getElementById("terminal-container");

addLoadingBar(100, 20, "inline", "loadbar", "Loading... [", "■", "]", 50).then(() => {
  addLine("All done!");
  addLine();
  inputLoop();
});

function inputLoop() {
  queryInput().then(value => {
    interpretCommand(value).then(() => {
      inputLoop();
    });
  });
}