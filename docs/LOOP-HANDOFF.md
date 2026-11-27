# grouse loop handoff (2026-11-24)

## What the loop is

The loop works `roadmap.md` top to bottom, one row per tick: build it, QA it, bump the minor version, commit, tag, push, and deploy if the landing changed. `docs/RULES.md` binds it — targets are 127.0.0.1 or a listed training platform, nothing else, and the loopback pin in `pentest/run-juiceshop.sh` stays. The guard in `bin/grouse` enforces the same thing in code.

## Where things stand

- **v0.2.0 shipped.** `bin/grouse` is the suite entrypoint: `doctor`, `range up|down|status`, `recon`, `score`. Every target runs through `guard()` first — loopback only, everything else refused (tested against public hosts and CIDR ranges).
- Landing live at f4lc0n.jaybulb.com, showing v0.2.0.
- Benchmark 19/19 (pentest 9, RE 2, LeetCode 8), each scored against Juice Shop's own `/api/Challenges`.
- Whitepaper rewritten for the suite era.

## Priority order (reordered 2026-11-24)

Guides and content first — they turn solves into learning. Suite plumbing reorganizes things that already work, so it comes after.

1. **Guides G1–G4** — Juice Shop per-category walkthroughs, RE per-crackme, per-platform getting-started, "own box".
2. **Content 7–9** — Trapping Rain Water + LRU Cache; more scored Juice Shop; two harder crackmes.
3. **CI 10** — benchmark `--re --leetcode` on every push.
4. **Suite plumbing 2–6** — `range` absorbs the script, `re` helper, `score` diff, guard-as-library + fuzz, `status` TUI last.
5. **Landing L1–L4** — mobile nav, free/OSS signal, "what you'll build", apple-skill spacing pass.

**On hold — needs Joshua:** row 6a `grouse scope` allowlist. Build only via real HTB/THM VPN-interface detection, never a bare "I own this" checkbox (that trades the guard's technical guarantee for trust). Else skip.

**v1.0.0** cuts when the guides are done and content is deep. Major — needs Joshua's yes.

## Restart prompt

```
/loop work roadmap.md for grouse top to bottom — guides (G1–G4) first, then content (7–9), then CI (10), then suite plumbing, then landing L1–L4. Allowlist 6a on hold. Ship each row as a minor version, QA before shipping, stop at 98% weekly usage or when the matrix is empty. v1.0 gated on Joshua's yes.
```
