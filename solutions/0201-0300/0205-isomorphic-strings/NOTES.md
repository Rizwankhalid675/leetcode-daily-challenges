# 205. Isomorphic Strings

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | hash-table, string |
| Link | https://leetcode.com/problems/isomorphic-strings/ |
| Study plan | Top Interview 150 (Hashmap) |

## What it asks (own words)
Can s be turned into t by consistently renaming characters, where each character maps to exactly one character and no
two characters map to the same one?

## Key constraints
- Up to 5·10⁴ ASCII characters.

## Approach
Keep **two maps**, s→t and t→s. At each position, the pair (a, b) must agree with both maps; then record it.

## Why it works
A single map only enforces "each a maps to one b". The reverse map enforces "no two a's map to the same b". Together
they make the mapping a bijection.

## Edge cases
- "badc" vs "baba": the forward map alone would accept it (b→b, a→a, d→b, c→a), but the reverse map catches b being
  used twice.

## Complexity
- Time: O(n)
- Space: O(alphabet)

## Alternatives
Compare the "first-occurrence index" signatures of both strings: each character is replaced by the index where it
first appears. This is the test reference.

## Reusable pattern
**Bijection check = two maps (or a canonical signature).** It's reused in 290 (Word Pattern).
