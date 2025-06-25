let timeout = (time) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, time);
  })
}

let timeoutPromise = (promise, time) => {
  return Promise.race([promise, timeout(time)]);
}

const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve('p1');
  }, 1000);
})

timeoutPromise(p1, 100).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
})