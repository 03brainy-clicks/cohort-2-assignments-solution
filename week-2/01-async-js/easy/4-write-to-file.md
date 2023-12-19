## Write to a file
Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

CODE 

const fs = require("fs");
fs.writeFile("./file.txt", "LULU!", (error) => {
  if (error) {
    log("Error : ", error);
  }
});
