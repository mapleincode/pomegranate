/**
 * @Author: maple
 * @Date: 2022-02-09 14:19:32
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 14:28:15
 */
const formatFilename = require('./format_filename');
const similarity = require('./str_similarity');

function judgeNumberNotYear (str) {
  const numbers = str.match(/[0-9]+/g);
  if (!numbers) return false;

  const nameObj = formatFilename(str);
  const name = nameObj.name;

  if (/^[0-9]+$/.test(name)) {
    return true;
  }
  const num = numbers[0];
  if (name.indexOf(num) !== 0 && name.indexOf(num) !== (name.length - num.length)) {
    return false;
  }

  // if (numbers.find(num => num < 1000 || num > 3000) !== undefined) {
  //   return true;
  // }

  return true;
}

/**
  * 返回文件夹是否为系列文件
  * @param {Array} files 文件名
  * @returns boolean
  */
function samefiles (files, per = 0.5) {
  const allCount = files.length;
  const subCount = parseInt(per * allCount);
  let count = 0;
  const tmp = files[0].split('.');
  tmp.pop();
  const firstFile = tmp.join('.');

  if (files.length === 1 && !/^[0-9]{1,5}$/.test(files[0])) {
    return false;
  }

  const mmm = {};

  for (const file of files) {
    // console.log(file, count);
    if (firstFile.length > 3) {
      if (similarity(firstFile, file) >= 3) {
        // console.log(file + '判断为相似文件名');
        count++;
        continue;
      }
    }

    if (judgeNumberNotYear(file)) {
      const nums = file.match(/[0-9]+/g);
      const num = nums[0];

      if (mmm[num]) {
        continue;
      }
      mmm[num] = true;
      // console.log(file + '判断为数字');
      count++;
      continue;
    }

    if (/(一|二|三|四|五|六|七|八|九|十|零|第|上|中|下|册){1}/.test(file)) {
      // console.log(file + '判断为中文数字');
      count++;
      continue;
    }
  }

  console.log(`总数: ${files.length} 匹配数量: ${count}  per: ${per}`);

  if (count >= subCount) {
    return true;
  }

  return false;
}

module.exports = samefiles;
