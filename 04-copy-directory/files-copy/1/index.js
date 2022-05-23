const path = require('path');
const fs = require('fs');
const fsPromise = fs.promises;
const folderPathSource = path.join(__dirname, 'files');
const folderPathDestination = path.join(__dirname, 'files-copy');