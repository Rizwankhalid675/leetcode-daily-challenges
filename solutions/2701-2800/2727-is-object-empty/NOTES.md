# 2727. Is Object Empty

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/is-object-empty/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Say whether a JSON object has no keys, or a JSON array has no elements. The follow-up asks for O(1).

## Approach
Start a `for...in` loop and return `false` on the first iteration. If the loop never runs, the value is empty. Unlike `Object.keys(obj).length`, this doesn't build an array of every key.

## Edge cases
- Keys whose value is falsy (`{a: undefined}`, `[null]`) still count.
- Inputs are parsed JSON, so there are no inherited enumerable properties to worry about.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
The official examples, falsy-valued keys, and random JSON values checked against `Object.keys`.

## Reusable pattern
**Early-exit iteration** to test "is there at least one?" without materializing the collection.
