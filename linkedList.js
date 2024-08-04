import Node from './node.js';

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }

    this.size += 1;
  }

  prepend(value) {
    const newNode = new Node(value);

    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.nextNode = this.head;
      this.head = newNode;
    }

    this.size += 1;
  }

  at(index) {
    if (index < 0 || index >= this.size) return null;

    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.nextNode;
    }

    return currentNode;
  }

  get(key, position) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value[position] === key) {
        return currentNode;
      }
      currentNode = currentNode.nextNode;
    }

    return null;
  }

  pop() {
    if (this.size === 0) return;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;
      while (currentNode.nextNode !== this.tail) {
        currentNode = currentNode.nextNode;
      }

      this.tail = currentNode;
      currentNode.nextNode = null;
    }

    this.size -= 1;
  }

  contains(value) {
    let currentNode = this.head;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currentNode = this.head;
    let index = 0;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return index;
      }
      currentNode = currentNode.nextNode;
      index += 1;
    }

    return null;
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
        currentNode = currentNode.nextNode;
      }

      let newNode = new Node(value, currentNode.nextNode);
      currentNode.nextNode = newNode;
      this.size += 1;
    }
  }

  removeAt(index) {
    if (index < 0 || index >= this.size) return null;

    if (index === 0) {
      this.head = this.head.nextNode;
    } else {
      let currentNode = this.head;

      for (let position = 1; position < index; position++) {
        currentNode = currentNode.nextNode;
      }

      if (currentNode.nextNode === this.tail) {
        this.tail = currentNode;
      }
      currentNode.nextNode = currentNode.nextNode.nextNode;
    }

    this.size -= 1;
  }

  toString() {
    let currentNode = this.head;
    let outputStr = '';

    while (currentNode !== null) {
      outputStr += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.nextNode;
    }
    outputStr += 'null';

    return outputStr;
  }
}
