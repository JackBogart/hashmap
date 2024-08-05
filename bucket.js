import Node from './node.js';

export default class Bucket {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  #append(key, value) {
    const newNode = new Node(key, value);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  setOrUpdate(key, value) {
    let currentNode = this.head;

    while (currentNode !== null && currentNode.key !== key) {
      currentNode = currentNode.next;
    }

    if (currentNode === null) {
      this.#append(key, value);
    } else {
      currentNode.value = value;
    }
  }

  contains(key) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.key === key) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  find(key) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  remove(key) {
    if (this.head === null) {
      return false;
    } else if (this.head.key === key) {
      this.head = this.head.next;
      this.size -= 1;

      return true;
    }

    let currentNode = this.head;

    while (currentNode.next !== null) {
      if (currentNode.next.key === key) {
        if (currentNode.next === this.tail) {
          this.tail = currentNode;
        }

        currentNode.next = currentNode.next.next;
        this.size -= 1;

        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  keys() {
    let currentNode = this.head;
    const keys = [];

    while (currentNode !== null) {
      keys.push(currentNode.key);
      currentNode = currentNode.next;
    }

    return keys;
  }

  values() {
    let currentNode = this.head;
    const values = [];

    while (currentNode !== null) {
      values.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return values;
  }

  entries() {
    let currentNode = this.head;
    const entries = [];

    while (currentNode !== null) {
      entries.push([currentNode.key, currentNode.value]);
      currentNode = currentNode.next;
    }

    return entries;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size) return null;

    if (index === 0) {
      this.prepend(value);
    } else if (index === this.size) {
      this.append(value);
    } else {
      let currentNode = this.head;

      for (let position = 1; position < index; position++) {
        currentNode = currentNode.next;
      }

      let newNode = new Node(value, currentNode.next);
      currentNode.next = newNode;
      this.size += 1;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) return null;

    if (index === 0) {
      this.head = this.head.next;
    } else {
      let currentNode = this.head;

      for (let position = 1; position < index; position++) {
        currentNode = currentNode.next;
      }

      if (currentNode.next === this.tail) {
        this.tail = currentNode;
      }
      currentNode.next = currentNode.next.next;
    }

    this.size -= 1;
  }

  toString() {
    let currentNode = this.head;
    let outputStr = '';

    while (currentNode !== null) {
      outputStr += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    outputStr += 'null';

    return outputStr;
  }
}
