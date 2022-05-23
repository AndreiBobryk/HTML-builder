const fs = require('fs');
const path = require('path');
const fsPromise = fs.promises;

const pathDirSrcBundle = path.join(__dirname, 'styles');
const pathDirDestBundle = path.join(__dirname, 'project-dist', 'bundle.css');

const bundleCSS = (source, destination) => {
  const separator = '\n\n';

  fsPromise
    .writeFile(destination, '')
    .catch(console.error)
    .then(
      fs.readdir(source, { withFileTypes: true }, (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.forEach((file) => {
            if (file.isFile() && file.name.slice(-4) === '.css') {
              const pathSrc = path.join(source, file.name);
              fs.readFile(pathSrc, 'utf8', (err, data) => {
                if (err) throw err;

                fsPromise
                  .appendFile(destination, separator, (err) => {
                    if (err) throw err;
                  })
                  .then(
                    fsPromise.appendFile(destination, data, (err) => {
                      if (err) throw err;
                    })
                  );
              });
            }
          });
        }
      })
    );
};

bundleCSS(pathDirSrcBundle, pathDirDestBundle);

module.exports = bundleCSS;
