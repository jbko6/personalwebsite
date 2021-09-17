import {saveCookie, loadCookie} from './utils.js';

export function hasOption(params, position, option) {
  if (params[0] == option) {
    params.shift();
    return true;
  }
}

// directory utils

export async function getDirectoryJSON() {
  let directory = await loadCookie("directory");
  if (directory == "") {
    return;
  }
  let parseDir = JSON.parse(directory);
  console.log(parseDir);
}

export function initDirectory() {
  let currentDir = loadCookie("directory");
  if (currentDir != "") {
    return;
  }
  let dir = {"/home/": {}};
  saveCookie(JSON.stringify(dir));
}