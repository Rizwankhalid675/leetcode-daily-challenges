# 202. Happy Number

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, math, two-pointers |
| Link | https://leetcode.com/problems/happy-number/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Repeatedly replace a number with the sum of the squares of its digits. Does this eventually reach 1, or loop forever?

## Key constraints
- n up to 2³¹ − 1.

## Approach
**Floyd's cycle detection:** a slow pointer takes one step and a fast pointer takes two. If fast reaches 1, the number
is happy. If the pointers meet elsewhere, there's a cycle without 1.

## Why it works
A 10-digit number maps to at most 10·81 = 810, and numbers below 1000 map to at most 243. So the sequence enters a
bounded range and must eventually repeat. It's a linked list with a cycle, and 1 is a fixed point (1 → 1), so "reaches
1" and "cycle without 1" are the only outcomes.

## Edge cases
- n = 1 → true immediately (fast = next(1) = 1).
- Large n.

## Complexity
- Time: O(log n) per step, with a small bounded number of steps
- Space: O(1)

## Alternatives
A Set of visited values (the test reference) is simpler and uses O(number of steps) memory.

## Reusable pattern
**Floyd's tortoise and hare on any function iteration x → f(x):** linked-list cycles (141, 142) and the duplicate
number (287).
