/**
 * 355. Design Twitter
 * https://leetcode.com/problems/design-twitter/
 * Each user keeps a time-ordered tweet list and a followee Set. The feed scans the newest (at most 10) tweets of the user and each followee, keeping a sorted top-10 and stopping a user early once their tweets are older than the current 10th.
 */
var Twitter = function () {
  this.time = 0;
  this.tweets = new Map(); // user -> [[time, tweetId], ...] oldest first
  this.follows = new Map(); // user -> Set of followees
};
Twitter.prototype.postTweet = function (userId, tweetId) {
  let a = this.tweets.get(userId);
  if (!a) {
    a = [];
    this.tweets.set(userId, a);
  }
  a.push([this.time++, tweetId]);
};
Twitter.prototype.getNewsFeed = function (userId) {
  const users = [userId];
  const f = this.follows.get(userId);
  if (f) for (const v of f) if (v !== userId) users.push(v);
  const top = []; // newest first, at most 10
  for (const u of users) {
    const a = this.tweets.get(u);
    if (!a) continue;
    for (let j = a.length - 1; j >= 0 && j >= a.length - 10; j--) {
      const t = a[j];
      if (top.length === 10 && t[0] < top[9][0]) break;
      let k = top.length;
      top.push(t);
      while (k > 0 && top[k - 1][0] < t[0]) {
        top[k] = top[k - 1];
        k--;
      }
      top[k] = t;
      if (top.length > 10) top.pop();
    }
  }
  return top.map((t) => t[1]);
};
Twitter.prototype.follow = function (followerId, followeeId) {
  let s = this.follows.get(followerId);
  if (!s) {
    s = new Set();
    this.follows.set(followerId, s);
  }
  s.add(followeeId);
};
Twitter.prototype.unfollow = function (followerId, followeeId) {
  const s = this.follows.get(followerId);
  if (s) s.delete(followeeId);
};

module.exports = { Twitter };
