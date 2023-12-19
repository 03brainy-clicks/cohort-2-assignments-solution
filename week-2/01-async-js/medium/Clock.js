// using set setInterval
// setInterval(()=>{
// const date = new Date;
// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds()
// console.log(`${hours}:${minutes}:${seconds} `)
// },1000)


// with set time out 
const dateFn = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  console.log(`${hours}:${minutes}:${seconds} `);
  return setTimeout(dateFn, 1000);
};

dateFn();
