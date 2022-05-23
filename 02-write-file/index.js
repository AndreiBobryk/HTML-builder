const { stdout, stdin } = process;
const path = require('path');
const fs = require('fs');


stdout.write('Please, enter text:\n');
const file = path.join(__dirname, 'result.txt');
const output = fs.createWriteStream(file);

process.on('exit', () => stdout.write('Good luck!'));

stdin.on('data', (chunk) => {
  if (chunk.includes('exit')) {
    process.exit();
  }
  output.write(chunk);
});
stdin.on('error', (error) => console.log('Error', error.message));

process.on('SIGINT', () => {
  process.exit(0);
});
