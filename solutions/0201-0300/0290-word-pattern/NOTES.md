# 290. Word Pattern

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, string |
| Link | https://leetcode.com/problems/word-pattern/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Does the sequence of words follow the letter pattern, with a one-to-one correspondence between letters and words?

## Key constraints
- Pattern ≤ 300 letters; s ≤ 3000 characters with single spaces between words.

## Approach
Split into words; if the counts differ, return false. Then run the two-map bijection check from 205, letter↔word.

## Why it works
Same argument as 205: both directions must be functions.

## Edge cases
- Different numbers of letters and words.
- Two letters mapping to the same word ("ab" with "dog dog").
- **JavaScript pitfall:** plain objects used as maps have inherited keys ("constructor", "toString"). `Map` avoids this;
  the test includes such words.

## Complexity
- Time: O(n)
- Space: O(n)

## Reusable pattern
**Bijection via two maps, and prefer `Map` over plain objects** for arbitrary string keys.
