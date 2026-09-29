# 913. Cat and Mouse

| Field | Value |
|---|---|
| Difficulty | Hard |
| Topics | math, dynamic-programming, graph, topological-sort, memoization, minimax-algorithm, game-theory, zero-sum-game |
| Link | https://leetcode.com/problems/cat-and-mouse/ |
| Context | Quest: DSA / Strategy Summit / Game Theory |

## What it asks (own words)
Mouse (starting at 1, moving first) and Cat (starting at 2) take turns walking along the edges of an undirected graph. The mouse wins by reaching node 0, the cat wins by landing on the mouse, and the cat may never enter node 0. A repeated position is a draw. Given optimal play, who wins?

## Key constraints
- n ≤ 50, so there are only 50 · 50 · 2 = 5000 states (mouse node, cat node, whose turn).
- Draws are real, and cycles are everywhere. That breaks naive recursion.

## Approach — retrograde analysis (coloring BFS)
This is the technique endgame tablebases use: start from positions whose outcome is already known and reason **backwards**.
1. **States**: (m, c, t) with t = mouse to move / cat to move.
2. **Seeds**: m = 0 → mouse win; m = c (≠ 0) → cat win. Push all of them onto a queue.
3. **Degree counters**: for each state, count the moves available to the player about to move (for the cat, not counting moves into the hole).
4. **Propagate**: pop a decided state S with result r. For every parent P, meaning a state where the *other* player moved into S (mouse-turn parents move the mouse, cat-turn parents move the cat, never out of node 0):
   - if r is a win for P's mover, P is a win: they simply choose this move;
   - otherwise decrement P's counter. If it hits 0, every move from P loses, so P is a loss for its mover.
   Newly decided parents join the queue. Already-decided parents (including the seeds) are skipped.
5. Anything never decided is a **draw**. Return the value of (1, 2, mouse to move).

## Why it works
The BFS computes the least fixpoint of the rules "win if some move reaches a win, lose if every move reaches a loss", starting from the terminal states. Every state it decides has a result that can be forced in finitely many moves, so the repetition rule never interferes. For a state it never decides, the mover has no winning move and at least one move to another undecided state. Both players can therefore keep the game inside the undecided region forever, and the repetition rule turns that into a draw.

The tempting alternative, memoized DFS with a turn cap such as 2n, is unreliable. On a cyclic state graph, a value computed while an ancestor is still on the recursion stack gets cached as if it were final, and "hit the cap ⇒ draw" isn't a sound bound in general. Such solutions pass the examples but have been shown to fail hidden tests. The retrograde BFS has no depth limit and no recursion at all.

## Edge cases
- Cat-turn parents come from the cat's neighbours, but the cat can't have come from node 0, so those are skipped. The cat's move counter likewise excludes node 0.
- Mouse-turn parents of a "mouse in hole" seed are (neighbour of 0, c, mouse to move): exactly the mouse stepping into the hole.

## Complexity
- Time: O(n · E), where E is the number of edges: each of the O(n²) states is decided once and scans a neighbour list. At most about 5000 · 50 steps.
- Space: O(n²)

## Testing note
- Official examples plus hand-checked tiny graphs (immediate mouse win, forced cat wins).
- An **independent oracle** repeatedly sweeps every state, applying the same win/lose rules until nothing changes (Kleene fixpoint iteration, no queue or counters). It's compared on 1500 random valid graphs with 3–9 nodes, and the test asserts that all three outcomes (draw, mouse win, cat win) actually occur.
- Two graphs often cited as breaking turn-capped DFS (a draw, and a mouse win that needs a long escape path), checked against the oracle, plus a timed batch of 50-node graphs.

## Reusable pattern
**Retrograde analysis / game-graph coloring** for games with cycles and draws: seed the terminal states, walk the reverse edges, "any winning move ⇒ win", count down "all moves lose ⇒ loss", and whatever remains is a draw. Compare 1728 Cat and Mouse II.
