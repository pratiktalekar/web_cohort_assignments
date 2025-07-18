## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs");

aync function writeToFile(content) {
    try{
        await fs.writeFile("a.txt", content);
    }
    catch(err) {
        console.log("there was error writing to file")
    }
}

writeToFile("hi there")