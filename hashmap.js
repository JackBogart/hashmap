import LinkedList from "./linkedList.js";

export default class HashMap{
  #buckets;

  constructor(capacity=16){
    this.#buckets = Array.from({length: capacity}, () => new LinkedList())
  }

  #validateBucketIndex(index){
    if(index < 0 || index >= this.#buckets.length){
      throw new Error('Trying to access index out of bound');
    }
  }

  #getBucket(hashCode) {
    this.#validateBucketIndex(hashCode);
    return this.#buckets[hashCode];
  }

  #hash(key){
    let hashCode = 0;
    
    const primeNumber = 31;
    for(let i = 0; i < key.length; i++){
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#buckets.length;
    }
  
    return hashCode;
  }

  set(key, value){
    const hashCode = this.#hash(key);
    const bucket = this.#getBucket(hashCode);
    const node = bucket.get(key, 0);

    if(node === null){
      bucket.append([key, value]);
    } else{
      node.value = [key, value]
    }
  }

  toString(){
    for(const bucket of this.#buckets){
      if(bucket !== null){
        console.log(bucket.toString())
      }
    }
  }
}