const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;
const folderPathSource = path.join(__dirname, 'files');
const folderPathDestination = path.join(__dirname, 'files-copy');


const recursiveCopyFolder = (source, destination) => {
  fsPromise.rm(destination, { recursive: true, force: true }).then(() => {
    fsPromise
      .mkdir(destination, { recursive: true })
      .catch(console.error)
      .then(
        fs.readdir(source, { withFileTypes: true }, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach((file) => {
              if (file.isFile()) {
                const pathSrc = path.join(source, file.name);
                const pathDest = path.join(destination, file.name);
                fsPromise.copyFile(pathSrc, pathDest);
              } else {
                const target = path.join(destination, file.name);

                const src = path.join(source, file.name);
                fsPromise
                  .mkdir(target, { recursive: true })
                  .catch(console.error)
                  .then(recursiveCopyFolder(src, target));
              }
            });
          }
        })
      );
  });
};

recursiveCopyFolder(folderPathSource, folderPathDestination);

module.exports = recursiveCopyFolder;
