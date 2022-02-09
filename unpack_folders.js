/**
 * @Author: maple
 * @Date: 2022-02-09 15:14:17
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 15:42:16
 */

const fs = require('fs');
const path = require('path');
const similarity = require('./libs/str_similarity');
const sameFiles = require('./libs/same_files');
const mv = require('./libs/mv');

module.exports = function (root) {
// 获取所有文件夹
  const dirs = fs.readdirSync(root);
  for (const dir of dirs) {
    console.log('读取文件夹 ' + dir);
    if (dir === '.DS_Store' || dir.indexOf('tmp') === 0) {
      continue;
    }
    const newDir = path.join(root, dir);
    const files = fs.readdirSync(newDir);
    // 获取所有子文件

    if (files.length === 0) {
      fs.rmdirSync(newDir);
      continue;
    }

    if (files.length === 1) {
    // 文件夹只有一个
      const file = files[0];
      const state = fs.statSync(path.join(newDir, file));
      if (state.isDirectory()) {
        const sameNumber = similarity(file, dir);
        if (Math.abs(file.length - dir.length) <= 3 && Math.max(file.length, dir.length) - sameNumber <= 2) {
          fs.renameSync(path.join(newDir, file), path.join(newDir, '_tmp'));
          const subFiles = fs.readdirSync(path.join(newDir, '_tmp'));
          for (const sub of subFiles) {
            fs.renameSync(path.join(newDir, '_tmp', sub), path.join(newDir, sub));
          }
          fs.rmdirSync(path.join(newDir, '_tmp'));
          continue;
        }
      }
    }

    if ((files.length >= 3 && sameFiles(files, 0.8)) || (files.length <= 2 && sameFiles(files, 1))) {
    // 判定为相似文件
      continue;
    }
    // 遍历子文件夹
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(newDir, file);
      const state = fs.statSync(filePath);
      if (state.isDirectory()) {
        mv(filePath, path.join(root, file));
        files.splice(i, 1);
      }
    }
  }
};
