const path = require("path");
const fs = require("fs");
const fsPromise = fs.promises;
const folderPathSource = path.join(__dirname, "files");
const folderPath = path.join(__dirname, "files-copy");


fsPromise
  .mkdir(folderPath, { recursive: true })
  .catch(console.error)
  .then(
    fs.readdir(folderPath, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(folderPath, file), (err) => {
          if (err) throw err;
        });
      }
    })
  )
  .then(
    fs.readdir(folderPathSource, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          const pathSrc = path.join(folderPathSource, file);
          const pathDest = path.join(folderPath, file);
          fsPromise.copyFile(pathSrc, pathDest);
        });
      }
    })
  );
