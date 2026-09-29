# 2629. Function Composition

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/function-composition/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Given a list of one-argument functions, return a single function equal to calling them nested: `f1(f2(f3(x)))`. The **last** function runs first. An empty list means "return x unchanged".

## Approach
The returned closure walks the array from the end to the start, replacing `x` with `functions[i](x)` each time.

## Edge cases
- Empty list: the loop doesn't run, so it's the identity.
- Order matters (example 1: `2*4=8`, then `64`, then `65`).

## Complexity
- Time: O(k) per call for k functions
- Space: O(1)

## Testing note
The official examples, plus random pipelines checked against explicit nested application.

## Reusable pattern
**compose = reduceRight over functions**. `pipe` is the same thing left to right.
