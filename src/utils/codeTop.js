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


// 合并区间
// 左端点排序，然后比较右端点并push