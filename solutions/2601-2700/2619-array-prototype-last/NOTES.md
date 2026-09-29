# 2619. Array Prototype Last

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/array-prototype-last/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Add a `.last()` method to every array: return the final element, or -1 if the array is empty.

## Approach
Assign a regular `function` (not an arrow) to `Array.prototype.last` so that `this` is the array it's called on. Check the length, not the value, so a falsy last element (`0`, `null`, `false`) is still returned.

## Edge cases
- Empty array: -1.
- Last element `null`, `0` or `false`: return it as is.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
The solution only has a side effect, so the "export" is just the global `Array` (a no-op marker). Requiring the file installs the method, and the tests call it on array literals.

## Reusable pattern
**Prototype extension with `function` (for `this`)**. In real code prefer a helper or subclass: patching built-ins can clash with future language methods (see `Array.prototype.at(-1)`).
