import {addLine, addColoredLine, coloredSection, getTerminalLines, changeTextAtLine, getTextAtLine, queryInput, interpretCommand, addLoadingBar, loadTheme} from "./utils.js";
import {initDirectory} from './commandUtils.js';


let terminal = document.getElementById("terminal");
let terminalContainer = document.getElementById("terminal-container");
loadTheme();
initDirectory();

addLoadingBar(100, 2, "inline", "loadbar", "Loading... [", "■", "]", 50).then(() => {
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