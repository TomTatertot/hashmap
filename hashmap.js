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
      if (formatFn) result += `(${formatFn(currNode.value)}) -> `;
      else result += `( ${currNode.value} ) -> `;
      currNode = currNode.nextNode;
    }
    result += 'null';
    return result;
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.hashTable = new Array(capacity);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      // console.log(hashCode);
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    let list = this.hashTable[hashCode];
    //If the bucket is empty, assign it to a new linked list.
    if (!list) {
      list = new LinkedList();
      list.append({ key: key, value: value });
      this.hashTable[hashCode] = list;
      return;
      // console.log(list);
    }

    //Check if the key already exists in the linked list.
    let currNode = list.listHead;
    let nodeData = currNode.value;
    while (currNode.nextNode !== null && nodeData.key !== key) {
      currNode = currNode.nextNode;
    }
    if (nodeData.key === key) {
      nodeData.value = value;
    } else {
      //If not, add it to the end of the list
      const newData = { key: key, value: value };
      currNode.nextNode = new Node(newData);
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = hashTable[hashCode];

    if (!bucket) return null;

    let currNode = bucket.listHead;
    while (currNode !== null) {
      let data = currNode.value;
      if (data.key === key) return data.value;
      currNode = currNode.nextNode;
    }
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = hashTable[hashCode];

    if (!bucket) return false;

    let currNode = bucket.listHead;
    while (currNode !== null) {
      let data = currNode.value;
      if (data.key === key) {
        return true;
      }
      currNode = currNode.nextNode;
    }

    return false;
  }
  remove(key) {
    const hashCode = this.hash(key);
    const bucket = hashTable[hashCode];

    if (!bucket) return false;

    if (bucket.listHead.nextNode === null) {
      bucket.listHead = null;
      return;
    }

    let currNode = bucket.listHead;
    let currNodeTail = bucket.listHead;
    //check if currNode is already
    while (currNode !== null) {
      let data = currNode.value;
      if (data.key === key) {
        currNodeTail = currNode.nextNode;
        return true;
      }
      currNodeTail = currNode;
      currNode = currNode.nextNode;
    }

    return false;
  }

  length() {
    let length = 0;
    this.hashTable.forEach((bucket) => {
      let currNode = bucket.listHead;
      while (currNode !== null) {
        length++;
        currNode = currNode.nextNode;
      }
    });
    return length;
  }

  clear(){
    this.hashTable.forEach((bucket) => {
      bucket.listHead = null;
    });
  }
}

const test = new HashMap();
// console.log(test.hash("apple"));
// map.set('apple', 'red');
// map.set('apple', 'blue');
// map.set('blueberry', 'blue');
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('kite', 'blue');

const hashTable = test.hashTable;
hashTable.forEach((bucket) => {
  console.log(
    bucket.toString((nodeObj) => {
      return `[${nodeObj.key}, ${nodeObj.value} ]`;
    }),
  );
});

console.log(test.get('kite'));
console.log(test.has('lion'));
console.log(test.length());
test.clear();

console.log(test.hashTable);
console.log(test.length());

