/**
 * 1041. Robot Bounded In Circle
 * https://leetcode.com/problems/robot-bounded-in-circle/
 * Simulate the instructions once: the robot stays in a circle iff it is back at the origin or no longer facing north.
 */
var isRobotBounded = function (instructions) {
  const dx = [0, 1, 0, -1], dy = [1, 0, -1, 0]; // N, E, S, W
  let x = 0, y = 0, d = 0;
  for (const ch of instructions) {
    if (ch === 'G') {
      x += dx[d];
      y += dy[d];
    } else if (ch === 'L') d = (d + 3) % 4;
    else d = (d + 1) % 4;
  }
  return (x === 0 && y === 0) || d !== 0;
};

module.exports = { isRobotBounded };
