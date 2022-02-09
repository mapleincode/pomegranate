/**
 * @Author: maple
 * @Date: 2022-02-09 13:19:29
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 14:06:54
 */
const fs = require('fs');
const path = require('path');

const defaultFolders = [
  'tmp',
  'tmp_folder',
  'tmp_folder_number',
  'tmp_folder_files',
  'tmp_folder_files_many',
  'tmp_folder_files_number',
  'tmp_folder_dir',
  'tmp_folder_other',
  'tmp_folder_other_files'
];

module.exports = function (root, folders = defaultFolders) {
  for (const folder of folders) {
    const _folder = path.join(root, folder);
    try {
      fs.mkdirSync(_folder);
      console.log(`create folder ${folder} success!`);
    } catch (err) {

    }
  }
};
