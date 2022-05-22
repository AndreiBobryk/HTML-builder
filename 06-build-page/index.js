const fs = require("fs");
const path = require("path");
const fsPromise = fs.promises;
const bundleCSS = require('../05-merge-styles/index');

const filesComponents = path.join(__dirname, "components");
const fileSrc = path.join(__dirname, "template.html");
const pathDirDest = path.join(__dirname, "project-dist");
const pathFileDest = path.join(__dirname, "project-dist", "index.html");
const pathDirSrcBundle = path.join(__dirname, "styles");
const pathDirDestBundle = path.join(__dirname, "project-dist", "bundle.css");

async function readTemplate(readable) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}
let arrTemp;
let template = readTemplate(fs.createReadStream(fileSrc)).then((v) => {
  arrTemp = v.split(/{{|}}/);
  arrTemp.forEach((item) => {
    console.log(item);
  });
  fs.readdir(filesComponents, (err, files) => {
    if (err) {
      console.log(err);
    } else {

      for (let i = 0; i < files.length; i++) { // проверить на условие когда файлов несколько
        const nameFile = files[i].slice(0, files[i].lastIndexOf("."));
        if (arrTemp.includes(nameFile)) {
          const index = arrTemp.indexOf(nameFile);
          const pathFile = path.join(filesComponents, files[i]);
          readTemplate(fs.createReadStream(pathFile)).then((v) => {
            arrTemp[index] = v;
            if (i === files.length - 1) {
              const data = arrTemp.join("");
              console.log(arrTemp);
              console.log(arrTemp.join(""));
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
          console.log("yet");
        }
      }
    }
  });
});

fsPromise
  .mkdir(pathDirDest, { recursive: true })
  .catch(console.error).then(bundleCSS(pathDirSrcBundle, pathDirDestBundle));






// async function arrPromise(arr) {
//   return await arr.map((item) => {
//     if (typeof item === "string") {
//       return item;
//     } else {
//       return item;
//     }
//   });

// }
// console.log(arrTemp);

// fsPromise
//   .writeFile(pathDirDest, arrTemp.join(''), (err) => {
//     if (err) throw err;
//   });

// template.then(v => console.log(v));
// console.log(template.then(v=>console.log(v)));

// let result = await template.then();
// console.log(result)

// eslint-disable-next-line no-unused-vars
// template = template.split(/(\/\/{{|\/\/}})/);
// (template.then(value => console.log(value)).catch(console.error));
