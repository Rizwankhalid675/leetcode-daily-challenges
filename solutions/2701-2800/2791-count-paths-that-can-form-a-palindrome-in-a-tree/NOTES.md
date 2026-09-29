# 2791. Count Paths That Can Form a Palindrome in a Tree

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | hash-table, bit-manipulation, tree, depth-first-search |
| Link | https://leetcode.com/problems/count-paths-that-can-form-a-palindrome-in-a-tree/ |
| Context | Quest: 2026 Spring Sprint / Week 1: Practice / Interview Benchmark I (quiz) |

## What it asks (own words)
A rooted tree has one letter on each edge (the edge from node i to its parent carries s[i]). Count the unordered node pairs whose path letters could be rearranged into a palindrome.

## Key constraints
- Up to 10^5 nodes. The tree can be a single chain, so recursion is unsafe.
- The answer can reach about 5 * 10^9, which is above 32 bits but well within 2^53.

## Approach
1. Let mask[v] be the XOR of `1 << letter` along the root-to-v path, giving the parity of each letter. Compute it in BFS order from children lists, so the order of the labels does not matter.
2. The path u-v has the parity mask `mask[u] ^ mask[v]`, because the shared part above the LCA cancels.
3. Letters can form a palindrome iff at most one letter has odd count, i.e. the XOR is 0 or a single bit.
4. Visit nodes in turn. For each mask, add the number of earlier nodes with the same mask plus, for each of the 26 bits, those with that bit flipped. Then record the mask. A `Map` keeps the counts, because masks go up to 2^26.

## Why it works
Every unordered pair is counted exactly once, when its later node is processed. The prefix-XOR trick turns path parities into a lookup of one value.

## Edge cases
- A single node has no pairs.
- The root has mask 0, so it pairs with nodes whose mask is 0 or a single bit.

## Complexity
- Time: O(26 * n)
- Space: O(n)

## Testing note
Compared with a brute force that walks each path to the LCA and counts letters, on 500 random trees with shuffled labels and small alphabets. Timing runs on a 10^5 chain and star check the closed-form answer n(n-1)/2 for all-equal letters.

## Reusable pattern
**Parity bitmask + "equal or one bit away" counting** (compare 1915 Number of Wonderful Substrings), applied to root-to-node prefixes in a tree.
