# 1004. Max Consecutive Ones III

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, binary-search, sliding-window, prefix-sum |
| Link | https://leetcode.com/problems/max-consecutive-ones-iii/ |
| Study plan | LeetCode 75 (Sliding Window) |

## What it asks (own words)
In a 0/1 array you may turn at most k zeros into ones. What is the longest run of ones you can create?

## Key constraints
- n up to 10⁵, 0 ≤ k ≤ n.

## Approach
Reframe: find the **longest subarray containing at most k zeros**, since those are exactly the zeros you'd flip.
Use a variable-size sliding window: extend right, and while the zero count exceeds k, move left forward.

## Why it works
For each right end, the window is the longest valid window ending there. `left` only moves forward, because a valid
window's left edge never needs to move back when right grows (fewer elements can only mean fewer zeros).

## Edge cases
- k = 0: the longest existing run of ones (possibly 0).
- k ≥ number of zeros: the whole array.

## Complexity
- Time: O(n) (each index enters and leaves once)
- Space: O(1)

## Reusable pattern
**"At most k bad elements" → variable-size sliding window with a bad-count.** Reframing a modification ("flip") as a
constraint on a window is the key step.
