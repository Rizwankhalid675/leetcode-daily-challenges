# 2466. Count Ways To Build Good Strings

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | dynamic-programming |
| Link | https://leetcode.com/problems/count-ways-to-build-good-strings/ |
| Context | Study plan: Dynamic Programming |

## What it asks (own words)
Build strings by repeatedly appending either a block of `zero` '0's or a block of `one` '1's. Count distinct strings whose length is in [low, high], modulo 10⁹+7.

## Approach
Two different sequences of appends first differ at some block, and at that position one string has '0' and the other '1', so distinct sequences give distinct strings. Therefore count sequences by length: `ways[len] = ways[len − zero] + ways[len − one]`, with `ways[0] = 1`, and add up `ways[low..high]`.

## Edge cases
- zero = one: both blocks have the same length but different characters, and both still count.
- Values stay below 2·(10⁹+7) before the modulo, safely within exact double range.

## Complexity
- Time: O(high)
- Space: O(high)

## Testing note
The oracle generates the actual strings into a Set (so it does not rely on the distinctness argument) for high ≤ 13. At max size, (1, 10⁵, 1, 1) is checked against the closed form 2^(10⁵+1) − 2 mod p with BigInt.

## Reusable pattern
**Climbing-stairs counting with custom step sizes**, summed over a range of targets.
