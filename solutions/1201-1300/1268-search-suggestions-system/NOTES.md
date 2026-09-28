# 1268. Search Suggestions System

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, string, binary-search, trie, sorting, heap-priority-queue |
| Link | https://leetcode.com/problems/search-suggestions-system/ |
| Study plan | LeetCode 75 (Trie) |

## What it asks (own words)
As each character of a search word is typed, suggest the (up to) three alphabetically smallest products that start
with the text typed so far.

## Key constraints
- Up to 1000 products with 2·10⁴ characters in total; the search word is up to 1000 characters.

## Approach
Sort the products. In sorted order, all words with a given prefix form a **contiguous block**, and that block starts
at the prefix's *lower bound* (the first word ≥ prefix). For each typed prefix, binary search that position and take up
to three words that still start with the prefix.

## Why it works
If `w` starts with prefix p, then `p ≤ w`, and every string between p and w in sorted order also starts with p. So the
matching words sit together immediately after the lower bound, already in alphabetical order.

## Edge cases
- No product matches a prefix → an empty list, which then stays empty for longer prefixes.
- Fewer than three matches.

## Complexity
- Time: O(n log n · L) for the sort, plus O(|word| · (log n · L)) for the queries, with L the string length
  (comparisons are O(L))
- Space: O(n)

## Alternatives
The study plan lists this under **Trie**: insert the products into a trie that keeps the three smallest words at
each node, then walk the search word. It has the same output and a better per-keystroke cost when there are many
queries. The sorted-array version is simpler here.

## Reusable pattern
**Prefix queries on a sorted array = lower-bound binary search,** because a prefix defines a contiguous range.
