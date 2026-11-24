# f4lc0n roadmap

North star: the dojo becomes a **suite** — one `f4lc0n` command that runs the whole locked room, with the rules of engagement (`docs/RULES.md`) enforced in code, not just written down. "Impenetrable" means the guardrails are impenetrable: every tool refuses a target that isn't yours. This stays a learning tool. Nothing here points at anything you don't own — that line is load-bearing and it does not move.

Each row is one minor version: build it, QA it, bump the version, commit, tag, push, deploy. `/loop` works the table top to bottom and stops at Joshua's weekly-usage threshold.

## Suite (`bin/f4lc0n`)

| # | Row | Size | Status |
|---|-----|------|--------|
| 1 | `f4lc0n` dispatcher + `guard` (refuses any non-loopback target) + `doctor`, `range`, `recon`, `score` | M | shipping v0.2.0 |
| 2 | `f4lc0n range` owns Juice Shop lifecycle (up/down/status), absorbs `run-juiceshop.sh`, keeps the loopback pin | S | todo |
| 3 | `f4lc0n re` wraps the crackme build + an lldb/otool solve helper | M | todo |
| 4 | `f4lc0n status` TUI — progress across all tracks from the `progress.md` files | M | todo |
| 5 | `f4lc0n score` wraps `bench/bench.py`, prints the scoreboard diff | S | todo |
| 6 | Shared guard as a library every subcommand imports; fuzz it with bad targets in CI | S | todo |
| 6a | `f4lc0n scope add/list/rm` — authorization allowlist. Loopback always on; register a host only with an "I own this" / platform attestation; guard reads the allowlist, everything off it still refused. Opens the *authorized* scopes (owned boxes, HTB/THM/picoCTF assigned targets), never arbitrary hosts. | M | todo |

## Guides (one per supported target)

| # | Row | Size | Status |
|---|-----|------|--------|
| G1 | Juice Shop — a walkthrough per challenge category (SQLi, XSS, broken auth, IDOR…), each scored | L | todo |
| G2 | Reverse engineering — step-by-step per crackme (lldb breakpoints, reading registers) | M | todo |
| G3 | Getting-started guide per training platform in scope (HTB, THM, picoCTF, OverTheWire, PortSwigger) — how to register a box with `f4lc0n scope` and stay in bounds | M | todo |
| G4 | "Own box" guide — spin up a target you own and point f4lc0n at it safely | S | todo |

## Content

| # | Row | Size | Status |
|---|-----|------|--------|
| 7 | Two harder LeetCode: Trapping Rain Water, LRU Cache | S | todo |
| 8 | More Juice Shop challenges, each scored by the benchmark | M | todo |
| 9 | Two harder crackmes (anti-debug, packed) + solutions | M | todo |

## Ship / CI

| # | Row | Size | Status |
|---|-----|------|--------|
| 10 | CI runs the benchmark `--re --leetcode` on every push | S | todo |
| 11 | Cut v1.0.0 — major, needs Joshua's yes | — | blocked on ask |

## Landing (/mobbin pass — compared against plank, keyrate, and best-in-class dev-tool landers)

| # | Gap | Who does it | Size | Status |
|---|-----|-------------|------|--------|
| L1 | No mobile nav — links crowd at phone width | plank, keyrate | S | todo |
| L2 | Hero CTA has no secondary signal of "free / open source" above the fold | most dev landers | S | todo |
| L3 | Add a short "What you'll build" / suite section once the CLI exists | linear, raycast | M | todo |
| L4 | `apple` skill polish pass over every section (spacing, type scale, 8pt grid) | — | M | after matrix empty |
