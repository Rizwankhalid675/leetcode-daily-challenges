# 2631. Group By

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics |  |
| Link | https://leetcode.com/problems/group-by/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Add `.groupBy(fn)` to arrays. It returns an object mapping each key `fn(item)` to the list of items with that key, in their original order.

## Approach
One pass over `this`. Append to an existing bucket or start a new one. The existence test uses `hasOwnProperty` instead of `res[key]`, because keys like `"constructor"` or `"toString"` would otherwise find the inherited `Object.prototype` member and try to `.push` onto a function.

## Edge cases
- Empty array: `{}`.
- Keys named after `Object.prototype` members.

## Complexity
- Time: O(n)
- Space: O(n)

## Testing note
The official examples, the prototype-name collision case, and random arrays checked against a `Map`-based grouping. Like 2619, the file is required only for its side effect (the export is the global `Array` marker).

## Reusable pattern
**Group-by with get-or-create buckets**, which modern JS now ships as `Object.groupBy`/`Map.groupBy`.
