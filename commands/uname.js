import {addLine, getUsername, setUsername, saveCookie} from "../utils.js";
import {hasOption} from '../commandUtils.js';

export function callCommand(params) {
  return new Promise((resolve, reject)=>{
    if (params.length == 0) {
      addLine();
      addLine("Your current username is: <font color='limegreen'>" + getUsername() + "</font>");
      addLine();
    } else {
      if (hasOption(params, 0, '-s') || hasOption(params, 0, '-save')) {
        saveCookie("username", params[0]);
      }
      setUsername(params[0]);
    }
    resolve();
  })
}