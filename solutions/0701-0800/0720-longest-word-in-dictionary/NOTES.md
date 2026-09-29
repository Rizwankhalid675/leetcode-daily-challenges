# 720. Longest Word in Dictionary

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, string, trie, sorting |
| Link | https://leetcode.com/problems/longest-word-in-dictionary/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Trie |

## What it asks (own words)
Among the given words, find the longest one whose every proper prefix (length 1, 2, ...) is also in the list. Break ties by picking the alphabetically smallest; return "" if none qualifies.

## Approach
- Build a trie (array-backed children, and `wordAt[node]` = index of the word ending there, or -1).
- DFS from the root, but only step into a child that ends a word. Every node reached this way is a word whose prefixes all exist.
- Keep the best word: longer wins; on equal length, the smaller string wins.

## Edge cases
- Duplicate words are harmless (they map to the same trie node).
- A word whose one-letter prefix is missing is never reached.

## Complexity
- Time: O(total characters × 26) for building and walking the trie
- Space: O(total characters × 26)

## Testing note
Compared against a brute force that checks every prefix of every word in a set.

## Reusable pattern
**Trie walk restricted to terminal nodes** answers "buildable one letter at a time" questions. (A sort-plus-set solution also works.)
