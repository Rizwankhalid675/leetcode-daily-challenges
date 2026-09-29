# 2433. Find The Original Array of Prefix Xor

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, bit-manipulation |
| Link | https://leetcode.com/problems/find-the-original-array-of-prefix-xor/ |
| Context | Quest: Maths / Bit Operation Chip Laboratory / Assignment (quiz) |

## What it asks (own words)
pref[i] is the XOR of arr[0..i]; recover arr.

## Approach
pref[i] = pref[i−1] ^ arr[i], and XOR-ing both sides with pref[i−1] cancels it: arr[i] = pref[i] ^ pref[i−1].

## Complexity
- Time: O(n)
- Space: O(n) for the output

## Testing note
Round trip: random arrays are prefix-XORed and must come back unchanged; plus a max-size run.

## Reusable pattern
**Prefix XOR inverts like prefix sums**, with XOR as its own inverse (x ^ x = 0).
