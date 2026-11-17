// Mode sombre : suit le réglage du système au premier passage, puis mémorise le choix du visiteur.
// Le bouton lune / soleil est ajouté automatiquement à la fin de la barre de navigation.
(function () {
  var KEY = 'theme';
  var root = document.documentElement;

  function saved() {
    try { var s = localStorage.getItem(KEY); return s === 'dark' || s === 'light' ? s : null; }
    catch (e) { return null; }
  }
  function systemDark() {
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  function current() { return saved() || (systemDark() ? 'dark' : 'light'); }

  function apply(t) {
    root.setAttribute('data-theme', t);
    var b = document.querySelector('.theme-toggle');
    if (b) {
      b.setAttribute('aria-pressed', String(t === 'dark'));
      var label = t === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre';
      b.setAttribute('aria-label', label);
      b.setAttribute('title', label);
    }
  }

  apply(current()); // appliqué dès le <head> pour éviter un flash de page claire

  var style = document.createElement('style');
  style.textContent =
    '.site-nav .theme-toggle{padding:.85rem .9rem;gap:0}' +
    '.theme-toggle svg{display:block;width:1.2rem;height:1.2rem}' +
    '.theme-toggle .i-sun{display:none}' +
    ':root[data-theme="dark"] .theme-toggle .i-sun{display:block}' +
    ':root[data-theme="dark"] .theme-toggle .i-moon{display:none}';
  document.head.appendChild(style);

  function init() {
    var ul = document.querySelector('.site-nav > ul');
    if (!ul) return;
    var li = document.createElement('li');
    li.innerHTML =
      '<button type="button" class="theme-toggle nav-btn" aria-pressed="false">' +
      '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '</button>';
    ul.appendChild(li);
    li.firstChild.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(KEY, next); } catch (e) {}
      apply(next);
    });
    apply(current());
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var onChange = function () { if (!saved()) apply(current()); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
  }
})();
