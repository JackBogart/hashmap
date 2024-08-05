import HashMap from './hashmap.js';

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

console.log(test.toString(), '\n');

test.set('lion', 'cyan');
console.log(test.toString(), '\n');

test.set('moon', 'silver');
console.log(test.toString(), '\n');
test.set('moon', 'cheese');
console.log(test.toString(), '\n');

console.log(test.get('dog'));
console.log(test.has('dog'));
console.log(test.remove('dog'));

console.log(test.toString());
console.log(test.length());

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.clear();
console.log(test.toString());
