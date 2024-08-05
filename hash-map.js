import Bucket from './bucket.js';

export default class HashMap {
  #buckets;
  #loadFactor;
  #length;

  constructor(loadFactor = 0.75) {
    this.#buckets = Array.from({ length: 16 }, () => new Bucket());
    this.#loadFactor = loadFactor;
    this.#length = 0;
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

  #increaseBuckets() {
    const entries = this.entries();
    this.#buckets = Array.from(
      { length: this.#buckets.length * 2 },
      () => new Bucket(),
    );

    entries.forEach(([key, value]) => {
      const bucket = this.#getBucket(key);

      bucket.append(key, value);
    });
  }

  set(key, value) {
    const bucket = this.#getBucket(key);

    if (bucket.setOrUpdate(key, value)) {
      this.#length += 1;

      if (this.#length > this.#buckets.length * this.#loadFactor) {
        this.#increaseBuckets();
      }
    }
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
    const result = bucket.remove(key);

    if (result) {
      this.#length -= 1;
    }

    return result;
  }

  length() {
    return this.#length;
  }

  clear() {
    this.#buckets = Array.from({ length: 16 }, () => new Bucket());
    this.#length = 0;
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
