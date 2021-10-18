const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
 module.exports = class Queue {
  constructor() {
    this.list = null
  }


  enqueue(element) {
    let node = new ListNode(element) 
      if (this.list === null) {
        this.list = node
      } else {
        let end = this.list
        while(end.next !== null) {
          end = end.next
        }
        end.next = new ListNode(element)
      }
  }

  dequeue() {
    let value = this.list.value;
    this.list = this.list.next;
    return value;
  }

  getUnderlyingList() {
    return this.list
  }
}


