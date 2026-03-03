import { LinkedList } from "./linked-list.js";
import { Node } from "./node.js";

class HashMap {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.hashTable = new Array(this.capacity).fill(null);
    this.size = 0;
    //I include a size property because everytime a key is inserted, size must be compared to (capacity * loadFactor)
    //without the size property, set() would need to iterate through the entire hashTable to find all the entries,
    //which causes insert to have a time complexity of O(n) instead of O(1).
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
    let bucket = this.hashTable[hashCode];
    //If the bucket is empty, assign it to a new linked list.
    if (!bucket) {
      bucket = new LinkedList();
      bucket.append({ key: key, value: value });
      this.hashTable[hashCode] = bucket;
      this.size++;
      if (this.size > this.capacity * this.loadFactor) this.expandHashTable();
      return;
      // console.log(list);
    }

    //Check if the key already exists in the linked list.
    let currNode = bucket.listHead;
    let nodeData = currNode.value;
    while (currNode.nextNode !== null && nodeData.key !== key) {
      currNode = currNode.nextNode;
      nodeData = currNode.value;
    }
    //If key already exists, replace its value.
    if (nodeData.key === key) {
      nodeData.value = value;
    } else {
      //If not, add it to the end of the list
      const newData = { key: key, value: value };
      currNode.nextNode = new Node(newData);
      this.size += 1;
      //Check if the hashTable is over capacity.
      if (this.size > this.capacity * this.loadFactor) this.expandHashTable();
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.hashTable[hashCode];

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
    const bucket = this.hashTable[hashCode];

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
    const bucket = this.hashTable[hashCode];

    if (!bucket) return false;

    if (bucket.listHead.nextNode === null) {
      this.size--;
      this.hashTable[hashCode] = null;
      return true;
    }

    if (bucket.listHead.value.key === key) {
      bucket.listHead = bucket.listHead.nextNode;
      this.size--;
      return true;
    }

    let currNode = bucket.listHead;
    let currNodeTail = bucket.listHead;
    //check if currNode is already
    while (currNode !== null) {
      let data = currNode.value;
      if (data.key === key) {
        currNodeTail.nextNode = currNode.nextNode;
        this.size--;
        return true;
      }
      currNodeTail = currNode;
      currNode = currNode.nextNode;
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.capacity = 16;
    this.hashTable = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  keys() {
    let keysArray = [];
    this.hashTable.forEach((bucket) => {
      if (!bucket)
        return;
      let currNode = bucket.listHead;
      while (currNode !== null) {
        const data = currNode.value;
        keysArray.push(data.key);
        currNode = currNode.nextNode;
      }
    });

    return keysArray;
  }

  values() {
    let valuesArray = [];
    this.hashTable.forEach((bucket) => {
      if (!bucket)
        return;
      let currNode = bucket.listHead;
      while (currNode !== null) {
        const data = currNode.value;
        valuesArray.push(data.value);
        currNode = currNode.nextNode;
      }
    });

    return valuesArray;
  }

  entries() {
    let entriesArray = [];
    this.hashTable.forEach((bucket) => {
      if (!bucket)
        return;
      let currNode = bucket.listHead;
      while (currNode !== null) {
        const data = currNode.value;
        entriesArray.push([data.key, data.value]);
        currNode = currNode.nextNode;
      }
    });

    return entriesArray;
  }

  expandHashTable() {
    //create a new array that is double its capacity,
    this.capacity = this.capacity * 2;
    const newHashTable = new Array(this.capacity);
    //then re-hash all keys and place into the new array
    this.hashTable.forEach((bucket) => {
      if (!bucket)
        return;
      const data = bucket.listHead.value;
      const newHashCode = this.hash(data.key);
      newHashTable[newHashCode] = bucket;
    });
    this.hashTable = newHashTable;
  }
}

export {HashMap}