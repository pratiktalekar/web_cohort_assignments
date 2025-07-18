## Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. 

solution =>

const fs = require("fs");

fs.readFile("a.txt", "utf-8", (err, data) => {
    if (err){
        console.log("there is error reading data from the file");
        return;
    }
    console.log("data content :", data)
})

                OR

async function readFile() {
    try{
        const data = await fs.readfile("a.txt", 'utf-8');
        console.log(data)
    }
    catch (err) {
        console.log("there is an error reading the file")
    }
}