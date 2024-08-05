import Bucket from './bucket.js';

export default class HashSet {
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
    const keys = this.keys();
    this.#buckets = Array.from(
      { length: this.#buckets.length * 2 },
      () => new Bucket(),
    );

    keys.forEach((key) => {
      const bucket = this.#getBucket(key);

      bucket.append(key, null);
    });
  }

  set(key) {
    const bucket = this.#getBucket(key);

    if (bucket.setOrUpdate(key, null)) {
      this.#length += 1;

      if (this.#length > this.#buckets.length * this.#loadFactor) {
        this.#increaseBuckets();
      }
    }
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

  toString() {
    let buckets = [];

    this.#buckets.forEach((bucket) => {
      buckets.push(`${bucket.toStringKey()}`);
    });

    return buckets.join('\n');
  }
}
