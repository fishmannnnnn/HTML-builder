const fs = require("fs");

const copyDir = () => {
    fs.mkdir("04-copy-directory/files-copy", { recursive: true }, (e) => {
        if (e) {
            console.log(e);
        }
    });
    fs.readdir("04-copy-directory/files", (e, files) => {
        if (e) {
            console.log(e);
            return;
        }
        for (let file of files) {
            console.log(`${file} added`);
            fs.copyFile(
                `04-copy-directory/files/${file}`,
                `04-copy-directory/files-copy/${file}`,
                (e) => {
                    if (e) {
                        console.log(e);
                        return;
                    }
                }
            );
        }
        fs.readdir("04-copy-directory/files-copy", (e, data) => {
            if (e) {
                console.log(e);
                return;
            }
            const removeList = getOldItems(files, data);
            if (removeList.length > 0) {
                console.log(`The next items are about to be deleted: ${removeList}`)
                for (let item of removeList) {
                    fs.rm(
                        `04-copy-directory/files-copy/${item}`,
                        { recursive: true },
                        (e) => {
                            if (e) {
                                console.log(e)
                                return;
                            };

                        }
                    );
                }
            }
        });
    });
};

const getOldItems = (arr1, arr2) => arr2.filter((item) => !arr1.includes(item));

copyDir();
