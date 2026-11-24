# f4lc0n roadmap

North star: a **focused** dojo, not a Kali-style kitchen sink. The edge is being small and actually
used. The one differentiating feature is the **guard** — the rules of engagement enforced in code,
not prose. Deepen that; don't drown it in tooling.

Priority order (the loop works this top to bottom): **guides and content first** — they turn solves
into something you can learn from. Suite plumbing is reorganizing things that already work, so it
comes after. v1.0 = guides done and content deep, not "more tools."

## 1. Guides (one per supported target) — highest value

| # | Row | Size | Status |
|---|-----|------|--------|
| G1 | Juice Shop — a walkthrough per challenge category (SQLi, XSS, broken auth, IDOR…), each scored | L | todo |
| G2 | Reverse engineering — step-by-step per crackme (lldb breakpoints, reading registers) | M | todo |
| G3 | Getting-started guide per training platform in scope (HTB, THM, picoCTF, OverTheWire, PortSwigger) | M | todo |
| G4 | "Own box" guide — spin up a target you own and point f4lc0n at it safely | S | todo |

## 2. Content — deepen the room

| # | Row | Size | Status |
|---|-----|------|--------|
| 7 | Two harder LeetCode: Trapping Rain Water, LRU Cache | S | todo |
| 8 | More Juice Shop challenges, each scored by the benchmark | M | todo |
| 9 | Two harder crackmes (anti-debug, packed) + solutions | M | todo |

## 3. Ship / CI

| # | Row | Size | Status |
|---|-----|------|--------|
| 10 | CI runs the benchmark `--re --leetcode` on every push | S | todo |

## 4. Suite plumbing — after guides + content

| # | Row | Size | Status |
|---|-----|------|--------|
| 1 | `f4lc0n` dispatcher + `guard` + `doctor`/`range`/`recon`/`score` | M | done v0.2.0 |
| 2 | `f4lc0n range` absorbs `run-juiceshop.sh`, keeps the loopback pin | S | todo |
| 3 | `f4lc0n re` wraps the crackme build + lldb/otool solve helper | M | todo |
| 5 | `f4lc0n score` prints the scoreboard diff | S | todo |
| 6 | Shared guard as a library every subcommand imports; fuzz it with bad targets in CI | S | todo |
| 4 | `f4lc0n status` TUI across tracks | M | novelty — do last |

## 5. On hold — decide before building

| # | Row | Why it's held |
|---|-----|---------------|
| 6a | `f4lc0n scope` allowlist | Trades the guard's *technical* guarantee (loopback only, verifies nothing to trust) for a *trust* one (user attests ownership). Build ONLY via real signals — detect the HTB/THM VPN interface — never a bare "I own this" checkbox. Otherwise don't build it. |

## 6. Landing (/mobbin pass vs plank, keyrate, best-in-class dev landers)

| # | Gap | Size | Status |
|---|-----|------|--------|
| L1 | No mobile nav — links crowd at phone width | S | todo |
| L2 | No "free / open source" signal above the fold | S | todo |
| L3 | "What you'll build" section once guides exist | M | todo |
| L4 | `apple`-skill spacing pass over every section | M | todo |

## v1.0 — gated on Joshua's yes

Cut when the guides (G1–G4) are done and content is deep. Major, so it needs an explicit yes.
