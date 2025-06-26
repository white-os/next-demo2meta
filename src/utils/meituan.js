// 实现instanceof
export const myInstanceof = (instance, rootClass) => {
  let result = false;
  let current = instance;
  while (result === false && current !== null) {
    if (current.__proto__ === rootClass.prototype) {
      result = true;
    }
    current = current.__proto__;
  }
  return result;
}

// 数字格式化1234567890 => 1,234,567,890
export const formatNumber = (num) => {
  const str = num.toString();
  str.reverse().split('').map((item, index) => {
    if (index % 3 === 0 && index !== 0) {
      return ',' + item;
    } else {
      return item;
    }
  }).reverse().join('');
  return str;
}

// 手写apply
Function.prototype.myApply = function (thisArg, args) {
  thisArg = thisArg === null ? (window || global) : Object(thisArg);

  const symbolFn = Symbol();
  thisArg[symbolFn] = this;

  let result;
  if (args !== null && args !== undefined) {
    result = thisArg[symbolFn](...args);
  } else {
    result = thisArg[symbolFn]();
  }
  delete thisArg[symbolFn];
  return result;
}

// 手写bind
Function.prototype.myBind = function (thisArg, ...args) {
  const self = this;
  return function (...newArgs) {
    return self.apply(thisArg, [...args, ...newArgs]);
  }
}


// 最大深度maxDepth
// 深度优先
export const maxDepthDFS = (root) => {
  if (!root) return 0;
  return Math.max(maxDepthDFS(root.left), maxDepthDFS(root.right)) + 1;
}

// 广度优先
export const maxDepthBFS = (root) => {
  if (!root) return 0;
  const queue = [root];
  let depth = 0;
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
}


