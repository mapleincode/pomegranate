/**
 * @Author: maple
 * @Date: 2022-02-09 13:05:18
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 16:07:21
 */
const createTmpFolders = require('./libs/create_tmp_folders');
const unpackFolders = require('./unpack_folders');
const renameFiles = require('./rename_files');
const mergeFolders = require('./merge_folders');
const sortFiles = require('./sort_files');

function main (root, unpackTimes = 10) {
  // create tmp folder
  createTmpFolders(root);

  // unpack
  // 拆包文件，使多层次文件夹变成单个文件夹
  let times = unpackTimes;
  while (times-- > 0) {
    unpackFolders(root);
  }

  // rename files
  renameFiles(root);

  // merge files
  mergeFolders(root);

  sortFiles(root, false);
}
module.exports = main;
