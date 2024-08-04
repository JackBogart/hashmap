import HashMap from "./hashmap.js";

const testMap = new HashMap();

testMap.set('Carlos', 'Test')
testMap.toString();

testMap.set('Carlos', 'Update')
testMap.toString();

testMap.set('Carloc', 'Same hash')
testMap.toString();

testMap.set('Carloc', 'Updated same hash')
testMap.toString();