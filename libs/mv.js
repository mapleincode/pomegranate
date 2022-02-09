/**
 * @Author: maple
 * @Date: 2022-02-09 14:08:55
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 16:05:28
 */
const path = require('path');
const fs = require('fs');

function formatName (name, isDirectory) {
  const tmp = name.split('.');
  let filetype = '';
  if (!isDirectory && tmp.length >= 2) {
    filetype = tmp.pop();
  }
  const fullname = tmp.join('.');
  const lastChar = fullname[fullname.length - 1];
  if (lastChar === ')' || lastChar === '）') {
    const tmp1 = fullname.match(/\([0-9]+\)/g);
    const tmp2 = fullname.match(/（[0-9]+）/g);
    let numberText = null;
    if (lastChar === ')') {
      numberText = tmp1.length ? tmp1[tmp1.length - 1] : null;
    } else {
      numberText = tmp2.length ? tmp2[tmp2.length - 1] : null;
    }

    if (numberText) {
      let fileNumber = parseInt(numberText.slice(1));
      if (!isNaN(fileNumber)) {
        const noNumberName = fullname.slice(0, fullname.length - numberText.length).trim();
        return filetype ? `${noNumberName}(${++fileNumber}).${filetype}` : `${noNumberName}(${++fileNumber})`;
      }
    }
  }

  return filetype ? `${fullname}(1).${filetype}` : `${fullname}(1)`;
}

function mv (oldPath, newPath, root) {
  if (oldPath === newPath) {
    return;
  }

  if (root) {
    oldPath = path.join(root, oldPath);
    newPath = path.join(root, newPath);
  }

  // let doStatus = false;
  while (true) {
    console.log(oldPath + ' -> ' + newPath);
    let newFileStauts = null;
    try {
      newFileStauts = fs.statSync(newPath);
    } catch (err) {

    }
    let oldFileStatus = null;
    try {
      oldFileStatus = fs.statSync(newPath);
    } catch (err) {

    }

    if (!oldFileStatus) {
      // 源文件不存在
      break;
    }

    if (!newFileStauts) {
      // 目标文件不存在
      fs.renameSync(oldPath, newPath);
      break;
    }

    if (newFileStauts.isFile() && oldFileStatus.isFile()) {
      if (newFileStauts.size === oldFileStatus.size) {
        fs.rmSync(oldPath);
        break;
      }
      // rename
      newPath = formatName(newPath, false);
      continue;
    }

    if (newFileStauts.isFile() && oldFileStatus.isDirectory()) {
      newPath = formatName(newPath, true);
      continue;
    }

    if (newFileStauts.isDirectory() && oldFileStatus.isFile()) {
      newPath = formatName(newPath, true);
      continue;
    }

    if (newFileStauts.isDirectory() && oldFileStatus.isDirectory()) {
      const files = fs.readdirSync(oldPath);
      for (const file of files) {
        const _oldPath = path.join(oldPath, file);
        const _newPath = path.join(newPath, file);
        mv(_oldPath, _newPath);
      }
      break;
    }

    break;
  }
};

module.exports = mv;
