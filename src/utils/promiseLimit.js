/**
 * 控制 Promise 并发数量
 * @param {number} limit 并发上限
 * @param {Array<() => Promise<any>>} tasks 任务列表，每个任务是一个返回 Promise 的函数
 * @returns {Promise<any[]>} 返回一个 Promise，它将在所有任务完成后解析，并带上所有任务的结果数组
 */
function limitPromiseConcurrency(limit, tasks) {
  return new Promise((resolve, reject) => {
    // 如果任务列表为空，直接返回
    if (!tasks || tasks.length === 0) {
      return resolve([]);
    }

    const results = new Array(tasks.length);
    let taskIndex = 0; // 下一个要执行的任务索引
    let completedCount = 0; // 已完成的任务数量
    let runningCount = 0; // 正在运行的任务数量

    // "工人"函数，用于执行任务
    const runTask = () => {
      // 当还有任务需要执行，并且当前运行的任务数小于限制时
      while (runningCount < limit && taskIndex < tasks.length) {
        const currentIndex = taskIndex;
        const task = tasks[taskIndex];
        
        taskIndex++;
        runningCount++;

        // 执行任务
        task()
          .then(result => {
            results[currentIndex] = result;
          })
          .catch(error => {
            // 任意一个任务失败，则立即拒绝整个 Promise
            reject(error);
          })
          .finally(() => {
            runningCount--;
            completedCount++;
            
            // 如果所有任务都已完成
            if (completedCount === tasks.length) {
              resolve(results);
            } else {
              // 否则，尝试运行下一个任务
              runTask();
            }
          });
      }
    };

    // 启动初始的一批任务
    runTask();
  });
}

export default limitPromiseConcurrency; 