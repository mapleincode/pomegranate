/**
 * @Author: maple
 * @Date: 2022-02-09 15:19:13
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 15:41:51
 */
const fs = require('fs');
const mv = require('./libs/mv');
module.exports = function (root) {
  const dirs = fs.readdirSync(root);
  const ppp = {};
  for (const dir of dirs) {
    if (dir === '.DS_Store' || dir.indexOf('tmp') === 0) {
      continue;
    }
    const readDir = dir.replace(/_re/g, '');
    Array.isArray(ppp[readDir]) ? ppp[readDir].push(dir) : ppp[readDir] = [dir];
  }
  const keys = Object.keys(ppp).filter(key => ppp[key].length > 1);
  for (const key of keys) {
    const files = ppp[key];
    // mergeFolder(files, root);
    for (let i = 0; i < files.length; i++) {
      mv(files[i], key, root);
    }
  }
};
