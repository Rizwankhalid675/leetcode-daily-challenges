# 146. LRU Cache

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, linked-list, design, doubly-linked-list |
| Link | https://leetcode.com/problems/lru-cache/ |
| Context | Quest: System & Software Design / Cache System Design Base / Cache System Design |

## What it asks (own words)
Build a fixed-capacity key/value cache. Reading or writing a key makes it the most recently used; when an insert pushes the size past capacity, throw out the key that has gone unused the longest. Both operations must be O(1).

## Approach
A JavaScript Map iterates in insertion order, and deleting a key and setting it again moves it to the end. So the Map is the hash table and the recency list in one:
- `get`: if present, delete and re-set the key (it is now the newest), return its value.
- `put`: delete the key if it exists, set it (newest), and if the size is over capacity delete `map.keys().next().value`, the oldest key.

The textbook version is a hash map plus a doubly linked list with sentinel nodes. The Map does the same work inside the engine.

## Edge cases
- Updating an existing key refreshes its recency and must not evict anything.
- Capacity 1: every new key evicts the previous one.

## Complexity
- Time: O(1) average per operation
- Space: O(capacity)

## Testing note
Compared with a brute-force array (most recent last, linear search) under random get/put sequences, plus a 2·10⁵-operation timing check.

## Reusable pattern
**Insertion-ordered Map as an LRU list**: delete + set = move to the back; the first key = least recent.
