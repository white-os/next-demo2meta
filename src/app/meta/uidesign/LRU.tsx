class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        
        // 创建头尾哨兵节点
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
        
        this.size = 0;
    }
    
    // 将节点添加到链表头部
    _addToFront(node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;
        this.head.next = node;
    }
    
    // 从链表中移除节点
    _removeNode(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    // 将节点移动到链表头部（表示最近使用）
    _moveToFront(node) {
        this._removeNode(node);
        this._addToFront(node);
    }
    
    // 移除链表尾部节点（表示最久未使用）
    _removeTail() {
        const node = this.tail.prev;
        this._removeNode(node);
        return node;
    }
    
    // 获取键对应的值，如果不存在则返回-1
    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        
        // 移动到链表头部表示最近使用
        const node = this.cache.get(key);
        this._moveToFront(node);
        return node.value;
    } 
    
    // 添加或更新键值对
    put(key, value) {
        if (this.cache.has(key)) {
            // 如果键已存在，更新值并移动到链表头部
            const node = this.cache.get(key);
            node.value = value;
            this._moveToFront(node);
        } else {
            // 如果键不存在，创建新节点并添加到链表头部
            const node = new Node(key, value);
            this.cache.set(key, node);
            this._addToFront(node);
            this.size++;
            
            // 如果超出容量，删除链表尾部节点（最久未使用）
            if (this.size > this.capacity) {
                const removed = this._removeTail();
                this.cache.delete(removed.key);
                this.size--;
            }
        }
    }
}

// 使用示例
const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 返回 1
cache.put(3, 3); // 该操作会使 key 2 作废
console.log(cache.get(2)); // 返回 -1 (未找到)
cache.put(4, 4); // 该操作会使 key 1 作废
console.log(cache.get(1)); // 返回 -1 (未找到)
console.log(cache.get(3)); // 返回 3
console.log(cache.get(4)); // 返回 4