const fs = require("fs");

// reading file

const promise = new Promise((resolve, reject) => {
  fs.readFile("./File.txt", "utf-8", (error, data) => {
    if (error) {
      reject(error);
    } else {
      resolve(data);
    }
  });
});

promise.then((res) => console.log(res));
// writing file
// fs.writeFile("./file.txt", "LULU!", (error) => {
//   if (error) {
//     log("Error : ", error);
//   }
// });
