# 127. Word Ladder

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, string, breadth-first-search, bidirectional-search |
| Link | https://leetcode.com/problems/word-ladder/ |
| Context | Quest: 2026 Spring Sprint / Week 2: Challenge / Interview Benchmark III (quiz) |

## What it asks (own words)
Find the shortest chain of words from beginWord to endWord where each step changes exactly one letter, and every word after the first must come from the list. Return the number of words in the chain, or 0 if there is none.

## Key constraints
- Up to 5000 words of length up to 10, all distinct. beginWord differs from endWord and may or may not be in the list.

## Approach
Level-by-level BFS. For each word in the frontier, try all 26 letters at each position and look the result up in a Set. Deleting a word from the Set the first time it is reached marks it visited. Return the level on reaching endWord. Return 0 at once if endWord is not in the list.

## Edge cases
- endWord missing from the list: 0.
- beginWord is removed from the Set so the search never comes back to it.
- One-letter words: every other listed letter is a neighbour.

## Complexity
- Time: O(N * L * 26 * L), where the last factor of L is building and hashing each candidate.
- Space: O(N * L)

## Testing note
Compared with a BFS over an explicit graph built by comparing every pair of words, on 1000 random small lists over a 3-letter alphabet. A timing run uses 5000 ten-letter words.

## Reusable pattern
**Implicit-graph BFS with generated neighbours**: when the alphabet is small, generating the neighbours of a word is cheaper than comparing all pairs. Deleting from the Set doubles as the visited mark.
