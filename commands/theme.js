import {addLine, saveCookie, loadCookie} from '../utils.js';
import {hasOption} from '../commandUtils.js';

export function callCommand(params) {
  return new Promise((resolve, reject)=>{
    if (hasOption(params, 0, '-save') || hasOption(params, 0, '-s')) {
      saveCookie("background-color", params[0]);
      saveCookie("color", params[1]);
    }
    let err = getSyntaxErrors(params);
    if (err) {
      reject(err);
      return
    }
    document.getElementsByTagName('body')[0].style.backgroundColor = params[0];
    document.getElementsByTagName('body')[0].style.color = params[1];    
    resolve();
  })
}

function getSyntaxErrors(params) {
  if (params.length < 2) {
    return "theme requires the :background-color: and :text-color: parameters";
  }
  let err = false;
  params.forEach((param) => {
    if (param[0] != "#" || param.length != 7) {
      err= true;
    }
  }); 
  if (err) {
    return "colors should be in <a href='https://en.wikipedia.org/wiki/Web_colors#Hex_triplet' target='_blank'>hexadecimal form</a>";
  }
}