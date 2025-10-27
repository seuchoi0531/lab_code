const util = require("util");

class MySet {
  constructor(iterable) {
    this.capacity = 4;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.count = 0;
    this.objIds = new WeakMap();
    this.nextId = 1;

    if (iterable && Symbol.iterator in Object(iterable)) {
      for (let item of iterable) {
        this.add(item);
      }
    }
  }

  _hash(value) {
    if (typeof value === "number")
      return Math.abs(value % this.capacity);
    else if (typeof value === "BigInt")
      return Math.abs(Number(value % BigInt(this.capacity)));
    else if (value === undefined)
      return 0;
    else if (value === null)
      return 1;
    else if (typeof value === "boolean")
      return +value;
    else if (typeof value === "string") {
      let hash = 0;
      for (let i = 0; i < value.length; i++) {
        hash = (hash * 31 + value.charCodeAt(i)) % this.capacity;
      }
      return hash;
    } else {
      if (!this.objIds.has(value)) {
        this.objIds.set(value, this.nextId++);
      }
      return this.objIds.get(value) % this.capacity;
    }
  }

  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.count = 0;
    for (let oldBucket of oldBuckets) {
      for (let value of oldBucket) {
        this.add(value);
      }
    }
  }

  add(value) {
    const index = this._hash(value);
    const bucket = this.buckets[index];
    if (!bucket.includes(value)) {
      bucket.push(value);
      this.count++;
      if (this.count / this.capacity > 0.75) {
        this._resize();
      }
    }
    return this;
  }

  has(value) {
    const index = this._hash(value);
    const bucket = this.buckets[index];
    return bucket.includes(value);
  }

  delete(value) {
    const index = this._hash(value);
    const bucket = this.buckets[index];
    const pos = bucket.indexOf(value);
    if (pos !== -1) {
      bucket.splice(pos, 1);
      this.count--;
    }
    return undefined;
  }
  get size() {
    return this.count;
  }

  toString() {
    const values = [];
    for (let bucket of this.buckets) {
      for (let value of bucket) {
        values.push(value);
      }
    }
    return `MySet { ${values.join(", ")} }`;
  }

  [util.inspect.custom](depth, { colors }) {
    const values = [];
    for (let bucket of this.buckets) {
      for (let value of bucket) {
        values.push(value);
      }
    }
    const str = `MySet { ${values.join(", ")} }`

    if (colors) {
      return `\x1b[32m${str}\x1b[0m`;
    }

    return str;
  }
}

const myset = new MySet();
console.log(myset.size);
myset.add(1);
console.log(myset.toString());
myset.add(2);
console.log(myset.toString());
console.log(myset);

console.log("\x1b[31mHello World\x1b[0m");


// const originalError = console.error;

// console.error = (...args) => {
//   const processed = args.map(arg => {
//     if (arg instanceof Error) {
//       return `\x1b[31m${arg.stack}\x1b[0m`;
//     }
//     return `\x1b[31m${arg}\x1b[0m`;
//   });
//   originalError(...processed);
// };

const originalError = console.error;

console.error = (...args) => {
  const processed = args.map(arg => {
    if (arg instanceof Error) {
      const lines = arg.stack.split("\n");
      const coloredLines = lines.map(line => {
        const trimmed = line.trim();

        // Node.js 내부 줄
        if (trimmed.includes("node:")) {
          return `\x1b[33m${line}\x1b[0m`; // 노랑
        }

        // 나머지 줄 → 내 코드로 가정
        return `\x1b[31m${line}\x1b[0m`; // 초록
      });

      return coloredLines.join("\n");
    }

    // 일반 메시지 → 빨강
    return `\x1b[31m${arg}\x1b[0m`;
  });

  originalError(...processed);
};

// 테스트
console.error(new Error("test error"));
console.error("Some message");



console.error("This is error");
console.error("a", "b", "c");
console.error(new Error("a"));
