import {addLine} from '../utils.js';

export function callCommand() {
  return new Promise((resolve, reject)=>{
    addLine();
    addLine("WIP. Only command is github right now.");
    addLine();
    resolve();
  });
}