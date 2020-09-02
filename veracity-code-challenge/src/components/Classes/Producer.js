/** @format */

import PriorityQueue from './PriorityQueue';

class Producer {
  constructor() {
    this.collection = [];
  }
  /**
   * Producer should create objects that denote a type (i.e. file, console) as * well as some string payload i.e. “file”, “I am some data”
   */
  createObjectList(data) {
    const newQueue = [];
    data.map((element) => {
      const consumer = {
        type: '',
        payload: '',
        priority: 1,
      };
      const type = element.data.Type;
      let payload = element.data.Payload;
      if (type !== '') {
        payload = payload.replace(` ${type}`, '');
        consumer.type = type;
        consumer.payload = payload;
        newQueue.push(consumer);
      }
    });
    return newQueue;
  }

  /**
   *Producer should place created objects into a single generic queue
   */
  priorityQueue(mutableQueue) {
    const priorityQueue = new PriorityQueue();
    for (let element of mutableQueue) {
      priorityQueue.enqueue(element);
    }
    this.collection = priorityQueue.collection;
  }

  static timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }
}

export default Producer;
