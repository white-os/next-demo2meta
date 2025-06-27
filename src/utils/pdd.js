// pdd前练习题目集合

// promise问题1：实现一个限定时间的promise
// 单个异步任务，超时控制
// 实现一个promisetimeout，接收两个参数，第一个为promise，第二个为number，如果promise在number给定的时间内resolve或reject则直接返回，否则返回一个rejected的promise，其reason为new Error('promise time out')
// 思路通过promise.race实现
const timeout = (time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('promise time out'));
    }, time)
  })
}

const promiseTimeout = (promise, time) => {
  return Promise.race([promise, timeout(time)]);
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve');
  }, 5000)
})

promiseTimeout(p1, 1000).then(result => console.log(result)).catch(err => console.error(err));



// promise问题2：给一个promise数组，如何实现按顺序执行
// 多个异步任务，按顺序执行
// 思路： 需要使用await实现
const queuePromise = async (promises) => {
  const res = [];
  for (const promise of promises) {
    try {
      const result = await promise;
      res.push({ status: 'fulfilled', value: result});
    } catch (err) {
      res.push({ status: 'rejected', reason: err});
    }
  }
  return res;
}

const promises = [
  () => new Promise(resolve => setTimeout(() => resolve(1), 100)),
  () => new Promise(resolve => setTimeout(() => resolve(2), 50)),
  () => new Promise(resolve => setTimeout(() => resolve(3), 200))
];

queuePromise(promises.map(fn => fn())).then(res => console.log(res));



// promise问题3: 实现promise.all
// 实现promise.all reject也正常返回，输出所有promise的值
const promiseAll = (promises) => {
  return new Promise(resolve => {
    const result = [];
    let count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(res => {
          result[index] = res;
        })
        .catch(err => {
          result[index] = err;
        })
        .finally(() => {
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        })
    })
  });
}

const promises1 = [
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolve1');
    }, 2000);
  }),
  new Promise((_, reject) => {
    setTimeout(() => {
      reject('reject2');
    }, 1000);
  }),
];

promiseAll(promises1).then(res => console.log(res)).catch(err => console.error(err));


// promise问题4: 异步失败超时控制与重试
// 单个异步任务，超时控制，失败重试
// 实现一个controlFn:传入三个参数，第一个参数为一个异步函数，第二个参数为最大请求次数，第三个参数为最大请求时间
// 需要实现功能:
// 调用controlFn的时候直接调用第一个参数的异步函数，如果失败了，则再次调用
// 但是最多只会调用最大请求次数的次数
// 并且如果开始执行函数的时间超过最大请求时间也会停止
export const controlFn = (fn, maxCount, maxTime) => {
  const count = 0;
  const promiseTimeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, maxTime);
  });

  const execute = async () => {
    try {
      const res = await Promise.race([promiseTimeout, fn()]);
      resolve(res);
    } catch (err) {
      if (count < maxCount) {
        count++;
        execute();
      } else {
        reject(err);
      }
    }
  }
  execute();
}



// promise问题5: 实现对tasks的顺序执行，并配置最大重复次数
// 多个异步任务，顺序执行，失败重试
export const excuteTasks = (tasks, maxRetries) => {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < tasks.length; i++) {
      let attempt = 0;

      while(attempt < maxRetries) {
        try {
          await tasks[i]();
          break;
        } catch (err) {
          attempt++;
          if (attempt >= maxRetries) {
            reject(err);
          }
        }
      }
    }
    resolve();
  });
}
// 非async和await的写法
const excuteTasks = (tasks, maxRetries) => {
  return new Promise((resolve, reject) => {
      const runTask = (i) => {
          if (i >= tasks.length) {
              return resolve();
          }
          const attempt = (retry) => {
              tasks[i]()
                  .then(() => {
                      runTask(i + 1);
                  }).catch(() => {
                      if (retry < maxRetries) {
                          attempt(retry + 1);
                      } else {
                          reject(new Error('maxRetries'));
                      }
                  })
          }
          attempt(0);
      }
      runTask(0);
  })
}





// 问题1：DSF怎么找到一个标签下面和当前标签相差四级的标签，并给他添加指定的class样式
// 思路1：dom.getElementByTagName
// 思路2：有limit的dfs
export const addClassToDepth = (dom, level = 4) => {
  const dfs = (dom, depth) => {
    if (depth === level) {
      if (dom.nodeName === 'IMG') {
        dom.classList.add(targetClass);
      }
      return
    }
    for (const child of dom.children) {
      dfs(child, depth + 1);
    }
  }
  dfs(dom, 0)
}


// 问题4 写一个自定义hook
// 监听元素可见性
export const useOpacity = (element) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(en => {
      if (en[0].intersectionRatio > 0) setOpacity(1);
      else setOpacity(0);
    })

    observer.observe(element);

    return () => observer.disconnect();

  }, [element]);

  return [opacity]
}







// deepclone
export const deepClone = (target) => {
  if (typeof target !== 'object' || target === null) {
    return target;
  }

  const clone = Array.isArray(target) ? [] : {};

  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      clone[key] = deepClone(target[key]);
    }
  }
  return clone;
}


// 非递归实现二叉树后序遍历
export const postOrderTraversal = (root) => {
  const stack1 = [root];
  const stack2 = [];

  while (stack1.length > 0) {
    const node = stack1.pop()
    stack2.push(node);

    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }

  return stack2.reverse().map(node => node.val);
}

// 实现一个myFlat函数，将多维数组扁平化
const myFlat = (arr) => {
  const res = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      res.push(...myFlat(item));
    } else {
      res.push(item);
    }
  }

  return res;
}


// react实现计时组件
export function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds => seconds + 1)
    }, 1000)
    return () => clearInterval(timer);
  }, [])

  return <div>{seconds}</div>
}

// 使用requestAnimationFrame
export function requestAnimationFrameTimer() {
  const [second, setSecond] = useState(0);
  const timeRef = useRef(0);

  useEffect(() => {
    timeRef.current = Date.now();
    let frame;
    const tick = () => {
      setSecond(Math.floor((Date.now() - timeRef.current) / 1000));
      frame = window.requestAnimationFrame(tick);
    }
    tick();
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div>{second}</div>;
}

// 倒计时函数
function Timer ({ endTime, callback }) {
  const [seconds, setSeconds] = useState(endTime); // 展示的时间

  useEffect(() => {
      if (seconds === 0) {
          callback && callback();
          return;
      }

      const timer = setInterval(() => {
          setSeconds(seconds => seconds - 1);
      }, 1000);

      return clearInterval(timer);
  }, [seconds, callback, setSeconds]);

  return <div>倒计时：{seconds} s</div>;
}
