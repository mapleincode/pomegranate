/**
 * @Author: maple
 * @Date: 2022-02-09 15:23:17
 * @LastEditors: maple
 * @LastEditTime: 2022-02-09 15:42:10
 */
const fs = require('fs');
const path = require('path');
const sameFiles = require('./libs/same_files');

module.exports = function (root, debug) {
  const dirs = fs.readdirSync(root);
  for (const dir of dirs) {
    if (dir === '.DS_Store' || dir.indexOf('tmp') === 0) {
      continue;
    }

    const files = fs.readdirSync(path.join(root, dir));
    const states = files.map(file => fs.statSync(path.join(root, dir, file)));

    const isAllFile = states.every(state => state.isFile());
    // const allNumber = files.every(file => /[0-9]{1}/.test(file));
    const dirNumber = /[0-9]{1}/.test(dir);
    const isAllDirectiory = states.every(state => state.isDirectory());

    if (files.length === 1) {
      const file = files[0];
      const fileState = fs.statSync(path.join(root, dir, file));
      if (fileState.isFile()) {
        fs.renameSync(path.join(root, dir, files[0]), path.join(root, 'tmp', files[0]));
        fs.rmdirSync(path.join(root, dir));
        continue;
      }
    }

    if (files.length < 10 ||
          sameFiles(files, 0.8) ||
          dir.indexOf('文集') > -1 ||
          dir.indexOf('作者') > -1 ||
          dir.indexOf('作品') > -1 ||
          dir.indexOf('全集') > -1) {
      if (isAllFile && !dirNumber) {
        console.log(`${dir} -> tmp_folder_file/${dir}`);

        if (!debug) {
          if (files.length > 100) {
            // tmp_folder_file_many
            fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_files_many', dir));
            continue;
          }
          fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_files', dir));
        }
      } else if (isAllDirectiory && !dirNumber) {
        console.log(`${dir} -> tmp_folder_dir/${dir}`);
        if (!debug) {
          fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_dir', dir));
        }
      } else if (isAllFile && dirNumber) {
        console.log(`${dir} -> tmp_folder_files_number/${dir}`);
        if (!debug) {
          fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_files_number', dir));
        }
      } else if (dirNumber) {
        console.log(`${dir} -> tmp_folder_number/${dir}`);
        if (!debug) {
          fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_number', dir));
        }
      } else {
        console.log(`${dir} -> tmp_folder/${dir}`);
        if (!debug) {
          fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder', dir));
        }
      }

      continue;
    }
    if (dirNumber && isAllFile) {
      console.log(`${dir} -> tmp_folder_number/${dir}`);
      if (!debug) {
        fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_files_number', dir));
      }
      continue;
    }

    if (isAllFile) {
      console.log(`${dir} -> tmp_folder_other_files/${dir}`);
      if (!debug) {
        fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_other_files', dir));
      }
    } else {
      console.log(`${dir} -> tmp_folder_other/${dir}`);
      if (!debug) {
        fs.renameSync(path.join(root, dir), path.join(root, 'tmp_folder_other', dir));
      }
    }
  }
};
