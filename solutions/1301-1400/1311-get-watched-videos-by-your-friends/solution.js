/**
 * 1311. Get Watched Videos by Your Friends
 * https://leetcode.com/problems/get-watched-videos-by-your-friends/
 * Level-by-level BFS from id for exactly `level` rounds; tally videos of the final frontier and sort by (frequency, name) with a plain < comparator.
 */
var watchedVideosByFriends = function (watchedVideos, friends, id, level) {
  const n = friends.length;
  const seen = new Uint8Array(n);
  seen[id] = 1;
  let frontier = [id];
  for (let d = 0; d < level && frontier.length; d++) {
    const next = [];
    for (const u of frontier) {
      for (const v of friends[u]) {
        if (!seen[v]) {
          seen[v] = 1;
          next.push(v);
        }
      }
    }
    frontier = next;
  }
  const freq = new Map();
  for (const p of frontier) {
    for (const vid of watchedVideos[p]) freq.set(vid, (freq.get(vid) || 0) + 1);
  }
  return [...freq.keys()].sort((a, b) => {
    const fa = freq.get(a), fb = freq.get(b);
    if (fa !== fb) return fa - fb;
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

module.exports = { watchedVideosByFriends };
