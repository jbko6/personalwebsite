import { saveCookie, loadCookie, addLine } from './utils.js';

export function hasOption(params, position, option) {
  if (params[0] == option) {
    params.shift();
    return true;
  }
}

export function isArray(what) {
  return Object.prototype.toString.call(what) === '[object Array]';
}

export function parseStringParam(params, startNum) {
  let combinedString = "";
  if (params[startNum][0] == '"') {
    for (let i = startNum; i < params.length; i++) {
      combinedString += params[i].replace('"', "").replace('"', "") + " ";
      if (params[i][params[i].length - 1] == '"') {
        break;
      }
    }
    combinedString = combinedString.substring(0, combinedString.length - 1);
  } else {
    combinedString = params[startNum];
  }
  return combinedString;
}

// directory utils

var currentDir = "home";

export function getCurrentDir() {
  return currentDir;
}

export function setCurrentDir(newDir) {
  currentDir = newDir;
}

export async function folderExists(path) {
  console.log("check started");
  let dirJson = await getDirectoryJSON();
  let pathArray = path.split('/');
  let notExist = false;
  console.log("check middle");
  pathArray.forEach(()=>{
    if (pathArray[0] in dirJson) {
      console.log("exists");
      dirJson = dirJson[pathArray[0]]
      pathArray.shift();
    } else {
      console.log("doesn't exist");
      notExist = true;
    }
  })
  return !notExist;
}

export async function getDirectoryJSON() {
  return new Promise(async (resolve, reject) => {
    let directory = await loadCookie("directory");
    if (directory == "") {
      resolve();
      return;
    }
    let parseDir = JSON.parse(directory);
    resolve(parseDir);
  });
}

export function initDirectory() {
  return new Promise(async (resolve, reject) => {
    let dir = await loadCookie("directory");
    if (dir != "") {
      console.log(dir);
      return;
    }
    let newDir = { "commands": [] };
    saveCookie("directory", JSON.stringify(newDir));
    resolve();
  })
}