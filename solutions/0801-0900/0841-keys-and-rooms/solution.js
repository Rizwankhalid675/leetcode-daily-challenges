/**
 * 841. Keys and Rooms
 * https://leetcode.com/problems/keys-and-rooms/
 *
 * Graph reachability from room 0: rooms are nodes, keys are directed edges.
 * Iterative DFS; all rooms are visitable iff every node is reached.
 *
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  const visited = new Array(rooms.length).fill(false);
  visited[0] = true;
  let count = 1;
  const stack = [0];
  while (stack.length > 0) {
    for (const key of rooms[stack.pop()]) {
      if (!visited[key]) {
        visited[key] = true;
        count++;
        stack.push(key);
      }
    }
  }
  return count === rooms.length;
};

module.exports = { canVisitAllRooms };
