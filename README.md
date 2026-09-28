# LeetCode Daily Challenges: September 2026

A documented, **AI-assisted** study project covering all 28 LeetCode Daily Challenge problems from
September 1–28, 2026, solved in JavaScript. Each problem has a solution, local tests (most cross-checked against an
independent brute force), and a notes file explaining the reasoning, complexity and reusable pattern.

> **Transparency note.** The solutions, tests and notes in this repository were written by an AI coding assistant
> (Claude) and submitted to LeetCode on my account as a structured learning exercise that I directed and reviewed.
> They are **not** evidence that I independently solved these 28 problems. The goal is a study reference for me to
> learn from and revisit, and the notes are written to teach the underlying ideas rather than just show answers.

## Results (as reported by LeetCode)

| | |
|---|---|
| Problems accepted | **28 / 28** (Easy 8 · Medium 13 · Hard 7) |
| Submissions | 28 (every problem accepted on its first submission) |
| Counted as a Daily Challenge | **1**: Sept 28 (#1614), solved inside its daily window |
| Solved after their daily window | 27 (Sept 1–27). They count as solved problems, but their Daily Challenge calendar days remain missed. |
| LeetCode streak | 1 day |
| Badges earned | None. The September monthly badge was not attainable (27 days had already passed). |

The full per-problem table with LeetCode submission results is in [progress/STATUS.md](progress/STATUS.md)
(generated from [progress/results.json](progress/results.json)).

## Repository layout

```
solutions/2026/09/DD-NNNN-slug/
    solution.js        JavaScript solution (LeetCode function signature, exported for tests)
    solution.test.js   node:test tests: official examples, edge cases, randomized brute-force comparison
    NOTES.md           problem summary in my own words, reasoning, proof sketch, JS details, complexity, pattern
docs/patterns/         cross-problem patterns, JS lessons and testing lessons
progress/              problem list, recorded LeetCode results, generated status table
scripts/               helpers to record results and regenerate the status table
tests/helpers/         shared test utilities (LeetCode-style binary tree builder)
```

Problem statements are **not** copied here. Each NOTES.md summarizes the problem in original wording and links to
the official page.

## Topics practiced

| Area | Problems |
|---|---|
| Dynamic programming | 115, 940, 2472, 3414, 3524, 1621 |
| Sliding window / prefix-suffix | 1477, 1658, 3903, 3904 |
| Matrix / offset counting | 835 |
| Greedy on intervals | 1520 |
| BFS with bitmask state | 3568 |
| Segment tree | 3525 |
| Trees (post-order DFS) | 2265 |
| Stacks, brackets, parsing | 1614, 1807, 1190, 1096 |
| Math, combinatorics, geometry | 3875, 3876, 3870, 3871, 1621, 836, 1401, 3483, 3498, 3550 |

The best place to start is **[docs/patterns/README.md](docs/patterns/README.md)**, which groups the 28 problems by
the idea that solves them and collects the JavaScript-specific lessons (the 2⁵³ integer limit, BigInt for modular
multiplication, `%` with negatives, array aliasing, and so on).

## Running the tests

```bash
npm test
```

Requires Node.js 18+. There are no dependencies; the tests use the built-in `node:test` runner.

## Links

- LeetCode profile: https://leetcode.com/u/user7283A/

## License

MIT
