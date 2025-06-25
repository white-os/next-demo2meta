// pdd前练习题目集合

// 问题1：怎么找到一个标签下面和当前标签相差四级的标签，并给他添加指定的class样式
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


// 问题2：实现一个promisetimeout，接收两个参数，第一个为promise，第二个为number，如果promise在number给定的时间内resolve或reject则直接返回，否则返回一个rejected的promise，其reason为new Error('promise time out')
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


// 问题3：给一个promise数组，如何实现按顺序执行
// 思路： 需要使用await实现
const queuePromise = async (promises) => {
  const res = [];
  for (const promise of promises) {
      res.push(await promise);
  }
  return res;
}

const promises = [
() => new Promise(resolve => setTimeout(() => resolve(1), 100)),
() => new Promise(resolve => setTimeout(() => resolve(2), 50)),
() => new Promise(resolve => setTimeout(() => resolve(3), 200))
];

queuePromise(promises.map(fn => fn())).then(res => console.log(res));


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

// 问题5 实现promise.all reject也正常返回，输出所有promise的值
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


// 问题6 异步失败超时控制
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