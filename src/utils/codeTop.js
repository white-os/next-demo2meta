// 无重复最长子串
// 滑动窗口
export const lengthOfLongestSubstring = (s) => {
  const set = new Set();
  const maxLen = 0;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    while(set.has(char)) {
      set.delete(s[left]);
      left++;
    }
    set.add(char);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}


// 最大子数组和
// 最小前缀和
// 前置知识，前缀和，数组的前几个元素加起来的和，想算最大值，实际上使用当前前缀和-最小前缀和
export const maxSubArray = function(nums) {
  let res = -Infinity;
  let sum = 0;
  let preMinSum = 0;
  for (const x of nums) {
      sum += x;
      res = Math.max(res, sum - preMinSum);
      preMinSum = Math.min(sum, preMinSum);
  }
  return res;
};

// 数组中第k个最大元素
// 快速选择
export const findKthLargest = (nums, k) => {
  const len = nums.length;
  const target = len - k;
  const quickSelect = (left, right) => {
    const pivot = nums[right];
    let p = left;
    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[p]] = [nums[p], nums[i]];
        p++;
      }
    }
    [nums[p], nums[right]] = [nums[right], nums[p]];
    return p;
  }
  let left = 0, right = len - 1;
  while (left < right) {
    const p = quickSelect(left, right);
    if (p === target) {
      return nums[p];
    } else if (p < target) {
      left = p + 1;
    } else {
      right = p - 1;
    }
    return nums[left];
  }
}


// 合并区间
// 左端点排序，然后比较右端点并push
// ***** 面试真的考到了 2025/6/24 拼多多 *****
export const merge = (intervals) => {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];
  for (let i = 0; i < intervals.length; i++) {
    const len = res.length;
    if (len && res[len-1][1] >= intervals[i][0]) {
      res[len-1][1] = Math.max(res[len-1][1], intervals[i][i]);
    } else {
      res.push(intervals[i]);
    }
  }
  return res;
}


// 螺旋矩阵
export const spiralOrder = (matrix) => {
  const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const res = [];
  const m = matrix.length;
  const n = matrix[0].length;
  let i = 0, j = 0, dir = 0;
  for (let k = 0; k < m * n; k++) {
    res.push(matrix[i][j]);
    matrix[i][j] = null;
    const x = i + DIRS[dir][0];
    const y = j + DIRS[dir][1];
    if (x < 0 || x >= m || y < 0 || y >= n || matrix[x][y] === null) {
      dir = (dir + 1) % 4;
    }
    i += DIRS[dir][0];
    j += DIRS[dir][1];
  }
  return res;
}

// 反转链表
// 迭代
export const reverseList = (head) => {
  let prev = null;
  let node = head;
  while (node) {
    let next = node.next;
    node.next = prev;
    prev = node;
    node = next;
  }
  return prev;
}

// 买卖股票最佳时机
// 贪心
export const maxProfit = (prices) => {
  let res = 0;
  let minPrice = prices[0];
  for (const price of prices) {
    res = Math.max(res, price - minPrice);
    minPrice = Math.min(minPrice, price);
  }
  return res;
}


// 最长回文子串
export const longestPalindrome = (s) => {
  let startIndex = 0;
  let maxLen = 1;
  const len = s.length;
  const dp = Array.from({length: len}, () => Array(len).fill(false));
  for (let i = 0; i < len; i++) {
    dp[i][i] = true;
  }
  for (let j = 1; j < len; j++) {
    for (let i = 0; i < j; i++) {
      if (s[i] !== s[j]) {
        dp[i][j] = false;
      } else {
        if (j - i < 3) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i+1][j-1];
        }
      }

      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1;
        startIndex = i;
      }
    }
  }
  return s.slice(startIndex, startIndex + maxLen);
}

// leetcode20 有效的括号



// 字符串相乘
