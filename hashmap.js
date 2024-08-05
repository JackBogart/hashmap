import Bucket from './bucket.js';

export default class HashMap {
  #buckets;

  constructor() {
    this.#buckets = Array.from({ length: 16 }, () => new Bucket());
  }

  #validateBucketIndex(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error('Trying to access index out of bound');
    }
  }

  #getBucket(key) {
    const hashCode = this.#hash(key);

    this.#validateBucketIndex(hashCode);
    return this.#buckets[hashCode];
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.#buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    const bucket = this.#getBucket(key);

    bucket.setOrUpdate(key, value);
  }

  get(key) {
    const bucket = this.#getBucket(key);

    return bucket.find(key);
  }

  has(key) {
    const bucket = this.#getBucket(key);

    return bucket.contains(key);
  }

  remove(key) {
    const bucket = this.#getBucket(key);

    return bucket.remove(key);
  }

  length() {
    return this.#buckets.reduce(
      (accumulator, currentValue) => accumulator + currentValue.size,
      0,
    );
  }

  clear() {
    this.#buckets.forEach((bucket) => {
      bucket.head = null;
      bucket.tail = null;
      bucket.size = 0;
    });
  }

  keys() {
    return this.#buckets.flatMap((bucket) => bucket.keys());
  }

  values() {
    return this.#buckets.flatMap((bucket) => bucket.values());
  }

  entries() {
    return this.#buckets.flatMap((bucket) => bucket.entries());
  }

  toString() {
    let buckets = [];

    this.#buckets.forEach((bucket) => {
      buckets.push(`${bucket.toString()}`);
    });

    return buckets.join('\n');
  }
}
