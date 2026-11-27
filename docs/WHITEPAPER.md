# grouse

Security skill doesn't come from reading about SQL injection, it comes from finding one yourself at 11pm and realizing you've walked past the same bug pattern in real code a dozen times without seeing it. Most learning setups get in the way of that: spin up a Kali VM, configure a network, hope Docker behaves. By the time the environment works, the curiosity is gone. That's the gap.

grouse strips that down to tracks that run directly on this Mac. Pentest: attack OWASP Juice Shop, a deliberately broken e-commerce app with a hundred-plus scored vulnerabilities, running locally on localhost. Reverse-engineering: crack small C binaries compiled without debug symbols, using lldb and otool to find the hidden check by reading assembly instead of source. No VM, no target that isn't yours, no setup tax between deciding to practice and actually practicing.

The moment it pays off looks like this: `./run-juiceshop.sh`, open the console, find the first XSS in under a minute, tick it off in `progress.md`, and now the next fifteen minutes are just pulling on that thread. Or: `lldb bin/crackme1`, step through, watch a password check materialize out of a register comparison you'd have missed reading the disassembly cold. That's it. That's the whole product.

It's a home gym, not a gym membership. Nobody drives across town to lift for twenty minutes, so nobody does it. Put the equipment in the garage and it gets used.

## One command, and a guard you can't talk your way past

The tracks now live behind one entrypoint, `bin/grouse`: `doctor` checks your tools, `range` runs and stops Juice Shop (pinned to loopback), `recon` scans, `score` runs the benchmark. This is the "suite" — not a pile of loose scripts, one program.

The important part isn't the convenience, it's the guard. Every subcommand that takes a target runs it through one function first, and that function refuses anything that isn't `127.0.0.1`. No hostnames, no ranges, no `scanme.nmap.org`, no "just this once." The rules of engagement aren't a markdown file you're trusted to have read — they're code that runs before nmap does. That's what "impenetrable" means here: the locked room stays locked whether or not you remember it's locked.

## Scored, not self-reported

Practice tools lie to you by letting you mark your own homework. grouse doesn't. The benchmark (`bench/bench.py`) runs real solves against a live Juice Shop and checks each one against the app's own `/api/Challenges` scoreboard — the target itself confirms the hit, so nothing is faked. Today that's 19/19: nine web challenges, two crackmes, eight algorithm problems. A solve that the scoreboard doesn't recognize doesn't count.

## Where it's going

The original plan said "no v1, it's a dojo, dojos don't need a business model." The dojo part still holds, but the room is getting built out. Next: the guard grows from loopback-only into an **authorization allowlist** — you register a box you own, or a target a training platform assigned you (Hack The Box, TryHackMe, picoCTF, OverTheWire, PortSwigger), and the guard lets exactly that through. It never opens to arbitrary hosts; the deny-by-default stance doesn't move. Alongside that, a guide per supported target, so every row in the room comes with a walkthrough. v1.0 is when the suite and the guides are done.

## Rules

Repo: nulljosh/grouse, Apache 2.0. The rules are simple and non-negotiable: only attack Juice Shop on localhost, the crackmes in this repo, machines you own, and training platforms inside the targets they hand you — never anything you don't own or hold written permission to test. The full rules of engagement are in [RULES.md](RULES.md), and the guard enforces them.
