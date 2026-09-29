# 421. Maximum XOR of Two Numbers in an Array

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, bit-manipulation, trie |
| Link | https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/ |
| Context | Quest: DSA / Tree-shaped Deep Forest / Assignment II (quiz) |

## What it asks (own words)
Pick two entries (possibly the same one) of the array to maximize their bitwise XOR.

## Key constraints
Up to 2·10^5 numbers in [0, 2^31 − 1]: an O(n²) pair scan is too slow; 31-bit values need care with JavaScript's signed 32-bit bit operators.

## Approach
Binary trie on bits 30..0 (most significant first):
- Insert each number, then query it: at every level try to follow the child with the **opposite** bit (that sets this XOR bit to 1); fall back to the same bit when needed.
- Greedy is correct because a 1 at a higher bit outweighs all lower bits combined.
- Nodes live in one `Int32Array` (two slots per node), sized n·31 + 1 up front: about 6.2M nodes, ~50 MB, with no per-node objects.

## Edge cases
- One element: the answer is x XOR x = 0 (the query finds x itself).
- Values use bit 30 at most, so `1 << b` and the accumulated result stay positive; `>>>` is used to read bits.

## Complexity
- Time: O(31 · n)
- Space: O(31 · n)

## Testing note
Compared with the O(n²) pair scan on random arrays (both small values and full 31-bit values); extremes like 0 and 2^31 − 1; timing test at 2·10^5.

## Reusable pattern
**Max XOR pair = bitwise trie + greedy opposite-bit walk** (alternatively, a bit-by-bit prefix-set greedy).
