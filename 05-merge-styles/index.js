const fs = require("fs");
const path = require("path");
const fsPromise = fs.promises;

const pathDirSrc = path.join(__dirname, "styles");
const pathDirDest = path.join(__dirname, "project-dist", "bundle.css");

fsPromise
  .writeFile(pathDirDest, "")
  .catch(console.error)
  .then(
    fs.readdir(pathDirSrc, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach((file) => {
          if (file.isFile() && file.name.slice(-4) === ".css") {
            const pathSrc = path.join(pathDirSrc, file.name);
            fs.readFile(pathSrc, "utf8", (err, data) => {
              if (err) throw err;

              fsPromise.appendFile(pathDirDest, data, (err) => {
                if (err) throw err;
              });
            });
          }
        });
      }
    })
  );
