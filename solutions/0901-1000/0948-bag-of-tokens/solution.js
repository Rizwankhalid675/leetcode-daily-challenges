/**
 * 948. Bag of Tokens
 * https://leetcode.com/problems/bag-of-tokens/
 * Sort tokens. Greedily buy score with the cheapest token (face-up); when stuck, sell one score for the most expensive token (face-down). Track the best score seen, since the last sale might not pay off.
 */
var bagOfTokensScore = function (tokens, power) {
  const t = [...tokens].sort((a, b) => a - b);
  let lo = 0;
  let hi = t.length - 1;
  let score = 0;
  let best = 0;
  while (lo <= hi) {
    if (power >= t[lo]) {
      power -= t[lo++];
      score++;
      if (score > best) best = score;
    } else if (score > 0 && lo < hi) {
      power += t[hi--];
      score--;
    } else {
      break;
    }
  }
  return best;
};

module.exports = { bagOfTokensScore };
