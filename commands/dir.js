import {initDirectory, getDirectoryJSON} from "../commandUtils.js";

export function callCommand() {
  return new Promise((resolve, reject)=>{
    initDirectory();
    getDirectoryJSON();
    resolve();
  });
}