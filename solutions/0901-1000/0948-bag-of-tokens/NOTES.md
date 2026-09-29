# 948. Bag of Tokens

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, two-pointers, greedy, sorting |
| Link | https://leetcode.com/problems/bag-of-tokens/ |
| Context | Quest: DSA / Strategy Summit / Assignment (quiz) |

## What it asks (own words)
Each token can be played once: spend its value in power to gain 1 score, or spend 1 score to gain its value in power. What's the highest score you can reach at any point?

## Approach
Sort the tokens and use two pointers.
- If power covers the cheapest remaining token, play it face-up (score +1) and record the best.
- Otherwise, if we have score and at least two tokens remain, play the most expensive token face-down (score −1, big power boost).
- Otherwise stop.

## Why it works
Every point of score costs one face-up play, so the cheapest tokens are the right ones to buy with. Converting score back into power is only worth doing for the largest token. Selling for power is also only useful if something is left to buy afterwards (hence `lo < hi`). Even then, the purchase might not happen, which is why we keep the running maximum rather than the final score.

## Edge cases
- Empty bag: 0.
- Zero-valued tokens are free points.
- The sort uses a numeric comparator and a copy, so the caller's array is untouched.

## Complexity
- Time: O(n log n)
- Space: O(n) for the sorted copy

## Testing note
Compared with an exhaustive search over every sequence of plays (up to 6 tokens) on random inputs.

## Reusable pattern
**Sorted two-pointer greedy**: buy cheap from the left, cash in expensive from the right.
