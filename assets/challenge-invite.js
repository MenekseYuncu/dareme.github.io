(function () {
  const params = new URLSearchParams(window.location.search);
  const challengeId = params.get('challenge_id') || params.get('id') || '';
  const title = params.get('title') || '';
  const days = Number.parseInt(params.get('days') || '', 10);
  const titleElement = document.getElementById('challenge-title');
  const description = document.getElementById('challenge-description');
  const button = document.getElementById('challenge-action');
  const note = document.getElementById('platform-note');
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const playStore = 'https://play.google.com/store/apps/details?id=com.menekseync.dareme';

  if (title) titleElement.textContent = '“' + title + '”';
  if (Number.isFinite(days) && days > 0) {
    description.textContent = days + ' günlük bu challenge’ın maddelerini incele ve bireysel ya da grup olarak başla.';
  }

  if (!challengeId) {
    button.textContent = 'DareMe’yi indir';
    button.href = playStore;
    note.textContent = 'DareMe şu anda Android’de kullanılabilir.';
    return;
  }

  if (isIOS) {
    button.textContent = 'iOS uygulaması yakında';
    button.href = '/';
    note.textContent = 'Bu challenge’ı Android cihazında inceleyebilirsin.';
    return;
  }

  const deepLink = 'dareme://challenge?challenge_id=' + encodeURIComponent(challengeId);
  button.href = isAndroid ? deepLink : playStore;
  button.addEventListener('click', function () {
    if (!isAndroid) return;
    const startedAt = Date.now();
    window.setTimeout(function () {
      if (document.visibilityState === 'visible' && Date.now() - startedAt < 2200) {
        window.location.href = playStore;
      }
    }, 1200);
  });
})();
