export function callCommand(params) {
  return new Promise((resolve, reject)=>{
    let err = getSyntaxErrors(params);
    if (err) {
      reject(err);
      return;
    }
    let time = params[0];
    setTimeout(function() {
      resolve();
    }, time*1000)
  })
  
}

function getSyntaxErrors(params) {
  if (params.length > 0) {
    if (isNaN(params[0])) {
      return "time should be an integer";
    }
  } else {
    return "timeout requires time parameter";
  }
}