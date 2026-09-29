# 212. Word Search II

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, string, backtracking, trie, matrix |
| Link | https://leetcode.com/problems/word-search-ii/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Given a letter grid and a list of words, return every word that can be traced through adjacent (up/down/left/right) cells without reusing a cell.

## Approach
Searching each word separately repeats a lot of work, so search all words at once:
1. Build a trie from the words; the node where a word ends stores the word.
2. From every cell, backtrack through the grid while following trie edges. Stop as soon as the current prefix isn't in the trie.
3. When a node holding a word is reached, record it and clear it (no duplicates).
4. **Pruning:** after exploring from a node, if it holds no word and has no children, delete it from its parent. Branches whose words were all found disappear, which matters a lot on repetitive boards.

Visited cells are marked by temporarily overwriting them with `#` and restored afterwards.

## Key constraints
- Board up to 12x12, up to 3·10⁴ words of length ≤ 10, so recursion depth is at most 11.

## Edge cases
- The same word could be traced from several starting cells: clearing `node.word` reports it once.
- Reusing a cell is not allowed (`[['a','a']]` does not contain "aaa").

## Complexity
- Time: O(m·n·4·3^(L−1)) worst case for L = 10, much less in practice with trie pruning
- Space: O(total letters in words) for the trie

## Testing note
Random small boards over a 3-letter alphabet, checked against a separate per-word backtracking search; the tests also verify the board is left unchanged. A 12x12 / 30,000-word case checks the running time. Results are compared after sorting (any order is accepted).

## Reusable pattern
**Trie-guided backtracking with leaf pruning** for multi-pattern grid search.
