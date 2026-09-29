# 877. Stone Game

| Field | Value |
|---|---|
| Difficulty | Medium |
| Topics | array, math, dynamic-programming, minimax-algorithm, game-theory, zero-sum-game |
| Link | https://leetcode.com/problems/stone-game/ |
| Context | Quest: DSA / Strategy Summit / Game Theory |

## What it asks (own words)
Players alternately take a pile from either end of an even-length row, and the larger total wins (the total is odd, so there are no ties). Does the first player, Alice, win with optimal play?

## Approach
Always true. Color the piles by index parity. With an even count, the two ends always have **different** parities on Alice's turn, so she can pick whichever parity she likes. After her move the two ends share the other parity, so Bob is forced to take that one. Alice can therefore take every even-indexed pile, or every odd-indexed pile, as she chooses. The total is odd, so one parity class has the strictly larger sum, and she takes that class.

## Why it works
This is an existence argument: Alice has *some* strategy that wins, so optimal play wins too. It doesn't mean the parity strategy gives the best margin.

## Edge cases
- Two piles: Alice takes the larger one.

## Complexity
- Time: O(1)
- Space: O(1)

## Testing note
The general interval DP (diff[i][j] = max(piles[i] − diff[i+1][j], piles[j] − diff[i][j−1])) is used as an oracle on random even-length piles with odd totals. It never finds a Bob win, which matches the proof.

## Reusable pattern
**Look for a pairing/parity strategy** before writing a game DP. The interval "score difference" DP is the general fallback (compare 486 Predict the Winner, where the answer isn't constant).
