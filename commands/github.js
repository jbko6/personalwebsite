import {addLine} from '../utils.js';

export function callCommand() {
  return new Promise((resolve, reject)=>{
    addLine();
    addLine("You can view my github projects here:");
    addLine("<a href='https://github.com/jbko6/' target='_blank'>https://github.com/jbko6/</a>")
    addLine();
    addLine("You can view the repository for this website here:");
    addLine("<a href='https://github.com/jbko6/personalwebsite' target='_blank'>https://github.com/jbko6/personalwebsite</a>")
    addLine();
    resolve();
  });
}