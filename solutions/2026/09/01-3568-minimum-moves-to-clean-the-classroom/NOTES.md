# 3568. Minimum Moves to Clean the Classroom

| Field | Value |
|---|---|
| Daily Challenge date | 2026-09-01 |
| Solved | 2026-09-28, after the daily window (solved problem, not a completed Daily Challenge) |
| Difficulty | Medium |
| Topics | Array, Hash Table, Bit Manipulation, Breadth-First Search, Matrix |
| Link | https://leetcode.com/problems/minimum-moves-to-clean-the-classroom/ |
| Result | Accepted, 799/799 tests, 174 ms, 76.7 MB (submission 2156486202) |

## What it asks (own words)
A grid contains a start cell, walls, up to 10 pieces of litter and some "recharge" cells. Every step to a
neighbouring cell costs one unit of energy. You start with a full tank of `energy`; stepping onto a recharge cell
refills it. With an empty tank you cannot move. Find the fewest steps needed to visit every litter cell, or −1.

## Key constraints
- Grid at most 20×20 = 400 cells.
- **At most 10 litter cells**, which strongly suggests a bitmask (2¹⁰ = 1024 subsets).
- Energy at most 50.

## Reasoning
"Fewest moves" on an unweighted grid means BFS. But position alone is not enough state: whether you can continue
depends on which litter you already hold and how much energy is left. So the true state is
`(cell, collectedMask, energy)`. BFS on that state graph gives the shortest path to any state whose mask is full.

The raw state space is 400 × 1024 × 51 ≈ 21 million. That is too many to allocate and explore naively in JS, so
we need a pruning rule.

**Dominance:** if we reach `(cell, mask)` at move *k* with energy *e*, any later arrival at the same
`(cell, mask)` with energy ≤ *e* is useless. It took at least as many moves and has no more options. So store only
the best energy per `(cell, mask)` and skip arrivals that don't improve it. This cuts the state space to about
400 × 1024 entries, each improved only a few times.

## Algorithm
1. Index the litter cells 0..k−1 and find `S`.
2. If there is no litter, return 0.
3. BFS level by level (level = number of moves). For each state with energy > 0, try the 4 neighbours:
   - skip walls and out-of-bounds cells;
   - new energy = `energy` on an `R` cell, otherwise `e − 1`;
   - new mask = mask with this cell's litter bit set (if any);
   - if the new mask is full → return current move count;
   - if `bestEnergy[cell][mask] >= newEnergy` → skip; otherwise record and enqueue.
4. When the queue empties, return −1.

## Why it works
BFS processes states in non-decreasing move order, so the first time a full mask appears, it is with the minimum
number of moves. The dominance pruning never discards a state that could lead to a better answer: the kept state
reached the same (cell, mask) no later and with at least as much energy, so every continuation of the discarded
state is also available to the kept one.

## JavaScript implementation details
- The state is flattened to `cell * masks + mask`, with an `Int8Array` for best energy (≤ 50 fits in a byte). One
  typed allocation of 400 × 1024 bytes ≈ 400 KB is much cheaper than nested arrays or a `Map` of string keys.
- Level-by-level BFS (`queue` / `next` arrays) keeps the move count implicit and avoids storing it per state.
- `(cell / n) | 0` is integer division; the bitwise OR truncates toward zero.

## Edge cases
- No litter → 0 (checked before BFS).
- Arriving on litter with exactly 0 energy still collects it. The check happens on arrival, before the
  "can't move with 0 energy" rule applies to the *next* move.
- Stepping onto `R` with 0 energy left is legal because the step itself is paid first, then the refill happens.
- The start cell is not a recharge cell.

## Bugs / debugging
- The solution was right first time, but **my own stress test was wrong**: I assumed a 20×20 room with 10 spread-out
  litter cells and energy 50 would be solvable. It isn't (no recharge cells, and the tour is longer than 50), so
  the solution correctly returned −1 and the test "failed". The fix was to the test: add recharge cells to the
  stress grid, and add a randomized comparison against an **unpruned reference BFS** over full
  `(cell, mask, energy)` states. The lesson: when a test fails, check the test's assumption before touching the
  solution.

## Alternatives considered
- **Unpruned BFS over (cell, mask, energy)** is correct but has about 21M states. It's used here only as a test
  oracle on tiny grids.
- **Precompute pairwise distances between litter cells, then run a TSP bitmask DP.** This is the classic approach
  when there is no energy limit. Energy breaks it, because the distance between two litter cells depends on the
  energy you arrive with and on the recharge cells along the way.

## Complexity
- Time: O(m·n·2ᴸ·E) in the worst case, where each (cell, mask) can be improved up to E times; in practice
  far less.
- Space: O(m·n·2ᴸ) for the best-energy table.

## Reusable pattern
**BFS on an augmented state + dominance pruning.** When "where am I" isn't enough to decide what you can do next, add
the missing information (collected items as a bitmask, remaining fuel, keys held…) to the state. If one component
is "more is better" (like fuel), store its best value instead of a full visited set over it.

## What to take away personally
The small constraint (≤ 10 litter) is the hint. Whenever a constraint is around 10–20, think bitmask over subsets.
