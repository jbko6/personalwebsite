function scrollDown() {
  if (terminal.scrollHeight - terminal.scrollTop - 100 <= terminal.clientHeight) {
    terminal.scroll(0, terminal.scrollHeight);
  }
}

export function addLine(line = "<br>", id="") {
  return new Promise((resolve, reject)=>{
    scrollDown();
    let newElement = document.createElement('p');
    newElement.id = id;
    newElement.innerHTML = line;
    terminal.append(newElement);
    resolve();
  })
}

export function addColoredLine(line, hexColor) {
  return new Promise((resolve, reject)=>{
    addLine("<font color="+hexColor+">"+line+"</font>").then(resolve());
  });
}

export function coloredSection(text, color) {
  return "<font color="+color+">"+text+"</font>";
}

export function getTerminalLines(terminal) {
  let terminalLines = terminal.innerHTML;
  return terminalLines;
}

export function changeTextAtLine(id, newLine) {
  document.getElementById(id).innerText = newLine;
}

export function getTextAtLine(id) {
  return document.getElementById(id).innerText;
}

export function queryInput() {
  return new Promise((resolve, reject)=>{
    if (document.getElementById('user-input')) {
      reject();
    }
    addLine("<font color='limegreen'>guest@jonahkowal</font>:~$ <input id='user-input' autocomplete='off' spellcheck='false'>");
    scrollDown();
    let element = document.getElementById("user-input");
    element.focus();
    element.onkeypress = function(event) {
      if (event.keyCode == 13 || event.which == 13) {
        event.preventDefault();
        resolve(element.value);
        let newElement = document.createElement("p");
        newElement.style = "display:inline;";
        newElement.innerHTML = element.value;
        element.parentNode.replaceChild(newElement, element);
      }
    }
  });
}

export function interpretCommand(command) {
  return new Promise((resolve, reject)=>{
    let commandArray = command.split(" ");
    let call = commandArray[0];
    commandArray.shift();
    let params = commandArray;
    import('./commands/' + call + '.js')
      .then(command => {
        command.callCommand().then(resolve());
      })
      .catch(err => {
        commandNotFound(call).then(resolve());
      });
  })
}

function commandNotFound(command) {
  return new Promise((resolve, reject)=>{
    addColoredLine(command + ": command not found", "#FF0000").then(resolve());
  })
}

export function addLoadingBar(timeScale=100, randomDiv=10, style="inline", id="loadbar", starter="Loading... [", mid="■", end="]", length=25) {
  return new Promise((resolve, reject)=>{
    let percent = 0;
    let loader = setInterval(function () {
      if (percent < 1) {
        let loadLine = starter;
        for (let cursor = 0; cursor < length; cursor++) {
          if (percent > cursor / length) {
            loadLine += mid;
          } else {
            loadLine += " ";
          }
        }
        loadLine += end;
        percent += Math.random() / randomDiv;
        if (percent >= 1) {
          loadLine = starter;
          for (let cursor = 0; cursor < length; cursor++) {
            loadLine += mid;
          }
          loadLine += end;
        }
        if (style = "inline") {
          if (document.getElementById(id)) {
            changeTextAtLine(id, loadLine);
          } else {
            addLine(loadLine, id);
            document.getElementById(id).style = "white-space:break-spaces;";
          }
        }
      } else {
        clearInterval(loader);
        resolve();
      }
    }, timeScale);
  });
}