# 138. Copy List with Random Pointer

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, linked-list |
| Link | https://leetcode.com/problems/copy-list-with-random-pointer/ |
| Study plan | Top Interview 150 (Linked List) |

## What it asks (own words)
Deep-copy a linked list where each node also has a `random` pointer to any node (or null). No pointer in the copy may
refer to an original node.

## Key constraints
- Up to 1000 nodes.

## Approach
Two passes with a Map from original node to copy:
1. Create a copy of every node (value only).
2. For each original node, set `copy.next = map(orig.next)` and `copy.random = map(orig.random)`.

Seeding the map with `null → null` handles null pointers without special cases.

## Why it works
A random pointer can refer to a node that hasn't been created yet in a single pass. Creating all copies first
guarantees every target exists when wiring.

## Edge cases
- An empty list → null.
- `random` pointing to itself or backwards.
- Duplicate values: identity is by node, not value (the example [[3,null],[3,0],[3,null]]).

## Complexity
- Time: O(n)
- Space: O(n) for the map

## Alternatives
Interleave each copy right after its original (A → A' → B → B'), set `A'.random = A.random.next`, then unweave. This
gives O(1) extra space.

## Testing note
Besides comparing serialized structure, the test checks that **no copied node or random pointer references an original
node**, which is the actual deep-copy requirement.

## Reusable pattern
**Clone graphs via an old→new map in two passes** (the same idea is used in 133 Clone Graph).
