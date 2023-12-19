## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```

Here is the code 

const fs = require("fs");

<!-- we are returning a promise  -->
const dataPromise = new Promise((resolve, reject) => {
  fs.readFile("file.txt", "utf8", (err, data) => {
    if (err) {
      reject(err); // if any error occurs then rejecting the promise
    } else {
      resolve(data); //if resolved we are send the reading file data
    }
  });
});

dataPromise.then((data) => {
  const removedSpaceData = data.replace(/\s+/g, " "); // removing extra spaces 
  fs.writeFile("file.txt", removedSpaceData, (err) => { // writing content back to the file
    if (err) {
      console.log("Error in writing file : ", err);
    }
  });
});
