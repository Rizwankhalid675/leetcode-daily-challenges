/**
 * 657. Robot Return to Origin
 * https://leetcode.com/problems/robot-return-to-origin/
 * Track net x and y displacement; the robot is back at the origin iff both are zero.
 */
var judgeCircle = function (moves) {
  let x = 0, y = 0;
  for (const m of moves) {
    if (m === 'U') y++;
    else if (m === 'D') y--;
    else if (m === 'R') x++;
    else x--;
  }
  return x === 0 && y === 0;
};

module.exports = { judgeCircle };
