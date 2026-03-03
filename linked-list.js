import {Node} from "./node.js"
class LinkedList {
  constructor() {
    this.listHead = null;
  }

  append(value) {
    if (!this.listHead) {
      this.listHead = new Node(value);
      return;
    }

    let currNode = this.listHead;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }
    currNode.nextNode = new Node(value);
  }

  prepend(value) {
    if (!this.listHead) {
      this.listHead = new Node(value);
      return;
    }

    const newNode = new Node(value);
    newNode.nextNode = this.listHead;
    this.listHead = newNode;
  }

  size() {
    let size = 0;
    let currNode = this.listHead;
    while (currNode) {
      size++;
      currNode = currNode.nextNode;
    }

    return size;
  }

  at(index) {
    let currIndex = 0;
    let currNode = this.listHead;
    while (currNode) {
      if (currIndex === index) return currNode.value;
      currIndex++;
      currNode = currNode.nextNode;
    }
  }

  nodeAt(index) {
    let currIndex = 0;
    let currNode = this.listHead;
    while (currNode) {
      if (currIndex === index) return currNode;
      currIndex++;
      currNode = currNode.nextNode;
    }
    return null;
  }

  pop() {
    if (!this.listHead) return;

    const headValue = this.listHead.value;
    this.listHead = this.listHead.nextNode;
    return headValue;
  }

  contains(value) {
    let currNode = this.listHead;
    while (currNode) {
      if (currNode.value === value) return true;
      currNode = currNode.nextNode;
    }
    return false;
  }

  findIndex(value) {
    let currNode = this.listHead;
    let currIndex = 0;
    while (currNode) {
      if (currNode.value === value) return currIndex;
      currNode = currNode.nextNode;
      currIndex++;
    }

    return -1;
  }

  update(index, value) {
    const node = nodeAt(index);
    if (!node) return;
    node.value = value;
  }

  insertAt(index, ...values) {
    if (index < 0 || values.length < 0) return;

    let currIndex = 0;
    let nodeBeforeIndex = this.listHead;
    let nodeAtIndex = this.listHead;

    while (currIndex !== index) {
      //if node is out of bounds
      if (nodeAtIndex === null) throw new RangeError('Index out of bounds');
      currIndex++;
      nodeBeforeIndex = nodeAtIndex;
      nodeAtIndex = nodeAtIndex.nextNode;
    }

    let currInsertNode = new Node(values[0]);
    if (index === 0) {
      this.listHead = currInsertNode;
    } else {
      nodeBeforeIndex.nextNode = currInsertNode;
    }
    for (let i = 1; i < values.length; i++) {
      currInsertNode.nextNode = new Node(values[i]);
      currInsertNode = currInsertNode.nextNode;
    }

    currInsertNode.nextNode = nodeAtIndex;

    return;
  }

  removeAt(index) {
    if (!this.nodeAt(index)) throw new RangeError('Index out of bounds');

    if (index === 0) {
      this.listHead = this.listHead.nextNode;
      return;
    }

    let currIndex = 1;
    let beforeNodeAtIndex = this.listHead;
    let nodeAtIndex = this.listHead.nextNode;
    while (currIndex !== index) {
      currIndex++;
      beforeNodeAtIndex = beforeNodeAtIndex.nextNode;
      nodeAtIndex = nodeAtIndex.nextNode;
    }
    beforeNodeAtIndex.nextNode = nodeAtIndex.nextNode;
  }

  get head() {
    if (this.listHead === null) return;

    return this.listHead.value;
  }

  get tail() {
    if (!this.listHead) return;

    let currNode = this.listHead;
    while (currNode.nextNode !== null) {
      currNode = currNode.nextNode;
    }

    return currNode.value;
  }

  toString(formatFn) {
    if (!this.listHead) return ' ';

    let result = '';
    let currNode = this.listHead;

    while (currNode !== null) {
      if (formatFn) result += `${formatFn(currNode.value)} -> `;
      else result += `( ${currNode.value} ) -> `;
      currNode = currNode.nextNode;
    }
    result += 'null';
    return result;
  }
}

export{LinkedList}