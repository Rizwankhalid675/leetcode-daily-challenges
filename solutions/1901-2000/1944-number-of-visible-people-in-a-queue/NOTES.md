# 1944. Number of Visible People in a Queue

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | array, stack, monotonic-stack |
| Link | https://leetcode.com/problems/number-of-visible-people-in-a-queue/ |
| Context | Quest: 2026 Spring Sprint / Week 1: Practice / Practice III |

## What it asks (own words)
People with distinct heights stand in a line facing right. Person i can see person j (j > i) when everyone standing between them is shorter than both. Count how many people each person can see.

## Key constraints
- Up to 10^5 people, so an O(n^2) scan is too slow.
- Heights are distinct.

## Approach
Walk from right to left with a stack of heights that decreases from bottom to top. For person i:
- Pop every stacked person shorter than i. Each one is visible, because anyone between them was already popped as shorter.
- If the stack is still non-empty, its top is the first person taller than i, which is also visible. Nobody behind that person can be seen.
- Push i.

## Why it works
A popped person is hidden from everyone further left by i, who is taller, so the stack only keeps people who could still be seen.

## Complexity
- Time: O(n), since each height is pushed and popped at most once.
- Space: O(n)

## Testing note
Compared with an O(n^2) direct check on 1000 random permutations, plus a 10^5 timing run.

## Reusable pattern
**Monotonic stack where pops are counted, not only the survivor**. The same idea as "next greater element", but each pop is also counted as a visible person.
