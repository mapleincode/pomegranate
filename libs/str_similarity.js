/**
 * @Author: maple
 * @Date: 2022-02-09 14:25:00
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 14:25:00
 */
function removeHeader (file) {
  if (file[0] === '[') {
    const index = file.indexOf(']');
    if (index < file.length - 1) {
      // 判断不是最后一个
      file = file.slice(index + 1);
    }
  }
  return file
    .replace(/( |作者|:|：|-|_|《|》|<|>|\(|\)){1}/g, '');
}

function nameSimilarity (fileA, fileB) {
  fileA = removeHeader(fileA);
  fileB = removeHeader(fileB);

  let tmp = '';
  let max = 0;
  for (let i = 0; i < fileA.length; i++) {
    for (let j = 0; j < fileB.length; j++) {
      for (let k = i, q = j; k < fileA.length && j < fileB.length; k++, q++) {
        if (fileA[k] === fileB[q]) {
          tmp = tmp + fileA[k];
        } else {
          break;
        }
      }
      max = tmp.length > max ? tmp.length : max;
      tmp = '';
    }
  }
  return max;
}

module.exports = nameSimilarity;
