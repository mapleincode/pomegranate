/**
 * @Author: maple
 * @Date: 2022-02-09 15:17:46
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 15:42:06
 */
const fs = require('fs');
const mv = require('./libs/mv');

module.exports = function (root) {
  const dirs = fs.readdirSync(root);
  for (const dir of dirs) {
    if (dir === '.DS_Store' || dir.indexOf('tmp') === 0) {
      continue;
    }
    if (dir[0] === '《') {
      if (dir[dir.length - 1] === '》') {
        mv(dir, dir.slice(1, dir.length - 1), root);
      }
    }
  }
};
