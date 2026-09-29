# 211. Design Add and Search Words Data Structure

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, depth-first-search, design, trie |
| Link | https://leetcode.com/problems/design-add-and-search-words-data-structure/ |
| Context | Study plan: Top Interview 150 |

## What it asks (own words)
Build a word store with `addWord` and `search`, where a search pattern may contain `.` meaning "any single letter".

## Approach
Store words in a trie (each node: `next` map of letter to child, and an `end` flag).
- `addWord`: walk/create the path and mark the last node.
- `search`: recursive walk. A letter follows its single child; a `.` tries every child and succeeds if any branch does. At the end of the pattern, the node must be a word end.

## Key constraints
- Words are at most 25 letters and a query has at most 2 dots, so branching stays tiny and recursion depth is at most 25.

## Edge cases
- A stored word's prefix is not a match (`end` flag).
- A pattern longer than every stored word.

## Complexity
- Time: `addWord` O(L); `search` O(L) without dots, O(26² · L) worst case with 2 dots
- Space: O(total letters added)

## Testing note
Random add/search sequences over a 3-letter alphabet, checked against scanning all added words with an anchored regex (where `.` already means "any character").

## Reusable pattern
**Trie + DFS for wildcard matching**: the wildcard fans out only at its position, while literal letters stay a single path.
