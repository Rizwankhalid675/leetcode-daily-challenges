# 445. Add Two Numbers II

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | linked-list, math, stack |
| Link | https://leetcode.com/problems/add-two-numbers-ii/ |
| Context | Study plan: Programming Skills |

## What it asks (own words)
Two numbers are stored as linked lists with the **most significant** digit first. Return their sum in the same format — ideally without reversing the input lists.

## Key constraints
- Up to 100 digits each, so converting to `Number` loses precision.

## Approach
Push each list's digits onto a stack so popping yields digits from least significant upwards. Add pairs plus carry; each resulting digit becomes a new node placed **in front** of the result built so far, so the output comes out most-significant first. Keep going while either stack has digits or a carry remains.

## Edge cases
- Different lengths; a final carry (999 + 1 = 1000); 0 + 0.

## Complexity
- Time: O(m + n)
- Space: O(m + n) for the stacks

## Testing note
Compared with `BigInt` addition on random numbers up to 100 digits, and checked the input lists are untouched.

## Reusable pattern
**Stacks to process a singly linked list backwards + head insertion** to build the output in reverse.
