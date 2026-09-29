# 2666. Allow One Function Call

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics |  |
| Link | https://leetcode.com/problems/allow-one-function-call/ |
| Context | Study plan: 30 Days of JavaScript |

## What it asks (own words)
Wrap a function so that only the first call goes through. Later calls do nothing and return `undefined`.

## Approach
Keep a boolean in the closure and set it **before** calling `fn`. Tracking "has run" with a flag, instead of checking whether a result was stored, still works when `fn` itself returns `undefined`. `apply(this, args)` keeps the caller's `this`, which is good practice for decorators.

## Edge cases
- `fn` returning `undefined`: still blocked afterwards, because of the flag.

## Complexity
- Time: O(1) overhead per call
- Space: O(1)

## Testing note
The official examples, plus a call counter proving `fn` runs exactly once.

## Reusable pattern
**Function decorator with closure state**, which is also the shape of memoize, debounce and throttle.
