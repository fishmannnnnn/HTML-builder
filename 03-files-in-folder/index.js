const fs = require("fs");
const path = require("path");

const getFilesInfo = async () => {
    const route = path.resolve(__dirname, "secret-folder");

    fs.readdir(route, (e, files) => {
        if (e) {
            console.log(e)
            return;
        };
        files.forEach((file => {
            const filePath = path.resolve(route, file)
            fs.stat(filePath, (e, stats) => {
                if (e) {
                    console.log(e)
                    return;
                }
                
                if (stats.isFile()) {
                    console.log(`${file} - ${path.extname(filePath)} - ${stats.size} bytes`)
                }
            })
        }))
    });
};

getFilesInfo();
