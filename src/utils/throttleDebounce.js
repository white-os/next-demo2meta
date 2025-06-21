// 实现防抖节流函数

function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if (timer) clearImmediate(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  }
}

function throttle(fn, delay) {
  let lastTime = 0; 
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  }
}

// 测试

const fn = () => {
  console.log('fn');
}

const debounceFn = debounce(fn, 1000);
debounceFn();
debounceFn();

const throttleFn = throttle(fn, 1000);
throttleFn();
throttleFn();
