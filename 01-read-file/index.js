const path = require("path");
const fs = require("fs");

const file = path.join(__dirname, 'text.txt');

async function print(readable) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  console.log(data);
}

print(fs.createReadStream(file)).catch(console.error);
