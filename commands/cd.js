import {setCurrentDir, parseStringParam, getCurrentDir, folderExists} from '../commandUtils.js';
import {addLine} from '../utils.js';

export function callCommand(params) {
  return new Promise(async (resolve, reject)=>{
    if (params.length == 0) {
      reject("cd requires directory parameter");
    }
    let newDir = parseStringParam(params, 0);
    let folderExist = folderExists(newDir);
    console.log(folderExist);
    //setCurrentDir(getCurrentDir()+"/"+newDir);
    resolve();
  });
}