/**
 * 433. Minimum Genetic Mutation
 * https://leetcode.com/problems/minimum-genetic-mutation/
 * Level-order BFS from startGene; neighbors are the one-letter changes (A/C/G/T at each of the 8
 * positions) that appear in the bank.
 */
var minMutation = function (startGene, endGene, bank) {
  if (startGene === endGene) return 0;
  const inBank = new Set(bank);
  if (!inBank.has(endGene)) return -1;
  const seen = new Set([startGene]);
  let frontier = [startGene];
  for (let steps = 1; frontier.length; steps++) {
    const next = [];
    for (const gene of frontier) {
      for (let i = 0; i < gene.length; i++) {
        for (const ch of 'ACGT') {
          if (ch === gene[i]) continue;
          const mutated = gene.slice(0, i) + ch + gene.slice(i + 1);
          if (!inBank.has(mutated) || seen.has(mutated)) continue;
          if (mutated === endGene) return steps;
          seen.add(mutated);
          next.push(mutated);
        }
      }
    }
    frontier = next;
  }
  return -1;
};

module.exports = { minMutation };
