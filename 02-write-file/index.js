const fs = require("fs");
const readline = require("readline");
const { stdin, stdout } = require("process");


console.log("Enter some text please:")
const fileStream = fs.createWriteStream("02-write-file/output.txt", { flags: "a" });

const rl = readline.createInterface({
    input: stdin,
    output: stdout
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