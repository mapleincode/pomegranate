/**
 * @Author: maple
 * @Date: 2022-02-09 14:20:21
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 15:42:42
 */
function formatFile (filename) {
  const tmp = filename.split('.');
  let type = '';
  if (tmp.length > 1) {
    type = tmp.pop();
  }

  const name = tmp.join('.');
  const booksType = ['pdf', 'mobi', 'txt', 'ebk3', 'azw3', 'equb'];
  const rubbishType = ['exe', 'dll'];
  return {
    filename,
    name,
    type,
    isBook: booksType.indexOf(type) > -1,
    isRubbish: rubbishType.indexOf(type) > -1
  };
}

module.exports = formatFile;
