# 169. Majority Element

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | array, hash-table, divide-and-conquer, sorting, counting |
| Link | https://leetcode.com/problems/majority-element/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
One value appears more than half the time. Return it, ideally in O(n) time and O(1) space.

## Key constraints
- n up to 5·10⁴, and a majority is guaranteed to exist.

## Approach: Boyer–Moore majority vote
Keep a `candidate` and a `count`. For each element: if the count is 0, adopt the element as the candidate. Then add 1
if it equals the candidate, else subtract 1.

## Why it works
Think of each decrement as cancelling one candidate occurrence against one different element. Cancellations remove
pairs of *different* values. The majority value has more occurrences than all the others combined, so it can't be
fully cancelled. It must be the candidate standing at the end.

## Edge cases
- n = 1.
- The majority first appears late in the array: the candidate may change several times before settling.

## Complexity
- Time: O(n)
- Space: O(1)

## Alternatives
A hash-map count (O(n) space), or sorting and taking the middle element (O(n log n)). Without the existence guarantee,
a second pass would be needed to confirm the candidate.

## Reusable pattern
**Cancellation / voting.** It generalizes to "elements appearing more than n/3 times" (229) with two candidates.
