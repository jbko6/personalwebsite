import {addLine} from '../utils.js';

export function callCommand(params) {
  return new Promise((resolve, reject)=>{
    if (params.length > 0) {
      let combinedString = "";
      params.forEach(string => {
        combinedString += string + " ";
      });
      addLine(combinedString);
      resolve();
    } else {
      reject('echo requires something to echo');
    }
  });
}