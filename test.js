const path = require("path");
const fs = require("fs");
const fsPromise = fs.promises;

const source = path.join(__dirname, "04-copy-directory", "files");
const destination = path.join(__dirname, "test");

const recursiveCopyFolder = (source, destination) => {
  fsPromise.rm(destination, { recursive: true, force: true }).then((v) => {
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

recursiveCopyFolder(source, destination);
