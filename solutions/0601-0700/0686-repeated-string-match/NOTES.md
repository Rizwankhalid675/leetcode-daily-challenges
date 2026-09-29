# 686. Repeated String Match

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | string, string-matching, z-algorithm, knuth-morris-pratt-algorithm, boyer-moore-string-search-algorithm |
| Link | https://leetcode.com/problems/repeated-string-match/ |
| Context | Quest: DSA / Sequence Valley / String Matching |

## What it asks (own words)
Fewest repetitions of a such that b is a substring of the result, or −1.

## Approach
Let q = ⌈|b| / |a|⌉ (fewest copies long enough to hold b). If b occurs, it starts somewhere within the first copy of a, so q or q + 1 copies always suffice if any number does.

## Why only q + 1
An occurrence starting at offset p < |a| in the first copy ends before p + |b| < |a| + |b| ≤ (q + 1)·|a|. More copies can't create new start positions (it's periodic).

## Complexity
- Time: O((|a| + |b|)) with linear search
- Space: O(|a| + |b|)

## Testing note
Brute force tries up to q + 3 copies; they agree on 2000 random pairs, confirming the bound empirically too.

## Reusable pattern
**Bounding the search using periodicity** — only one extra copy is ever needed.
