const fsPromise = require("fs");
const path = require("path");

const pathDir = path.join(__dirname, "secret-folder");

fsPromise.readdir(pathDir, { withFileTypes: true }, (err, files) => {
  console.log("\nCurrent directory files:");
  if (err) {
    console.log(err);
  } else {
    files.forEach((file) => {
      if (file.isFile()) {
        const fullNameFile = file.name;
        const indexDot = fullNameFile.lastIndexOf(".");
        const name = fullNameFile.slice(0, indexDot);
        const extensions = fullNameFile.slice(indexDot + 1);
        const pathFile = path.join(__dirname, "secret-folder", fullNameFile);
    
        fsPromise.stat(pathFile, (err, stats) => {
          const size = stats.size / 1000 + 'kb';
          console.log(`${name} - ${extensions} - ${size}`);
        });
 
      }
    });
  }
});


