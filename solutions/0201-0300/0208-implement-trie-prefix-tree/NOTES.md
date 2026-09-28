# 208. Implement Trie (Prefix Tree)

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, design, trie |
| Link | https://leetcode.com/problems/implement-trie-prefix-tree/ |
| Study plan | LeetCode 75 (Trie) |

## What it asks (own words)
Build a prefix tree supporting insert(word), search(word) (exact match) and startsWith(prefix).

## Key constraints
- Words up to 2000 characters, and at most 3·10⁴ operations.

## Approach
Each node is `{ children: Map<char, node>, isWord: boolean }`.
- **insert:** walk and create nodes character by character, then mark the last node `isWord`.
- **search:** walk; true only if the walk succeeds *and* the final node is marked.
- **startsWith:** walk; true if the walk succeeds.

A shared `_walk` helper avoids duplicating the traversal.

## Why it works
A path from the root spells a prefix, and a node exists iff some inserted word has that prefix. The `isWord` flag
distinguishes complete words from mere prefixes ("app" versus "apple").

## Edge cases
- Searching a prefix of an inserted word → false until that prefix itself is inserted.
- Inserting the same word twice is harmless.

## Complexity
- Time: O(L) per operation
- Space: O(total characters inserted)

## JavaScript note
A `Map` per node is flexible. For a fixed lowercase alphabet, an array of 26 children, or a plain object, is often
faster and lighter.

## Reusable pattern
**Trie for prefix queries.** It's the basis of autocomplete (1268), word search II (212), wildcard search (211), and
bitwise tries for maximum XOR (421).
