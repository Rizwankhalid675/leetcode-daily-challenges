# 238. Product of Array Except Self

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, prefix-sum |
| Link | https://leetcode.com/problems/product-of-array-except-self/ |
| Study plan | LeetCode 75 (Array / String) |

## What it asks (own words)
For every position, the product of all the other elements, computed in linear time **without division**.

## Key constraints
- n up to 10⁵ and values −30..30. The results are guaranteed to fit in 32 bits.
- Division isn't allowed. Zeros would break it anyway.

## Approach
Prefix and suffix products. `answer[i] = leftProduct(i) · rightProduct(i)`. Store the left products directly in the
output array, then sweep from the right with a running product.

## Why it works
Everything except `nums[i]` is exactly the elements to its left and the elements to its right, and multiplication is
associative.

## Edge cases
- One zero: only that position gets a non-zero result.
- Two or more zeros: everything is 0.
- **JavaScript `-0`:** `-3 * 0` is `-0`. It prints as `0` and LeetCode accepts it, but `Object.is(-0, 0)` is false
  and `assert.deepStrictEqual` treats it as different. `x + 0` normalizes `-0` to `0`. The strict test on example 2
  is what surfaced this.

## Complexity
- Time: O(n)
- Space: O(1) extra (the output array doesn't count)

## Reusable pattern
**Prefix/suffix aggregates** (compare with 3904 from September): "everything except i" = left part ⊕ right part.

## JavaScript note
JS has a signed zero. It rarely matters, but it does in strict equality checks, `1 / x`, and `Math.sign`.
