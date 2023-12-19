// ? with setInterval

// const Counter = ()=>{
//     let count = 0;
//     setInterval(()=>{
//         console.log(count ++)
//     },1000)
// }

// Counter()
// ---
// let count = 0;

// const UpdateCount = ()=>{
//     count++;
//     console.log(count);
// }

// setInterval(UpdateCount,1000)

// ? without setInterval

let count = 0;

const UpdateCount = () => {
  count++;
  console.log(count);
  setTimeout(UpdateCount,1000) // recursion call
};

UpdateCount()