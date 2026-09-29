/**
 * 682. Baseball Game
 * https://leetcode.com/problems/baseball-game/
 * Stack of scores: integers push, "+" pushes the sum of the top two, "D" doubles the top, "C" pops. Answer is the stack sum.
 */
var calPoints = function (operations) {
  const st = [];
  for (const op of operations) {
    if (op === '+') st.push(st[st.length - 1] + st[st.length - 2]);
    else if (op === 'D') st.push(2 * st[st.length - 1]);
    else if (op === 'C') st.pop();
    else st.push(Number(op));
  }
  let sum = 0;
  for (const x of st) sum += x;
  return sum;
};

module.exports = { calPoints };
