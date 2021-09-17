var username = "guest";

export function getUsername() {
  return username;
}

export function setUsername(name) {
  username = name;
  let elements = document.getElementsByClassName('input-label');
  for (let i=0; i < elements.length; i++) {
    elements[i].innerText = username + "@jonahkowal";
  }
}

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
    addLine("<font class='input-label'>" + username + "@jonahkowal</font>:~$ <input id='user-input' autocomplete='off' spellcheck='false'>");
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
    let call = commandArray[0].toLowerCase();
    commandArray.shift();
    let params = commandArray;
    import('./commands/' + call + '.js')
      .then(command => {
        command.callCommand(params).then(()=>{resolve()}).catch((err) => {addColoredLine(err, "#FF0000").then(resolve())});
      })
      .catch(err => {
        commandNotFound(call).then(resolve());
      });
  })
}

function commandNotFound(command) {
  return new Promise((resolve, reject)=>{
    if (command=="") {
      resolve();
      return;
    }
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

export function saveCookie(key, value) {
  return new Promise((resolve, reject)=>{
    document.cookie = key + "=" + value + ";";
  })
}

export function loadCookie(key) {
  return new Promise((resolve, reject)=>{
    let name = key + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        resolve(c.substring(name.length, c.length));
      }
  }
  resolve("");
  });
}

export async function loadTheme() {
  let backgroundColor = await loadCookie("background-color");
  let color = await loadCookie("color");
  let name = await loadCookie("username");
  if (backgroundColor != "") {
    document.getElementsByTagName('body')[0].style.backgroundColor = backgroundColor;
  }
  if (color != "") {
    document.getElementsByTagName('body')[0].style.color = color;
  }
  if (name != "") {
    username = name;
  }
}