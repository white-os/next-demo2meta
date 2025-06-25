/**
 * 从一个缺少了两个数字的乱序数组中找出这两个缺失的数字。
 * 原始数组包含从 1 到 n 的所有整数。
 * @param {number[]} arr - 缺少两个数字且被打乱的数组。
 * @returns {number[]} - 包含两个缺失数字的数组。
 */
function findTwoMissingNumbers(arr) {
  const missingNumbers = [];
  const n = arr.length + 2;
  
  // 使用 Set 数据结构来优化查找效率
  const numSet = new Set(arr);
  
  // 从 1 遍历到 n
  for (let i = 1; i <= n; i++) {
    // 如果数字不在 Set 中，说明它是缺失的数字
    if (!numSet.has(i)) {
      missingNumbers.push(i);
    }
  }
  
  return missingNumbers;
}


export const findMissNumber = function(arr) {
  const res = [];
  const len = arr.length + 2;
  const set = new Set(arr);
  for (let i = 1; i <= len; i++) {
      if(!set.has(i)) {
          res.push(i);
      }
  }
  return res;
}

/**
 * [空间优化] 使用数学求和法找出缺失的两个数字。
 * 这种方法的时间复杂度为 O(n)，空间复杂度为 O(1)，但当 n 很大时可能会有整数溢出问题。
 * @param {number[]} arr - 缺少两个数字且被打乱的数组。
 * @returns {number[]} - 包含两个缺失数字的数组。
 */
export function findTwoMissingNumbersMath(arr) {
  const n = arr.length + 2;

  // 1. 计算理论上的总和与数组的实际总和
  const totalSum = n * (n + 1) / 2;
  const arrSum = arr.reduce((sum, current) => sum + current, 0);

  // 2. 得到两个缺失数字的和 (x + y)
  const sumOfMissing = totalSum - arrSum;

  // 3. 计算理论上的平方和与数组的实际平方和
  // 注意：对于非常大的 n，这里可能会溢出 JavaScript 的安全整数范围
  const totalSquareSum = (n * (n + 1) * (2 * n + 1)) / 6;
  const arrSquareSum = arr.reduce((sum, current) => sum + current * current, 0);

  // 4. 得到两个缺失数字的平方和 (x^2 + y^2)
  const sumOfSquaresOfMissing = totalSquareSum - arrSquareSum;

  // 5. 解方程组:
  // x + y = A (sumOfMissing)
  // x^2 + y^2 = B (sumOfSquaresOfMissing)
  // 通过 (x-y)^2 = 2(x^2+y^2) - (x+y)^2 求解出 x-y
  const diffOfMissing = Math.sqrt(2 * sumOfSquaresOfMissing - sumOfMissing * sumOfMissing);

  // 6. 解出两个未知数
  // x = ( (x+y) + (x-y) ) / 2
  // y = ( (x+y) - (x-y) ) / 2
  const missing1 = (sumOfMissing + diffOfMissing) / 2;
  const missing2 = (sumOfMissing - diffOfMissing) / 2;

  return [missing1, missing2];
}

export default findTwoMissingNumbers;