import { HashMap } from './hashmap.js';

function printHashTable(hashTable) {
  const formatFn = (nodeObj) => {
    return `[${nodeObj.key}, ${nodeObj.value} ]`;
  };

  hashTable.forEach((bucket, index) => {
    if (!bucket) return;
    const bucketString = bucket.toString(formatFn);
    console.log(`${index}: ${bucketString}`);
  });
}

function testOne() {
  const test = new HashMap();
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

  console.log('hashTable: ');
  printHashTable(test.hashTable);
  console.log('');

  console.log('get apple: ' + test.get('apple'));
  console.log('get fat dragon: ' + test.get('fat dragon'));
  console.log("has 'apple': " + test.has('apple'));
  console.log("has 'fat dragon': " + test.has('fat dragon'));
  console.log('length: ' + test.length());
  console.log("remove 'apple': " + test.remove('apple'));
  console.log("remove 'fat dragon': " + test.remove('fat dragon'));

  console.log('hashTable: ');
  printHashTable(test.hashTable);
  console.log('');

  console.log('length after remove: ' + test.length());
  console.log(`keys array: [${test.keys()}]`);
  console.log(`values array: [${test.values()}]`);
  console.log(`entries array: [${test.entries()}]`);
  test.clear();
  console.log('length after clear: ' + test.length());
  console.log('hashTable: ');
  printHashTable(test.hashTable);
  console.log('');
}

function testTwo() {
  const test = new HashMap();
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
  test.set('moon', 'silver'); //this causes hashTable to expand

  console.log('hashTable: ');
  printHashTable(test.hashTable);
  console.log('');

  console.log('get apple: ' + test.get('apple'));
  console.log('get fat dragon: ' + test.get('fat dragon'));
  console.log("has 'apple': " + test.has('apple'));
  console.log("has 'fat dragon': " + test.has('fat dragon'));
  console.log('length: ' + test.length());
  console.log("remove 'apple': " + test.remove('apple'));
  console.log("remove 'fat dragon': " + test.remove('fat dragon'));

  console.log('hashTable: ');
  printHashTable(test.hashTable);
  console.log('');

  console.log('length after remove: ' + test.length());
  console.log(`keys array: [${test.keys()}]`);
  console.log(`values array: [${test.values()}]`);
  console.log(`entries array: [${test.entries()}]`);
  test.clear();
  console.log('length after clear: ' + test.length());
  console.log('hashTable: ');
  printHashTable(test.hashTable);
  console.log('');
}

testTwo();

