/**
 * 1700. Number of Students Unable to Eat Lunch
 * https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/
 * Queue order doesn't matter: a sandwich is taken as long as someone still wants its type. Stop at the first sandwich nobody wants.
 */
var countStudents = function (students, sandwiches) {
  const want = [0, 0];
  for (const s of students) want[s]++;
  for (let i = 0; i < sandwiches.length; i++) {
    if (want[sandwiches[i]] === 0) return sandwiches.length - i;
    want[sandwiches[i]]--;
  }
  return 0;
};

module.exports = { countStudents };
