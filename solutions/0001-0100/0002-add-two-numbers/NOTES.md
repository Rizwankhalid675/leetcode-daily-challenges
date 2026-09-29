# 2. Add Two Numbers

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, math, recursion |
| Link | https://leetcode.com/problems/add-two-numbers/ |
| Study plan | Top Interview 150 (Linked List) |

## What it asks (own words)
Two numbers are stored as linked lists of digits, least significant digit first. Return their sum in the same form.

## Key constraints
- Up to 100 digits each, so the numbers can't be converted to JS numbers (2⁵³ is only about 16 digits).

## Approach
Elementary addition: walk both lists together, adding the digits and the carry; emit `sum % 10` and carry `sum ≥ 10`.
Continue while either list has digits **or a carry remains**.

## Why it works
Least-significant-first order is exactly the order in which schoolbook addition proceeds.

## Edge cases
- Lists of different lengths.
- A final carry creating an extra digit (999 + 1).
- 0 + 0.

## JavaScript note
Converting the lists to numbers fails beyond about 16 digits, because of float precision. The test uses `BigInt` as
the reference, which is fine as an oracle but misses the point of the exercise as a solution. `ListNode` is provided
globally by LeetCode; the test injects it.

## Complexity
- Time: O(max(m, n))
- Space: O(max(m, n)) for the result

## Reusable pattern
**A dummy head node** to build a result list without special-casing the first node, and **loop while carry remains**.
