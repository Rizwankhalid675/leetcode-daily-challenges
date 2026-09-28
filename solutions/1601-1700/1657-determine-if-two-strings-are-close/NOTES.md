# 1657. Determine if Two Strings Are Close

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | hash-table, string, sorting, counting |
| Link | https://leetcode.com/problems/determine-if-two-strings-are-close/ |
| Study plan | LeetCode 75 (Hash Map / Set) |

## What it asks (own words)
You may (1) reorder characters freely and (2) swap the roles of two letters that both appear, e.g. every a becomes b
and every b becomes a. Can one string be turned into the other?

## Key constraints
- Lengths up to 10⁵, lowercase letters only.

## Approach
Think in terms of **invariants**, the things neither operation can change:
- Operation 1 makes positions irrelevant, so each string is really just its letter counts.
- Operation 2 permutes which letter holds which count, but only among letters that already exist. It can't create or
  remove a letter.

So the strings are close iff they contain **the same set of letters** and **the same sorted list of counts**.

## Why it works
Both conditions are necessary (they're invariants). They are also sufficient: with matching count multisets, a
sequence of role swaps (transpositions) can move each count onto the letter that needs it, and any permutation is a
product of transpositions. Then reordering (operation 1) finishes the job.

## Edge cases
- Different lengths → false immediately.
- Same counts but a different letter set ("ab" vs "ac") → false. This is the trap in the problem.

## Complexity
- Time: O(n + 26 log 26) = O(n)
- Space: O(26)

## Testing note
The tests include a brute force that runs BFS over every state reachable with both operations, on tiny strings. It
confirms the invariant argument independently rather than just trusting it.

## Reusable pattern
**"Can A be transformed into B?" → find invariants of the allowed operations,** then show they're sufficient.
