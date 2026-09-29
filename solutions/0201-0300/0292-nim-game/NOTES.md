# 292. Nim Game

| Field | Value |
|---|---|
| Difficulty | Easy |
| Topics | math, brainteaser, minimax-algorithm, game-theory, nim-game, impartial-game |
| Link | https://leetcode.com/problems/nim-game/ |
| Context | Quest: DSA / Strategy Summit / Game Theory |

## What it asks (own words)
Players alternately take 1–3 stones, and whoever takes the last stone wins. You move first with n stones: can you force a win?

## Key constraints
- n up to 2^31 − 1, far too large for a DP table, so we need the closed form.

## Approach
A heap of 0 is a loss for the player to move. From a multiple of 4, every move (take 1, 2 or 3) leaves a non-multiple. From a non-multiple, taking n mod 4 stones leaves a multiple. By induction, the losing positions are exactly the multiples of 4.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
Checked against a win/lose DP (a position wins if some move reaches a losing one) for every n ≤ 500.

## Reusable pattern
**Compute small game values by DP, spot the period, prove it by induction** (the start of Sprague–Grundy thinking).
