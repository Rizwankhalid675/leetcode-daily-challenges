# 380. Insert Delete GetRandom O(1)

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, hash-table, math, design, randomized |
| Link | https://leetcode.com/problems/insert-delete-getrandom-o1/ |
| Study plan | Top Interview 150 (Array / String) |

## What it asks (own words)
Design a set supporting insert, remove and "return a uniformly random element", each in average O(1).

## Key constraints
- Up to 2·10⁵ calls.

## Approach
Two structures that cover each other's weaknesses:
- an **array** of values, which gives O(1) random access for `getRandom`;
- a **Map from value to array index**, which gives O(1) membership and location.

**Remove** in O(1): move the array's last element into the removed element's slot, update that element's index, then
pop the last slot.

## Why it works
The array always holds exactly the set's elements (in arbitrary order), and the map stays consistent after each
swap-and-pop. A uniform random index into the array is a uniform random element.

## Edge cases
- Removing the element that is itself last: `set(last, i)` writes its own index, then `delete(val)` removes it. That's
  why the order of those two lines matters.
- Duplicate inserts and missing removes return false.

## Complexity
- Time: O(1) average per operation
- Space: O(n)

## Testing note
Checked against a `Set` over 20,000 random operations, plus a rough uniformity check (4 values × 40,000 draws, each
within ±10%).

## Reusable pattern
**Swap-with-last deletion** for O(1) removal from an unordered array, paired with a position index.
