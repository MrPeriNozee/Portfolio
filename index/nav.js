// Menu déroulant « Stage » : ouverture au clic ou au clavier, fermeture au clic extérieur ou avec Échap.
(function () {
  var menus = document.querySelectorAll('.has-menu');
  function closeAll() {
    menus.forEach(function (m) {
      m.classList.remove('open');
      m.querySelector('button').setAttribute('aria-expanded', 'false');
    });
  }
  menus.forEach(function (m) {
    var btn = m.querySelector('button');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !m.classList.contains('open');
      closeAll();
      m.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });
  document.addEventListener('click', closeAll);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });
})();
