import HashMap from './hashmap.js';

const testMap = new HashMap();

console.log(testMap.length());

testMap.set('Carlos', 'Test');
console.log(testMap.toString());

testMap.set('Carlos', 'Update');
console.log(testMap.toString());

console.log(testMap.length());

testMap.set('Carloc', 'Same hash');
console.log(testMap.toString());

testMap.set('Carloc', 'Updated same hash');
testMap.set('Carlds', 'Third ele');

console.log(testMap.toString());

console.log(testMap.get('Carlo'));
console.log(testMap.get('Carlos'));
console.log(testMap.length());

console.log(testMap.keys());
console.log(testMap.values());

testMap.remove('Carlos');
console.log(testMap.length());
testMap.remove('Carloc');
console.log(testMap.toString());

console.log(testMap.keys());
console.log(testMap.values());

console.log(testMap.get('Carlos'));

console.log(testMap.length());

testMap.set('Carlos', 'Update');
console.log(testMap.toString());

testMap.set('Carloc', 'Same hash');
console.log(testMap.toString());
console.log(testMap.length());

console.log(testMap.keys());
console.log(testMap.values());
testMap.clear();
console.log(testMap.toString());
console.log(testMap.length());

testMap.set('Carlos', 'Update');
console.log(testMap.toString());

console.log(testMap.keys());
console.log(testMap.values());
