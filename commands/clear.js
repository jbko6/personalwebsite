export function callCommand(params) {
  return new Promise((resolve, reject)=>{
    let terminal = document.getElementById('terminal');
    let err = getSyntaxErrors(params);
    if (err) {
      reject(err);
      return
    }
    if (params.length == 0) {
      while (terminal.lastChild) {
        terminal.removeChild(terminal.lastChild);
      }
    } else {
      let count = 0;
      while (terminal.lastChild) {
        if (count >= params[0]) {
          resolve();
          return;
        } else {
          terminal.removeChild(terminal.lastChild);
          count++;
        }
      }
    }
    
    resolve();
  });
}

function getSyntaxErrors(params) {
  if (params.length > 0) {
    if (isNaN(params[0])) {
      return "amount should be an integer";
    }
  }
}