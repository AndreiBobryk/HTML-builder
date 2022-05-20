const { stdout, stdin, exit } = process;
const path = require("path");
const fs = require("fs");
const readline = require("readline");

stdout.write("Hi\n");
const file = path.join(__dirname, "result.txt");
const output = fs.createWriteStream(file);

process.on("exit", () => stdout.write("Удачи!"));

stdin.on("data", (chunk) => {
  if (chunk.includes("exit")) {
    process.exit();
  }
  output.write(chunk);
});
stdin.on("error", (error) => console.log("Error", error.message));

process.on("SIGINT", () => {
  process.exit(0);
});
