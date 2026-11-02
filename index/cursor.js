// Effet de curseur discret :
//  1. une lueur rouge très légère qui suit la souris sur toute la page ;
//  2. dans le bloc d'en-tête (.hero), une grille de points qui s'éclaire autour du curseur.
// Désactivé sur écran tactile et si le visiteur a demandé moins d'animations.
(function () {
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  var style = document.createElement('style');
  style.textContent =
    '.cursor-glow{position:fixed;left:0;top:0;width:360px;height:360px;margin:-180px 0 0 -180px;' +
    'border-radius:50%;pointer-events:none;z-index:15;opacity:0;transition:opacity .3s;will-change:transform;' +
    'background:radial-gradient(circle,rgba(255,70,85,.13),rgba(255,70,85,0) 65%)}' +
    '.cursor-glow.on{opacity:1}';
  document.head.appendChild(style);

  var glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  var hero = document.querySelector('.hero');
  var tx = 0, ty = 0, x = 0, y = 0, raf = 0;

  function tick() {
    x += (tx - x) * 0.18;
    y += (ty - y) * 0.18;
    glow.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    raf = (Math.abs(tx - x) > 0.5 || Math.abs(ty - y) > 0.5) ? requestAnimationFrame(tick) : 0;
  }

  window.addEventListener('pointermove', function (e) {
    if (e.pointerType === 'touch') return;
    tx = e.clientX;
    ty = e.clientY;
    if (!glow.classList.contains('on')) {
      x = tx; y = ty;
      glow.classList.add('on');
    }
    if (!raf) raf = requestAnimationFrame(tick);
    if (hero) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
    }
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', function () {
    glow.classList.remove('on');
  });
})();
