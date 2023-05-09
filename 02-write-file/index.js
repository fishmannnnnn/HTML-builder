const fs = require("fs");
var os = require("os");
const path = require("path");
const readline = require("readline");
const { stdin, stdout } = require("process");


console.log("Enter some text please:")
const fileStream = fs.createWriteStream("output.txt", { flags: "a" });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", (input) => {
    if (input.toLowerCase() === "exit") {
        console.log("Exiting...");
        rl.close();
        fileStream.end();
    } else {
        fileStream.write(input + "\n");
    }
});

rl.on("close", () => {
    console.log("Goodbye!");
});