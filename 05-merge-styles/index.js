const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "styles");
const outFile = path.join(__dirname, "project-dist", "bundle.css");

// const stylesDir = path.join(__dirname, "test-files","styles");
// const outFile = path.join(__dirname, "test-files", "bundle.css");

const outStream = fs.createWriteStream(outFile);

function buildStyles() {
    outStream.write("");

    fs.readdir(stylesDir, (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
            const filePath = path.join(stylesDir, file);
            if (path.extname(filePath) !== ".css") {
                return;
            }
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return;
                }

                const readStream = fs.createReadStream(filePath);
                readStream.pipe(outStream, { end: false });

                readStream.on("end", () => {
                    outStream.write("\n");
                });
            });
        });
    });
}

buildStyles();
