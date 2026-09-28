/**
 * 649. Dota2 Senate
 * https://leetcode.com/problems/dota2-senate/
 *
 * Optimal play: each senator bans the NEXT opposing senator who would act (the soonest
 * threat). Model the turn order with two queues of positions. The earlier position acts,
 * bans the other party's front senator, and re-enters the queue for the next round at
 * position + n.
 *
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  const n = senate.length;
  const radiant = [];
  const dire = [];
  for (let i = 0; i < n; i++) (senate[i] === 'R' ? radiant : dire).push(i);
  let r = 0; // head indices (queues as arrays + moving heads)
  let d = 0;
  while (r < radiant.length && d < dire.length) {
    const ri = radiant[r++];
    const di = dire[d++];
    if (ri < di) radiant.push(ri + n); // R acts first, bans D, and gets another turn next round
    else dire.push(di + n);
  }
  return r < radiant.length ? 'Radiant' : 'Dire';
};

module.exports = { predictPartyVictory };
