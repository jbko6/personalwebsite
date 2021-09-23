import {initDirectory, getDirectoryJSON, getCurrentDir, isArray} from "../commandUtils.js";
import {getUsername, addLine, coloredSection, getUsernameColor} from "../utils.js";

export function callCommand() {
  return new Promise(async (resolve, reject)=>{
    let dirJson = await getDirectoryJSON();
    addLine();
    addLine("Directory of " + coloredSection(getUsername() + "@jonahkowal", getUsernameColor()) + ":<font class='dir-label'>/" + getCurrentDirString() + "</font>");
    addLine();
    let fileCount = 0;
    let folderCount = 0;
    for (let val in dirJson) {
      let folderPrefix = "      ";
      if (isArray(dirJson[val])) {
        folderPrefix = "<DIR> ";
        folderCount++;
      } else {fileCount++}
      addLine("    "+folderPrefix+val, "", true, true);
    }
    addLine("    "+fileCount+" File(s)", "", false, true);
    addLine("    "+folderCount+" Dir(s)", "", false, true);
    addLine();
    resolve();
  });
}

function getCurrentDirString() {
  if (getCurrentDir() == 0) {
    return "";
  }
  return getCurrentDir();
}