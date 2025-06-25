class PubSub {
  constructor() {
    this.events = {};
  }

  /**
   * 订阅事件
   * @param {string} eventName 事件名称
   * @param {function} callback 回调函数
   */
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  /**
   * 发布事件
   * @param {string} eventName 事件名称
   * @param  {...any} args 传递给回调函数的参数
   */
  publish(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(...args);
      });
    }
  }

  /**
   * 取消订阅
   * @param {string} eventName 事件名称
   * @param {function} callback 要移除的回调函数
   */
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callback
      );
    }
  }
}


// 另一个发布订阅示例
export class EventEmitter {
  constructor() {
    this.evnets = new Map();
  }

  // 订阅事件
  subscribe(eventName, callback) {
    if (!this.events.get(eventName)) {
      this.events.set(eventName, []);
    }

    const callbacks = this.events.get(eventName);
    callbacks.push(callback);
    return this;
  }

  // 发布事件
  publish(eventName, ...args) {
    if (!this.events.get(eventName)) {
      return this;
    }
    const callbacks = this.events.get(eventName);
    callbacks.forEach(callback => {
      callback(...args);
    })
    return this;
  }

  // 取消订阅
  unsubscribe(eventName, callback) {
    if (!this.evnets.get(eventName)) {
      return this;
    }
    if (!callback) {
      this.events.delete(eventName);
    }
    else {  
      const callbacks = this.events.get(eventName);
      this.events.set(eventName, callbacks.filter(cb => cb !== callback));
    }
    return this;
  }
}


// 创建一个单例
const pubsub = new PubSub();

export default pubsub; 