const test = require('node:test');
const assert = require('node:assert');
const { Twitter } = require('./solution');

class RefTwitter {
  constructor() { this.all = []; this.f = new Map(); }
  postTweet(u, id) { this.all.push([u, id]); }
  getNewsFeed(u) {
    const fs = this.f.get(u) || new Set();
    return this.all.filter(([w]) => w === u || fs.has(w)).slice(-10).reverse().map((x) => x[1]);
  }
  follow(a, b) { if (!this.f.has(a)) this.f.set(a, new Set()); this.f.get(a).add(b); }
  unfollow(a, b) { if (this.f.has(a)) this.f.get(a).delete(b); }
}

test('official example', () => {
  const tw = new Twitter();
  tw.postTweet(1, 5);
  assert.deepStrictEqual(tw.getNewsFeed(1), [5]);
  tw.follow(1, 2);
  tw.postTweet(2, 6);
  assert.deepStrictEqual(tw.getNewsFeed(1), [6, 5]);
  tw.unfollow(1, 2);
  assert.deepStrictEqual(tw.getNewsFeed(1), [5]);
});

test('matches a brute-force global timeline', () => {
  for (let t = 0; t < 200; t++) {
    const tw = new Twitter();
    const ref = new RefTwitter();
    let nextId = 0;
    for (let op = 0; op < 150; op++) {
      const a = 1 + Math.floor(Math.random() * 4);
      let b = 1 + Math.floor(Math.random() * 4);
      if (b === a) b = (b % 4) + 1;
      const r = Math.random();
      if (r < 0.45) { tw.postTweet(a, nextId); ref.postTweet(a, nextId); nextId++; }
      else if (r < 0.65) { tw.follow(a, b); ref.follow(a, b); }
      else if (r < 0.75) { tw.unfollow(a, b); ref.unfollow(a, b); }
      else assert.deepStrictEqual(tw.getNewsFeed(a), ref.getNewsFeed(a));
    }
  }
});

test('3e4 calls with 500 followees run fast', () => {
  const tw = new Twitter();
  for (let u = 2; u <= 500; u++) tw.follow(1, u);
  const start = Date.now();
  for (let i = 0; i < 30000; i++) {
    if (i & 1) tw.getNewsFeed(1);
    else tw.postTweet(1 + (i % 500), i);
  }
  assert.ok(Date.now() - start < 1000);
});
