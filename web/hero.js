// Hero scene, after Plank and Keyrate. The terminal under the title types a real session from this repo, one stage at a
// time (recon, exploit, crack, score); each command's real output prints in the strip below and the stage lights. The
// readout under the buttons says the same in one line. Loose tokens of the trade drift at three depths, every layer
// eases toward the scroll position at its own speed and leans away from the pointer. Reduced motion gets a still scene.
(function () {
  var still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el = function (t, c, x) { var e = document.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; };
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  var esc = function (s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  var KW = /\b(nmap|curl|lldb|python3|otool|strcmp|OR)\b/g;
  var paint = function (s) { return esc(s).replace(/'[^']*'|"[^"]*"/g, '<span class="s">$&</span>').replace(KW, '<span class="k">$1</span>'); };

  // the session, captured from this repo and a local Juice Shop; hi marks the line that matters
  var steps = [
    { stage: 0, cmd: 'nmap -sV -p 3000 127.0.0.1', out: ['3000/tcp open  ppp?'], said: '3000/tcp open' },
    { stage: 1, cmd: "curl localhost:3000/rest/user/login -d \"' OR 1=1--\"", out: ['{"umail":"admin@juice-sh.op","token":"eyJ0eXAi..."}'], hi: 'admin@juice-sh.op', said: 'logged in as admin' },
    { stage: 1, cmd: 'curl localhost:3000/ftp/acquisitions.md', out: ['# confidential, world-readable'], said: 'read a confidential file' },
    { stage: 2, cmd: "lldb re/bin/crackme1 -o 'b strcmp' -o run", out: ['x1 = 0x10000059d  "hunter2"'], hi: '"hunter2"', said: 'password: hunter2' },
    { stage: 3, cmd: 'python3 -I bench/bench.py', out: ['Total: 19/19 solved'], hi: '19/19 solved', said: '19/19 solved' }
  ];

  var board = document.getElementById('board'), ground = document.querySelector('.ground');
  var code, term, stages = [];
  if (board) {
    var ed = board.appendChild(el('div', 'ed')), bar = ed.appendChild(el('div', 'ed-bar'));
    bar.appendChild(el('i')); bar.appendChild(el('i')); bar.appendChild(el('i'));
    bar.appendChild(el('b', '', '~/grouse'));
    var st = bar.appendChild(el('span', 'stages'));
    ['recon', 'exploit', 'crack', 'score'].forEach(function (s) { stages.push(st.appendChild(el('span', '', s))); });
    code = ed.appendChild(el('pre', 'code')); term = ed.appendChild(el('pre', 'ed-term'));
  }
  var cmd = document.getElementById('rCmd'), said = document.getElementById('rSaid');

  var onscreen = true, hero = document.querySelector('.hero');
  if ('IntersectionObserver' in window && hero) new IntersectionObserver(function (es) { onscreen = es[0].isIntersecting; }).observe(hero);
  var awake = function () { return (document.hidden || !onscreen) ? wait(400).then(awake) : Promise.resolve(); };

  function draw(lines, caret) {
    code.innerHTML = '';
    lines.forEach(function (l, i) { var d = code.appendChild(el('div')); d.innerHTML = l ? '$ ' + paint(l) : ' '; if (caret && i === lines.length - 1) d.className = 'caret'; });
  }
  function lit(n) { stages.forEach(function (s, i) { s.className = i < n ? 'done' : i === n ? 'on' : ''; }); }
  function out(s) {
    var o = esc(s.out.join('\n'));
    return s.hi ? o.split(esc(s.hi)).join('<span class="g">' + esc(s.hi) + '</span>') : o;
  }

  function run() {
    var typed = [];
    if (still) {
      draw(steps.map(function (s) { return s.cmd; })); lit(4);
      term.innerHTML = out(steps[steps.length - 1]);
      if (cmd) cmd.textContent = steps[4].cmd.split(' ')[0]; if (said) said.textContent = steps[4].said;
      return Promise.resolve();
    }
    lit(-1); term.textContent = ''; if (said) said.textContent = '';
    return steps.reduce(function (p, s) {
      return p.then(function () {
        lit(s.stage); typed.push(''); if (cmd) cmd.textContent = s.cmd.split(' ').slice(0, 2).join(' ');
        var q = wait(300);
        for (var c = 0; c < s.cmd.length; c++) (function (ch) {
          q = q.then(awake).then(function () { typed[typed.length - 1] += ch; draw(typed, true); return wait(ch === ' ' ? 14 : 18 + Math.random() * 26); });
        })(s.cmd[c]);
        return q.then(function () {
          draw(typed); code.lastChild.classList.add('hot');
          term.innerHTML = out(s); if (said) said.textContent = s.said;
          return wait(1100);
        }).then(function () { if (code.lastChild) code.lastChild.classList.remove('hot'); });
      });
    }, Promise.resolve()).then(function () { lit(4); return wait(3400); });
  }
  if (board) { if (still) run(); else (function loop() { run().then(loop); })(); }

  // loose tokens at three depths; the middle stays clear for the title
  var sky = document.getElementById('sky'), layers = [];
  if (sky) {
    var seed = 11, rnd = function () { return (seed = (seed * 16807) % 2147483647) / 2147483647; };
    var few = innerWidth < 600;
    var words = ["' OR 1=1--", 'nmap', 'lldb', 'strcmp', '127.0.0.1', 'x0', '<script>', '../', 'otool', ':3000', 'JWT', 'IDOR', 'XSS', '0x59d', 'curl', 'b main', 'admin', '200', 'SQLi', 'hunter2', 'gobuster', 'ret'];
    var depths = [
      { cls: 'far', n: 12, size: 22, lag: .7, o: .45, tilt: 10, spin: .02 },
      { cls: 'mid', n: 9, size: 36, lag: .35, o: .75, tilt: 20, spin: .04 },
      { cls: 'near', n: 6, size: 60, lag: -.35, o: .95, tilt: 34, spin: .08 }
    ];
    depths.forEach(function (d, di) {
      var layer = sky.appendChild(el('div', 'layer ' + d.cls));
      var n = few ? (d.cls === 'far' ? 6 : 0) : d.n;
      for (var i = 0; i < n; i++) {
        var side = i % 2, slot = Math.floor(i / 2), slots = Math.ceil(n / 2);
        var band = d.cls === 'far' ? 24 : 13;
        var x = side ? 96 - band + rnd() * band - 4 : 2 + rnd() * band;
        var y = 4 + (slot + .15 + rnd() * .7) * (64 / slots);
        var hot = d.cls !== 'far' && rnd() < .25;
        var t = layer.appendChild(el('span', 'tok' + (hot ? ' hot' : ''), words[(i * 7 + di * 5 + 2) % words.length]));
        if (side) t.style.cssText = 'right:' + (100 - x).toFixed(1) + '%;'; else t.style.cssText = 'left:' + x.toFixed(1) + '%;';
        t.style.cssText += 'top:' + y.toFixed(1) + '%;--s:' + d.size + 'px;opacity:' + d.o + ';' +
          'animation-duration:' + (5 + rnd() * 5).toFixed(1) + 's;animation-delay:' + (-rnd() * 10).toFixed(1) + 's;--r:' + Math.round(rnd() * 30 - 15) + 'deg';
        t.dataset.spin = ((rnd() < .5 ? -1 : 1) * d.spin * (.6 + rnd() * .8)).toFixed(3);
      }
      layers.push({ layer: layer, lag: d.lag, tilt: d.tilt, toks: Array.prototype.slice.call(layer.children) });
    });
  }

  // parallax, eased toward the target each frame; the copy lifts and fades
  var copy = document.querySelector('.hero-copy');
  if (still) return;
  var now = { y: scrollY, px: 0, py: 0 }, goal = { y: scrollY, px: 0, py: 0 }, running = false;
  function frame() {
    var moving = false;
    for (var k in now) { var dd = goal[k] - now[k]; now[k] = Math.abs(dd) < .05 ? goal[k] : now[k] + dd * .12; if (now[k] !== goal[k]) moving = true; }
    var y = now.y;
    if (y < innerHeight * 1.4) {
      if (ground) ground.style.transform = 'translate3d(' + (now.px * 8).toFixed(2) + 'px,' + (y * .55 + now.py * 5).toFixed(2) + 'px,0)';
      layers.forEach(function (L) {
        L.layer.style.transform = 'translate3d(' + (now.px * L.tilt).toFixed(2) + 'px,' + (y * L.lag + now.py * L.tilt * .6).toFixed(2) + 'px,0)';
        L.toks.forEach(function (t) { t.style.rotate = (y * t.dataset.spin).toFixed(2) + 'deg'; });
      });
      if (copy) { copy.style.transform = 'translate3d(0,' + (y * .2).toFixed(2) + 'px,0)'; copy.style.opacity = Math.max(0, 1 - y / (innerHeight * .7)); }
    }
    running = moving;
    if (moving) requestAnimationFrame(frame);
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', function () { goal.y = scrollY; kick(); }, { passive: true });
  if (matchMedia('(pointer: fine)').matches) addEventListener('pointermove', function (e) {
    goal.px = -(e.clientX / innerWidth - .5) * 2; goal.py = -(e.clientY / innerHeight - .5) * 2; kick();
  }, { passive: true });
})();
