const fs = require('fs');
const path = require('path');
const fsPromise = fs.promises;
const recursiveCopyFolder = require('../04-copy-directory/index');
const bundleCSS = require('../05-merge-styles/index');

const filesComponents = path.join(__dirname, 'components');
const fileSrc = path.join(__dirname, 'template.html');
const pathDirDest = path.join(__dirname, 'project-dist');
const pathFileDest = path.join(__dirname, 'project-dist', 'index.html');
const pathDirSrcBundle = path.join(__dirname, 'styles');
const pathDirDestBundle = path.join(__dirname, 'project-dist', 'style.css');
const pathDirSrcAssets = path.join(__dirname, 'assets');
const pathDirDestAssets = path.join(__dirname, 'project-dist', 'assets');

async function readTemplate(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}
let arrTemp;
readTemplate(fs.createReadStream(fileSrc)).then((v) => {
  arrTemp = v.split(/{{|}}/);
  fs.readdir(filesComponents, (err, files) => {
    if (err) {
      console.log(err);
    } else {

      for (let i = 0; i < files.length; i++) { 
        const nameFile = files[i].slice(0, files[i].lastIndexOf('.'));
        if (arrTemp.includes(nameFile)) {
          const index = arrTemp.indexOf(nameFile);
          const pathFile = path.join(filesComponents, files[i]);
          readTemplate(fs.createReadStream(pathFile)).then((v) => {
            arrTemp[index] = v;
            if (i === files.length - 1) {
              const data = arrTemp.join('');
              fsPromise
                .mkdir(pathDirDest, { recursive: true })
                .catch(console.error)
                .then(
                  fs.writeFile(pathFileDest, data, (err) => {
                    if (err) throw err;
                  })
                );
            }
          });
        }
      }
    }
  });
});

fsPromise
  .mkdir(pathDirDest, { recursive: true })
  .catch(console.error).then(bundleCSS(pathDirSrcBundle, pathDirDestBundle));
fsPromise
  .mkdir(pathDirDest, { recursive: true })
  .catch(console.error).then(recursiveCopyFolder(pathDirSrcAssets, pathDirDestAssets));







